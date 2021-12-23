# SEC - SEgments Compliance

 ## Description
**SEgments Compliance** is a tool that helps users to identify all the potential behaviors (i.e., segments) of the routines of interest directly from an event log. 
It allows you to load the interested event log (in the *XES* format) and filter out those segments not allowed by any real-world routine behavior, by using the *DECLARE* constraints. Such constraints describe the temporally extended relations between the activities that must be satisfied throughout a segment (e.g., an activity a1 must be eventually followed by an activity a2). 
Finally, when you have identified and removed those segments that should not be compliant with any real-world routine behavior, you can export the resulting event log.

 ## Table of content
1. How to install
2. How to use

## How to install
For the installation of the tool you need:
1. Python (version 3.9): 
    - **Windows:** https://www.python.org/ftp/python/3.9.9/python-3.9.9-amd64.exe
    - **macOs:** https://www.python.org/ftp/python/3.9.9/python-3.9.9-macos11.pkg
    - **Linux:** https://www.python.org/ftp/python/3.9.9/Python-3.9.9.tgz
2. Download the zip folder of the project: https://github.com/bpm-diag/SEC (press on *Code* and then on *Download ZIP*).<br>

**When you are installing python remember to check the flag 'ADD TO PATH'** <br>
![Add to path in python installation](/images/path.png?raw=true)
<br>

Alternatively, you can set it manually as follows:
1. Write in the search part of your bottom navigation bar *"system environment"* and click on the suggested *"Edit system environment variables"*.
2. Click on button *"Environment variables"*.
3. In the second section *"System variables"* search for the *"Path"* variable and then click on *"Edit"*.<br>
Here you need to write the path of your python folder that has the following form: 
<code>C:\Users\<nome\_utente>\AppData\Local\Programs\Python\<python\_version>\Scripts</code> <br>
To be sure to write the correct path navigate in your folders following the path until the folder Scripts included. 
Here copy your path and come back to the environment variables.<br>
4. Now, click on *"New"* and copy the path found and then click *"Ok"* to save.
5. At the end, click again *"Ok"* to get out from the environment variable section.


After you have installed python, unzip the project and open the terminal of your computer and locate the project folder. So, inside the project folder type the following commands:
<code>pip install -r requirements.txt</code><br>
<code>python main.py</code><br>

If you are encountering errors in running the previous commands, run these lines:<br>

**For Windows:**<br>
<code>py -3 -m venv .venv</code><br>
<code>.venv\scripts\activate</code><br>
<code>pip install -r requirements.txt</code><br>
<code>python main.py</code><br>

**For Linux / macOS:**<br>
<code>python3 -m venv env</code><br>
<code>source env/bin/activate</code><br>
<code>pip install -r requirements.txt</code><br>
<code>python main.py</code><br>

At this point you can open your preferred browser between Firefox, Google Chrome, Microsoft Edge and Opera to view the tool.
Type in the url bar:<br>
<code>127.0.0.1:5000</code><br>

**N.B.**: For a better experience it is suggested to use Firefox.

Now you are ready to use *SEC*!

## How to use
Select your **.xes** event log file from a folder of your choice via the *BROWSE* button, then continue with *UPLOAD*.

You can now view the segments in the *SEGMENTS' LIST* section on the left.  
You can use the *HIDE/SHOW* button to change the display of segments. If the button is set to *HIDE* by clicking on a row 
of the table you will be shown a pop-up that will show the content of the segment.

![Visualize segments after upload file](/images/img1.JPG?raw=true)

![Visualize segments in Hide modality](images/img2.JPG?raw=true)

The segments are shown by default in ascending order following the number of occurrences. You can reverse the order by clicking on the button *ASCENDING/DESCENDING* and view them as you prefer.

On the right you can choose the *DECLARE* constraints you want to apply. 
Select the constraint and the activities to apply it to. If you do not remember the operation of a constraint click on 
*i* which shows an informative box.
All the constraints applied are visible in the *LIST OF CONSTRAINT* section and you can delete one at a time using 
the *TRASH* button.

![Apply DECLARE constraints and visualize in DESCENDING order](images/img3.JPG)

Each time you apply a new constraint, segments that do not satisfy it are moved to the *NOT ACCEPTED SEGMENTS' LIST* section. 
 
![After deletion of constraint](images/img4.JPG) 

If you are not satisfied with your work you can click on the *CLEAR* button and start again from the beginning by loading a new file.  
  
Otherwise, when you are satisfied with the results achieved, you can download the **.xes** file, by using the *EXPORT* button, 
and save it wherever you want.

![Export of file](images/img5.JPG) 

Thus, the output of the tool consists in:
- a **.xes** event log file which stores the segments that satisfy the list of *DECLARE* constraints you chose;
- **log_timestamp.txt** file that is created every time you upload a *.xes* event log file within the tool. This file logs all the steps you have performed during your run, i.e.: each constraint you applied/deleted, the different buttons you clicked, etc...
These files are available inside the *timestamp* folder of the project.

For a video demonstration of the tool please refer to the following link: https://tinyurl.com/demo-tool

Sample log available for download: https://tinyurl.com/sample-log
