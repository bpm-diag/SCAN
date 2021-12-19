import os
from utilities import *
from rule import *
from app import *
from flask import Flask, flash, request, redirect, render_template, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
import pm4py
from collections import Counter
import glob


ALLOWED_EXTENSIONS = {'xes'}
UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/uploads/'
TIMESTAMP_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/timestamp/'

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def upload_form():
    flash("Select a XES file to analyze.", "info")
    return render_template('index.html')

@app.route('/clear')
def clearDiv():
    clear()
    list_of_files = glob.glob(TIMESTAMP_FOLDER + '/*') 
    latest_file = max(list_of_files, key=os.path.getctime)
    with open(latest_file, 'a') as file:
        timestamp = takeTimestamp()
        file.write("CLEAR: " + timestamp + "\n")
    file.close()
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
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], "log.xes"))
            log = pm4py.read_xes(os.path.join(app.config['UPLOAD_FOLDER'], "log.xes"))  
            allXESActivities = []
            for trace in log:
                activities = []
                for event in trace:
                    activities.append(event["concept:name"])
                allXESActivities.append(activities)           
            allActivities = []
            actWithOccurence = []
            c = Counter()
            for act in allXESActivities:
                c[tuple(act)] += 1
                if act not in allActivities:
                    allActivities.append(act)        
            listActivity = takeActions(allActivities) 
            for elem in c:
                list = [c[elem], elem]
                actWithOccurence.append(list)    
            clear()  
            actWithOccurence = sortFirstAscendentOrder(actWithOccurence)
            with open('segments.txt', 'w') as f:
                i = 0
                for line in actWithOccurence:
                    f.write(str(line))
                    f.write("segment_"+str(i))
                    f.write('\n')
                    i += 1
            f.close()
            replaceInFile("segments.txt")
            fileHandle = open("segments.txt", "r")
            texts = fileHandle.readlines()
            fileHandle.close()
            fileHandle = open("trace.txt", "w")
            for s in texts:
                fileHandle.write(s)
            fileHandle.close()
            timestamp = takeTimestamp()
            with open(os.path.join(TIMESTAMP_FOLDER, 'log_' + timestamp + '.txt'), 'w+') as file:
                file.write("UPLOAD: " + timestamp + "\n")
            file.close()
            flash("Successfully loaded", "success")       
            result = takeSegmentFromFile()
            return render_template("index.html", activity=listActivity, nameFile=filename, segments=result )
        else:
            flash("Extension not allowed", "danger")
            return redirect(request.url)	
     

@app.route('/show_trace', methods=['POST'])
def show_trace():      
    order = request.form["order"]
    result = takeSegmentFromTrace()
    removeSegment = []
    if(order == "ascending"): result = sortDescendentOrder(result)
    else: result = sortAscendentOrder(result)
    writeOnSegmentFile(result)     
    return jsonify({"result": result, "remove": removeSegment}) 
    
          
@app.route('/ascending_order', methods=['POST'])
def ascending_order():
    segments = takeSegmentFromFile()
    remove = takeRemoveSegmentFromFile()
    seg_ord = sortAscendentOrder(segments)
    rem_ord = sortAscendentOrder(remove)
    writeOnSegmentFile(seg_ord)
    writeOnRemoveSegmentFile(rem_ord)
    return jsonify({"result": seg_ord, "remove": rem_ord}) 

@app.route('/descending_order', methods=['POST'])
def descending_order():
    segments = takeSegmentFromFile()
    remove = takeRemoveSegmentFromFile()
    seg_ord = sortDescendentOrder(segments)
    rem_ord = sortDescendentOrder(remove)
    writeOnSegmentFile(seg_ord)
    writeOnRemoveSegmentFile(rem_ord)
    return jsonify({"result": seg_ord, "remove": rem_ord}) 
          
@app.route('/download_file')      
def download():
    downloadFile()
    list_of_files = glob.glob(TIMESTAMP_FOLDER + '/*') 
    latest_file = max(list_of_files, key=os.path.getctime)
    with open(latest_file, 'a') as file:
        timestamp = takeTimestamp()
        file.write("EXPORT: " + timestamp + "\n")
    file.close()
    return render_template('index.html');   
        
