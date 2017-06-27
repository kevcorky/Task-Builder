//OutputXML.js
//Outputs the appropriate XML code needed to run in SAS Studio.

function outputData() {

    var nameCheck = document.getElementById('nameTitle').value;

    if(nameCheck == ""){
        alert("Must name the output file!");
        return;
    }

    var active = $("#tabs .ui-tabs-panel:visible").attr("id");

    var tabID = new Array();
    var tabs = $( "#tabs" ).children();
    var tabCount = tabs.length - 1;
    var idCount = 0;
    var fieldTF = false;

    var titlesID = tabs[0].id;

    var tempTitles = document.getElementById(titlesID).children;

    var tabTitles = new Array();
    var titleCount = 0;

    for(j = 0; j < tempTitles.length; j++) {
        if(tempTitles[j].innerText != "+") {
            tabTitles[titleCount] = tempTitles[j];
            titleCount++;
        }
    }

    var titleNames = new Array;

    //Start the output String
    var endString = "<Metadata>\n  <Options>\n";
    var idArray = new Array();

    var tabLength = new Array();

    var groupID = new Array();
    var idCounter = 0;

    for(i = 1; i < tabs.length; i++) {
        tabID[i-1] = tabs[i].id;
    }

    for(p = 0; p < tabID.length; p++) {
        var elems = document.getElementById(tabID[p]).getElementsByTagName("li");

        var check = document.getElementById(tabID[p]).getElementsByTagName("fieldset");

        if(check.length > 0) {
            for(q = 0; q < elems.length; q++) {
                var save = elems[q].parentNode.parentNode.className;
                if(save != 'innerGroup') {
                    alert("Since a group is used - ALL elements must be in groups!");
                    return;
                }
            }
        }
    }

    function optionsPrint(cursor) {
        var type = cursor.type;

        if(type == "") {
            type = cursor.nodeName;
        }

        if(type == 'null') {

        } else if(type == 'fieldset') {
            //Print string and move to child node.
            var name = "";

            for(i = 0; i < cursor.childNodes.length; i++) {
                if(cursor.childNodes[i].localName == "legend") {
                    name = cursor.childNodes[i].innerText;
                }
            }

            name = name.substring(0, (name.length) - 2);

            endString = endString + '\t  <Option inputType="string" name="' + cursor.id + '">' + name + '</Option>\n';

            optionsPrint(cursor.firstChild.firstChild);

        } else if(type == 'UL') {
            //print and return.
            for(n = 0; n < cursor.children.length; n++) {
                optionsPrint(cursor.children[n]);
            }
        } else if(type == 'LI') {
            var element = cursor.firstChild;

            if(typeof element == 'label') {
                return;
            }

            var elemType = element.type;

            var name = String(element.name);

            if(name == 'undefined') {
                name = "";
            }

            var node = cursor.childNodes[3];

            if(typeof elemType == 'undefined') {
                var test = element.className.slice(0, 10);

                if(test == 'slideStuff') {
                    elemType = "slider";
                }
            }

            if (typeof node !== 'undefined') {
                if(node.nodeType == 3) {
                    name = String(node.data);
                }
            } else if(elemType == 'radio') {
                name = "";
            }

            if(elemType == 'checkbox') {
                var value = 0;

                if(element.checked) {
                    value = 1;
                }

                endString = endString + '\t\t<Option defaultValue="'+ value +'" inputType="'+ String(elemType) +'" name="'+
                    String(element.id) +'">'+ name +'</Option>\n\n';
            } else if(elemType == 'radio') {
                var value = 0;

                if(element.checked) {
                    value = 1;
                }

                endString = endString + '\t\t<Option defaultValue="'+ value +'" variable="'+ String(element.name) +'" inputType="'+ String(elemType) +'" name="'+
                    String(element.id) +'">'+ name +'</Option>\n\n';
            } else if(elemType == 'text') {
                if(element.className == "DS") {

                } else if(element.className == "date"){
                    endString = endString + '\t\t<Option name="'+ String(element.id) +'" inputType="datepicker" format="monyy7.">'+ name +'</Option>\n\n';
                } else{
                    endString = endString + '\t\t<Option inputType="inputtext" name="'+ String(element.id) +
                        '" defaultValue="' + String(element.value) + '" width="250px">'+ name +'</Option>\n\n';
                }
            } else if(elemType == 'select-one') {
                endString = endString + '\t\t<Option defaultValue="default" inputType="combobox" name="'+
                    String(element.id) +'" width="264px">'+ name +'</Option>\n';

                for(j = 0; j < element.options.length; j++) {
                    endString = endString + '\t\t<Option inputType="string" name="'+
                        element.options[j].value.toLowerCase() +'">'+ String(element.options[j].value) +"</Option>\n";
                }

                endString = endString + '\n';
            } else if(elemType == 'number') {
                var value = element.value;
                if(value == "") {
                    value = element.min;
                }
                endString = endString + '\t\t<Option name="'+ String(element.id) +'" defaultValue="'+ value +'" inputType="numstepper" minValue="'+ String(element.min) +
                        '" maxValue="'+ String(element.max) +'">'+ name +'</Option>\n\n';
            } else if(elemType == 'color') {
                endString = endString + '\t\t<Option name="'+ String(element.id) +'" defaultValue="'+ String(element.value) +'" inputType="color">'+ name +'</Option>\n\n';
            } else if(elemType == 'slider') {
                endString = endString + '\t\t<Option name="'+ String(element.id) +'" inputType="slider" showButtons="false">'+ name +'</Option>\n\n';
            }
        }
    }

    //For each tab...
    for(m = 0; m < tabCount; m++) {

        var tabContID = document.getElementById(tabID[m]).children[0].id;

        var childArray = document.getElementById(tabContID).childNodes;

        var dropOptions = new Array();

        var groupLI = new Array();

        //1. Print tab string from tabTitles
        var elem = tabTitles[m].innerText;

        if(m > 0) {
            elem = elem.slice(0, (elem.length) - 2);
        }

        endString = endString + '\t<Option inputType="string" name="' + tabs[m].id + '">' + elem + '</Option>\n';

        var dsString = "";

        var temp = document.getElementById(tabID[m]).getElementsByTagName("LI");
        var liElements = new Array();

        for(count = 0; count < temp.length; count++) {
            liElements[count] = temp[count].cloneNode(true);
        }

        //Need to scan for DataSources first, as well as the roles accompanying them.
        dsString = "\t<DataSources>\n";
        var dsEmpty = "false";

        var type;
        var name;
        var className;

        for(x = 0; x < liElements.length; x++) {
            type = liElements[x].firstChild.type;
            name = liElements[x].firstChild.name;
            className = liElements[x].firstChild.className;

            if(type == 'label' || typeof type == 'undefined') {
                type = liElements[x].childNodes[1].type;
                name = liElements[x].childNodes[1].name;
                className = liElements[x].childNodes[1].className;
            }

            if(type != "text") {
                liElements.splice(x, 1);
                x--;
            } else {
                if(className != "DS" && className != "tiedElem") {
                    liElements.splice(x, 1);
                    x--;
                }
            }
        }

        //Now have array filled with DataSources and roles ONLY.
        // Find first DataSource, then look for connected roles.
        //  End the DataSource, then move to the next, removing nodes along the way.
        var dsName = "";

        if(liElements.length == 0) {
            dsEmpty = "true";
        }

        while(liElements.length > 0) {
            var counter = 0;

            while(liElements[counter].firstChild.className != "DS" && counter < liElements.length) {
                counter++;
            }

            dsName = liElements[counter].firstChild.id;

            var name = "";

            if(liElements[counter].firstChild.value != "") {
                name = liElements[counter].firstChild.value;
            } else {
                name = dsName;
            }

            dsString = dsString + '\t\t<DataSource name="'+ name +'" where="true">\n';

            dsString = dsString + '\t\t\t<Roles>\n';

            liElements.splice(counter, 1);

            dsString = findRoles(liElements, dsName, dsString);

            dsString = dsString + '\t\t\t</Roles>\n\t\t</DataSource>\n';
        }

        dsString = dsString + '\t</DataSources>\n\n';

        if(dsEmpty == "true") {
            dsString = "";
        }

        function findRoles(elements, name, string) {
            var elem;

            for(n = 0; n < elements.length; n++) {
                elem = elements[n].childNodes[1];

                if(elem.type == 'text') {
                    if(elem.value == name) {
                        var id = elem.id;
                        var min = 0;//elements[n].childNodes[6].value;
                        var max = 0;//elements[n].childNodes[8].value;
                        //var e = elements[n].childNodes[3];
                        var type = "A";//e.options[e.selectedIndex].text;

                        if(!min) {
                            min = 0;
                        }
                        if(!max) {
                            max = 0;
                        }
                        string = string + '\t\t\t\t<Role maxVars="'+ max +'" minVars="'+ min +'" name="'+ id +'" order="true" type="'+ type +'">'+ "TESTING" +'</Role>\n';

                        elements.splice(n, 1);
                        n--;
                    }
                }
            }

            return(string);
        }

        var opsNumb = endString.search("<Options>");

        endString = endString.substring(0, opsNumb) + dsString + endString.substring(opsNumb-3);

        //2. If fieldset or LI, print. Else, skip it
        //     -Since all elements must be in groups if one exists, check first element.
        //     -If it is a group, print the string for the group, then move down the group. Ignore div's and ul's.

        var z = 0;

        if(m == 0) {
            z = 1;
        }

        //For each element in the tab.
        for(z; z < childArray.length; z++) {
            var cursor = childArray[z];

            optionsPrint(cursor);
        }
    }

    var pos = 0;
    var i = -1;

    // Search the string and counts the number of e's
    while (pos != -1) {
        pos = endString.indexOf("\n", i + 1);
        if(pos != -1) {
            i = pos;
        }
    }

    endString = endString.substring(0, i) + '  </Options>\n</Metadata>\n';

    //UI SECTION
    var uiString = "<UI>\n";

    function uiPrint(cursor) {
        var type = cursor.type;

        if(type == "") {
            type = cursor.nodeName;
        }

        if(type == 'null') {

        } else if(type == 'fieldset') {
            //Print string and move to child node.
            var name = cursor.innerText;

            if(m > 0) {
                while(name.search("Edit") != -1){
                    name = name.substring(6);
                }
            } else {
                while(name.search("Edit") != -1){
                    name = name.substring(5);
                }
            }

            name = name.substring(0, (name.length) - 2);

            uiString = uiString + '\t  <Group open="true" option="' + cursor.id + '">\n';

            uiPrint(cursor.firstChild.firstChild);

            uiString = uiString + '\t  </Group>\n\n';

        } else if(type == 'UL') {
            //print and return.
            for(n = 0; n < cursor.children.length; n++) {
                uiPrint(cursor.children[n]);
            }
        } else if(type == 'LI') {
            var element = cursor.firstChild;
            var elemType = element.type;
            var role = "false";

            if(element.localName == "label") {
                element = cursor.childNodes[1];
                elemType = element.type;
                role = "true";
            }

            if(typeof elemType == 'undefined') {
                var test = element.className.slice(0, 10);

                if(test == 'slideStuff') {
                    elemType = "slider";
                }
            }

            if(elemType == 'checkbox' || elemType == 'radio' || elemType == 'color' || elemType == 'number' || elemType == 'slider') {
                uiString = uiString + '\t\t<OptionItem option="'+ String(element.id) +'"/>\n';
            } else if(elemType == 'text') {
                if(role == "true") {
                    uiString = uiString + '\t\t<RoleItem role="'+ String(element.id) +'"/>\n';
                } else if(element.className == "DS") {
                    uiString = uiString + '\t\t<DataItem data="'+ String(element.id) +'"/>\n';
                } else {
                    uiString = uiString + '\t\t<OptionItem option="'+ String(element.id) +'"/>\n';
                }
            } else if(elemType == 'select-one') {
                uiString = uiString + '\t\t<OptionChoice option="'+ String(element.id) +'">\n';

                for(j = 0; j < element.options.length; j++) {
                    uiString = uiString + '\t\t <OptionItem option="'+
                        element.options[j].value.toLowerCase() +'"/>\n';
                }

                uiString = uiString + '\t\t</OptionChoice>\n\n';
            }
        }
    }

    for(m = 0; m < tabCount; m++) {

        var tabContID = document.getElementById(tabID[m]).children[0].id;

        var childArray = document.getElementById(tabContID).childNodes;

        var elem = tabTitles[m].innerText;

        if(m > 0) {
            elem = elem.slice(0, (elem.length) - 2);
        }

        uiString = uiString + '\t<Container option="' + tabs[m].id + '">\n';

        var z = 0;

        if(m == 0) {
            z = 1;
        }

        for(z; z < childArray.length; z++) {
            var cursor = childArray[z];

            uiPrint(cursor);
        }

        uiString = uiString + '\t</Container>\n\n';
    }

    uiString = uiString + '</UI>\n'

    var name = document.getElementById("nameTitle").value;
    var descrip = document.getElementById("descTitle").value;
    var procs = document.getElementById("procTitle").value;

    var regiString = '<?xml version="1.0" encoding="UTF-8"?><Task schemaVersion="5.0">\n' +
    "\t<Registration>\n" + "\t\t<Name>" + name + "</Name>\n" + "\t\t<Description>" + descrip + "</Description>\n" +
    "\t\t<GUID>454536B-485B-493E-B21A-EF19D7DA3E1C</GUID>\n" +
    "\t\t<Procedures>"+ procs + "</Procedures>\n" + "\t\t<Version>3.5</Version>\n" +
    "\t\t<Links>\n" + '\t\t<Link href="http://support.sas.com/documentation/onlinedoc/sasstudio/index.html">SAS Studio Users Guide</Link>\n' +
    '\t\t<Link href=""> </Link>\n' + '\t\t<Link href=""> </Link>\n' +
    '\t\t<Link href="http://support.sas.com/documentation/cdl/en/proc/68954/HTML/default/viewer.htm#p1dlh3svb4rrasn14h8jm6nyrj5o.htm">The PRINT Procedure</Link>\n' +
    '\t\t<Link href=""> </Link>\n' + '\t\t<Link href=""> </Link>\n' +
    '\t\t<Link href="http://support.sas.com/documentation/cdl/en/proc/68954/HTML/default/viewer.htm#p0ha9ymifyaqldn14m2xlqw252wa.htm">The SORT Procedure</Link>\n' +
    '\t\t<Link href=""> </Link>\n' + '\t\t<Link href=""> </Link>\n' +
    '\t\t<Link href="http://support.sas.com/training/studio">SAS Tutorials</Link>\n' +
    "\t  </Links>\n" + "\t<Category>Data</Category>\n" + "</Registration>\n";

    var endTaskString = '  <CodeTemplate>\n' +
        '\t<![CDATA[\n\n' + 'proc print data=sashelp.cars;run;\n\n' +
        '\t]]>\n' + '  </CodeTemplate>\n' + '</Task>';

    var modal = document.getElementById('myModal');
    var btn = document.getElementById("buttOutput");
    var span = document.getElementsByClassName("close")[0];

    var completeString = regiString + endString + uiString + endTaskString;

    document.getElementById('modalContent').value = completeString;

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if(event.target == modal) {
            modal.style.display = "none";
        }
    }
}
