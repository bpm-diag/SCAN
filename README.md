# SEC - SEgments Compliance

 ## Description
**SEgments Compliance** is a tool that helps user to identify the correct segments.
Allows you to load the interested **.xes** file and browse it using *DECLARE* rules.  
Eventually, when you are satisfied, you can download the final xes file.

 ## Table of content
1. How to locally install
2. How to use

## How to locally install
In order to install this tool locally you need:
1. Python (version 3.9): https://www.python.org/downloads/ 
2. Visual Studio Code: https://code.visualstudio.com/Download
3. Download the zip folder of the project

You can find a python installation guide here: https://python.land/installing-python

After installing everything, unzip the project and open the folder with Visual Studio Code and add the python extension.

Position within the project folder and type the following commands:

**For Windows:**<br>
<code>py -3 -m venv .venv</code><br>
<code>.venv\scripts\activate</code><br>
<code>pip install -r requirements.txt</code><br>

**For Linux / macOS:**<br>
<code>python3 -m venv env</code><br>
<code>source env/bin/activate</code><br>
<code>pip install -r requirements.txt</code><br>

Once the last command is finished, you can run the program:<br>
<code>python main.py</code><br>

At this point you can open your preferred browser between Firefox, Google Chrome, Microsoft Edge and Opera to view the tool.
Type in the url bar:<br>
<code>localhost:5000</code><br>

**N.B.**: For a better experience it is suggest to use Firefox.

Now you are ready to use *SEC*!

## How to use
Select your **.xes** file from a folder of your choice via the *SFOGLIA* button, then continue with *SUBMIT* and finally 
with *UPLOAD*.

You can now view the segments in the *SEGMENTS' LIST* section on the left.  
You can use the *HIDE/SHOW* button to change the display of segments. If the button is set to *HIDE* by clicking on a row 
of the table you will be shown a section that will show the content of the segment.

On the right you can create the new *DECLARE CONSTRAINTS* you want to apply. 
Select the constraint and the activities to apply it to. If you do not remember the operation of a constraint click on 
*i* which show an infomative box.
All the constraints applied are visible in the *LIST OF CONSTRAINT* section and you can delete one at a time using 
the *TRASH* button.

Each time you apply a new constraint, segments that do not respect it are moved to the *NOT ACCEPTED 
SEGMENTS' LIST* section.  
  
If you are not satisfied with your work you can click on the *CLEAR* button and start again from the beginning by 
loading a new file.  
  
Otherwise, when you are satisfied with the results achieved, you can download the **.xes** file, by using the *EXPORT* button, 
and save it wherever you want.