@app.route('/start_activity', methods=['POST'])
def start_activity():
    result, removeSegment = rule_start_activity()
    return jsonify({"result": result, "remove": removeSegment}) 

@app.route('/end_activity', methods=['POST'])
def end_activity():
    result, removeSegment = rule_end_activity()
    return jsonify({"result": result, "remove": removeSegment}) 
          
@app.route('/existence', methods=['POST'])
def existence():
    result, removeSegment = rule_existence()
    return jsonify({"result": result, "remove": removeSegment})  

@app.route('/absence', methods=['POST'])
def absence():
    result, removeSegment = rule_absence()
    return jsonify({"result": result, "remove": removeSegment})               
   
@app.route('/choice', methods=['POST'])
def choice():
    result, removeSegment = rule_choice()
    return jsonify({"result": result, "remove": removeSegment})  

@app.route('/exclusive_choice', methods=['POST'])
def exclusive_choice():
    result, removeSegment = rule_exclusive_choice()
    return jsonify({"result": result, "remove": removeSegment}) 

@app.route('/responded_existence', methods=['POST'])
def responded_existence():
    result, removeSegment = rule_responded_existence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/response', methods=['POST'])
def response():
    result, removeSegment = rule_response()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/alternate_response', methods=['POST'])
def alternate_response():
    result, removeSegment = rule_alternate_response()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/chain_response', methods=['POST'])
def chain_response():
    result, removeSegment = rule_chain_response()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/precedence', methods=['POST'])
def precedence():
    result, removeSegment = rule_precedence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/alternate_precedence', methods=['POST'])
def alternate_precedence():
    result, removeSegment = rule_alternate_precedence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/chain_precedence', methods=['POST'])
def chain_precedence():
    result, removeSegment = rule_chain_precedence()
    return jsonify({"result": result, "remove": removeSegment})  

@app.route('/co_existence', methods=['POST'])
def co_existence():
    result, removeSegment = rule_co_existence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/succession', methods=['POST'])
def succession():
    result, removeSegment = rule_succession()
    return jsonify({"result": result, "remove": removeSegment})     
 
@app.route('/alternate_succession', methods=['POST'])
def alternate_succession():
    result, removeSegment = rule_alternate_succession()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/chain_succession', methods=['POST'])
def chain_succession():
    result, removeSegment = rule_chain_succession()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/not_co_existence', methods=['POST'])
def not_co_existence():
    result, removeSegment = rule_not_co_existence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/not_succession', methods=['POST'])
def not_succession():
    result, removeSegment = rule_not_succession()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/not_chain_succession', methods=['POST'])
def not_chain_succession():
    result, removeSegment = rule_not_chain_succession()
    return jsonify({"result": result, "remove": removeSegment})     

@app.route('/del_rule', methods=['POST'])
def delete_rule():
    result, removeSegment = del_rule()
    order = request.form["order"]
    if order == "ascending": result = sortDescendentOrder(result)
    else: result = sortAscendentOrder(result)
    writeOnSegmentFile(result)
    return jsonify({"result": result, "remove": removeSegment}) 

@app.route('/write_apply', methods=['POST'])
def write_apply():
    fun = request.form["fun"]
    act1 = request.form["act1"]
    act2 = request.form["act2"]
    list_of_files = glob.glob(TIMESTAMP_FOLDER + '/*') 
    latest_file = max(list_of_files, key=os.path.getctime)
    with open(latest_file, 'a') as file:
        timestamp = takeTimestamp()
        file.write("APPLY: " + timestamp + "," + fun + "," + act1 + "," + act2 + "\n")
    file.close()
    return render_template('index.html');

@app.route('/write_delete', methods=['POST'])
def write_delete():
    fun = request.form["fun"]
    act1 = request.form["act1"]
    act2 = request.form["act2"]
    list_of_files = glob.glob(TIMESTAMP_FOLDER + '/*') 
    latest_file = max(list_of_files, key=os.path.getctime)
    with open(latest_file, 'a') as file:
        timestamp = takeTimestamp()
        file.write("DELETE: " + timestamp + "," + fun + "," + act1 + "," + act2 + "\n")
    file.close()
    return render_template('index.html');


def main():
    clear()
    app.run()
           
  
if __name__ == "__main__":
    main()