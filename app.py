from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
import os

from pm4py.objects.log.exporter.xes import exporter as xes_exporter
import pm4py



app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

'''
@app.route('/readFileInput', methods=['POST'])
def readFileInput():
    file = request.get_data()
    log = pm4py.read_xes(file)
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
    return allActivities

'''

if __name__ == "__main__":
    app.run(debug=True)