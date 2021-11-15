import os
from utilities import *
#import magic
import urllib.request
from app import app
from flask import Flask, flash, request, redirect, render_template, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from pm4py.objects.log.exporter.xes import exporter as xes_exporter
import pm4py
import json
import collections


ALLOWED_EXTENSIONS = {'xes'}
UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/uploads/'

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def upload_form():
	return render_template('index.html')

@app.route('/clear')
def clearDiv():
    clearFile('segments.txt')
    clearFile('removeSegments.txt')
    return render_template('index.html');

@app.route('/', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            print('No file attached in request')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            print('No file selected')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            log = pm4py.read_xes(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            allXESActivities = []
            for trace in log:
                activities = []
                for event in trace:
                    activities.append(event["concept:name"])
                allXESActivities.append(activities)    
            allActivities = []
            for act in allXESActivities:
                if act not in allActivities:
                    allActivities.append(act)
            listActivity = takeActions(allActivities)
            with open('segments.txt', 'w') as f:
                for line in allActivities:
                    f.write(str(line))
                    f.write('\n')       
            return render_template("index.html", data=allActivities, activity=listActivity)
        else:
            return redirect(request.url)	
      
@app.route('/existence', methods=['POST'])
def existence():
    a = request.form["act1"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile()   
    result = []
    for act in segments:
        if a in act:        
            result.append(act)
        else : 
            if act not in removeSegment:
                removeSegment.append(act)    
    writeOnSegmentFile(result)   
    writeOnRemoveSegmentFile(removeSegment) 
    return jsonify({"result": result, "remove": removeSegment})        
   
@app.route('/choice', methods=['POST'])
def choice():
    a = request.form["act1"]
    b = request.form["act2"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile() 
    result = []
    for act in segments:
        if a in act or b in act:
            result.append(act)
        else : 
            if act not in removeSegment:
                removeSegment.append(act)     
    writeOnSegmentFile(result)   
    writeOnRemoveSegmentFile(removeSegment) 
    return jsonify({"result": result, "remove": removeSegment})       
 


            
if __name__ == "__main__":
    clearFile('segments.txt')
    clearFile('removeSegments.txt')
    app.run()