import os
#import magic
import urllib.request
from app import app
from flask import Flask, flash, request, redirect, render_template, url_for, send_from_directory
from werkzeug.utils import secure_filename
from pm4py.objects.log.exporter.xes import exporter as xes_exporter
import pm4py
import collections


ALLOWED_EXTENSIONS = {'xes'}
UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/uploads/'

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def upload_form():
	return render_template('index.html')

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
            print(allActivities)
            return render_template('index.html', data=allActivities)
        else:
            return redirect(request.url)
    		#flash('Allowed file types are txt, pdf, png, jpg, jpeg, gif')
			

DOWNLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/downloads/'

app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER

def process_file(path, filename):
    log = pm4py.read_xes(path)
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
    print(allActivities)
    array = ['a', 'b', 'c']
    with open('textfile.txt', 'r') as f: 
        return render_template('index.html', text=f.read()) 

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['DOWNLOAD_FOLDER'], filename, as_attachment=True)
	

if __name__ == "__main__":
    app.run()