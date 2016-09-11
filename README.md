# Task Builder for Sas Studio
SAS Studio is the user interface into SAS.  More information on this can be found at:  http://www.sas.com/en_us/software/foundation/studio.html

<b>Important</b>: Please run in Chrome. The other browsers are not currently supported, but it is something I am working on.

I am a college student, and created this Task Builder as a project over the summer. It is in no way complete or bug-free. 

There are many pieces missing from this program, but the ones included work well. 

The purpose of this program is to allow the user to construct tasks to be used in SAS Studio. SAS Studio is part of the University Edition package.  University Edition allows students, teachers, everyone actually to learn and use SAS.  It is completely free.  To learn more about and to download University Edition, use this link:
http://www.sas.com/en_us/software/university-edition.html
  
SAS Studio tasks are point and click interfaces which automatically generate SAS code.  Tasks are written in XML.  More specifically, CTM, or Common Task Model.  This generated code can be copy/pasted into SAS Studio, which in turn can be run within SAS Studio instantly.  More information on the common task model can be found here:  http://support.sas.com/documentation/cdl/en/webeditordg/68829/HTML/default/viewer.htm#titlepage.htm

<b>To begin:</b>

1. Download the two files into a directory.
2. Click on the TaskBuilder.html file to get started.

<b>Quick step-by-step tutorial of building a simple task:</b>

Click TaskBuilder.html to start the program.

Create data -> Create Group (with relevant name)
 
Create role -> Create Group (with relevant name)
 
New Tab (plus button "+", top right of middle panel)
 
Add two options (e.g. Checkbox, Radio, etc.) -> Create Group (with relevant name)
 
Generate code (Large button, located at the bottom of the left panel)
 
Copy all the code that pops up. (This can be done by using Ctrl-A -> Ctrl-C)
 
Create a New Task in Sas Studio.
 
Inside the Sas Studio blank task, press Ctrl-A to select all the text, then Ctrl-V to replace that text with the task Builder code.
 
Run!

The generated task should look, apart from the graphical differences, exactly like how it appeared in the Task Builder.
