import os
from utilities import *
from rule import *
from del_rule import *
from app import *
from flask import Flask, flash, request, redirect, render_template, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
import pm4py
from collections import Counter


ALLOWED_EXTENSIONS = {'xes'}
UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/uploads/'

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def upload_form():
	return render_template('index.html')

@app.route('/clear')
def clearDiv():
    clear()
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
            with open('segments.txt', 'w') as f:
                for line in actWithOccurence:
                    f.write(str(line))
                    f.write('\n')
                    replaceInFile("segments.txt")
            flash("Successfully loaded", "success")            
            return render_template("index.html", data=actWithOccurence, activity=listActivity, nameFile=filename)
        else:
            flash("Extension not allowed", "danger")
            return redirect(request.url)	
      
@app.route('/download_file')      
def download():
    downloadFile()
    return render_template('index.html');   
          
@app.route('/existence', methods=['POST'])
def existence():
    result, removeSegment = rule_existence()
    return jsonify({"result": result, "remove": removeSegment})  

@app.route('/del_existence', methods=['POST'])
def del_existence():
    result, removeSegment = rule_del_existence()
    return jsonify({"result": result, "remove": removeSegment})  

@app.route('/absence', methods=['POST'])
def absence():
    result, removeSegment = rule_absence()
    return jsonify({"result": result, "remove": removeSegment})    

@app.route('/del_absence', methods=['POST'])
def del_absence():
    result, removeSegment = rule_del_absence()
    return jsonify({"result": result, "remove": removeSegment})            
   
@app.route('/choice', methods=['POST'])
def choice():
    result, removeSegment = rule_choice()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_choice', methods=['POST'])
def del_choice():
    result, removeSegment = rule_del_choice()
    return jsonify({"result": result, "remove": removeSegment})     

@app.route('/exclusive_choice', methods=['POST'])
def exclusive_choice():
    result, removeSegment = rule_exclusive_choice()
    return jsonify({"result": result, "remove": removeSegment}) 

@app.route('/del_exclusive_choice', methods=['POST'])
def del_exclusive_choice():
    result, removeSegment = rule_del_exclusive_choice()
    return jsonify({"result": result, "remove": removeSegment})       
 
@app.route('/responded_existence', methods=['POST'])
def responded_existence():
    result, removeSegment = rule_responded_existence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_responded_existence', methods=['POST'])
def del_responded_existence():
    result, removeSegment = rule_del_responded_existence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/response', methods=['POST'])
def response():
    result, removeSegment = rule_response()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_response', methods=['POST'])
def del_response():
    result, removeSegment = rule_del_response()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/alternate_response', methods=['POST'])
def alternate_response():
    result, removeSegment = rule_alternate_response()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_alternate_response', methods=['POST'])
def del_alternate_response():
    result, removeSegment = rule_del_alternate_response()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/chain_response', methods=['POST'])
def chain_response():
    result, removeSegment = rule_chain_response()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_chain_response', methods=['POST'])
def del_chain_response():
    result, removeSegment = rule_del_chain_response()
    return jsonify({"result": result, "remove": removeSegment}) 

@app.route('/precedence', methods=['POST'])
def precedence():
    result, removeSegment = rule_precedence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_precedence', methods=['POST'])
def del_precedence():
    result, removeSegment = rule_del_precedence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/alternate_precedence', methods=['POST'])
def alternate_precedence():
    result, removeSegment = rule_alternate_precedence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_alternate_precedence', methods=['POST'])
def del_alternate_precedence():
    result, removeSegment = rule_del_alternate_precedence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/chain_precedence', methods=['POST'])
def chain_precedence():
    result, removeSegment = rule_chain_precedence()
    return jsonify({"result": result, "remove": removeSegment})  

@app.route('/del_chain_precedence', methods=['POST'])
def del_chain_precedence():
    result, removeSegment = rule_del_chain_precedence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/co_existence', methods=['POST'])
def co_existence():
    result, removeSegment = rule_co_existence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_co_existence', methods=['POST'])
def del_co_existence():
    result, removeSegment = rule_del_co_existence()
    return jsonify({"result": result, "remove": removeSegment}) 

@app.route('/succession', methods=['POST'])
def succession():
    result, removeSegment = rule_succession()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_succession', methods=['POST'])
def del_succession():
    result, removeSegment = rule_del_succession()
    return jsonify({"result": result, "remove": removeSegment})     
 
@app.route('/alternate_succession', methods=['POST'])
def alternate_succession():
    result, removeSegment = rule_alternate_succession()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_alternate_succession', methods=['POST'])
def del_alternate_succession():
    result, removeSegment = rule_del_alternate_succession()
    return jsonify({"result": result, "remove": removeSegment}) 

@app.route('/chain_succession', methods=['POST'])
def chain_succession():
    result, removeSegment = rule_chain_succession()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_chain_succession', methods=['POST'])
def del_chain_succession():
    result, removeSegment = rule_del_chain_succession()
    return jsonify({"result": result, "remove": removeSegment}) 

@app.route('/not_co_existence', methods=['POST'])
def not_co_existence():
    result, removeSegment = rule_not_co_existence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_not_co_existence', methods=['POST'])
def del_not_co_existence():
    result, removeSegment = rule_del_not_co_existence()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/not_succession', methods=['POST'])
def not_succession():
    result, removeSegment = rule_not_succession()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/del_not_succession', methods=['POST'])
def del_not_succession():
    result, removeSegment = rule_del_not_succession()
    return jsonify({"result": result, "remove": removeSegment})

@app.route('/not_chain_succession', methods=['POST'])
def not_chain_succession():
    result, removeSegment = rule_not_chain_succession()
    return jsonify({"result": result, "remove": removeSegment})   

@app.route('/del_not_chain_succession', methods=['POST'])
def del_not_chain_succession():
    result, removeSegment = rule_del_not_chain_succession()
    return jsonify({"result": result, "remove": removeSegment})   

def main():
    clear()
    app.run()
           
  
if __name__ == "__main__":
    main()