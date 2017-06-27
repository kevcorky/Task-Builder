/*
All functions related to creating a checkbox item.
*/

var checkCount = 1;

//SETTER
function addCheck() {
    checkCount++;
}
//GETTER
function getCheck() {
    return(checkCount);
}

// Adds the Checkbox as well as the 'Edit' and 'delete' buttons.
function checkbox() {
    var node = document.createElement("LI");
    node.setAttribute('class', 'base');

    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.setAttribute('class', 'check');
    x.setAttribute('name', "");
    var checkName = "checkbx " + String(getCheck());
    addCheck();
    x.setAttribute("id", checkName);

    var y = document.createElement('button');
    y.setAttribute('content', 'test content');
    y.setAttribute('class', 'properties');
    y.innerHTML = 'Edit';

    var z = document.createElement('button');
    z.setAttribute('class', 'delete');
    z.innerHTML = 'x';

    node.appendChild(x);
    node.appendChild(y);
    node.appendChild(z);

    var tabID = String(getSelectedTabId());

    var tabContID = document.getElementById(tabID).children[0].id;

    document.getElementById(tabContID).appendChild(node);

    var active = $("#tabs .ui-tabs-panel:visible").attr("id");

    var test = document.getElementById(active).getElementsByClassName("fieldClass");

    if(test.length > 0) {
        remake();
    }
}

//Is called when the Edit button is clicked. Creates the appropriate Properties.
function checkProperties(myValue) {
    document.getElementById("list_3").innerHTML = "";
    var linebreak = document.createElement('br');

    //Properties Title
    var node = document.createElement("LI");
    var x = document.createTextNode("Checkbox");

    var el_span = document.createElement('span');
    el_span.setAttribute('class', 'propLabel');

    el_span.appendChild(x);
    node.appendChild(el_span);
    document.getElementById("list_3").appendChild(node);

    //Textbox for Label change.
    var node2 = document.createElement("LI");
    var label = document.createTextNode("Label: ");

    var y = document.createElement('input');
    y.setAttribute('type', 'text');
    y.setAttribute('id', 'selector');

    var elem = document.getElementById(myValue).name;
    if(elem != "") {
        y.setAttribute('value', elem);
    }

    y.addEventListener("change", function() {
        setValues(myValue, y);
    });

    function setValues(myVal, y) {
        document.getElementById(myVal).setAttribute('name', y.value);
        var sturf = document.createTextNode(String(y.value));
        var searching = document.getElementById(myVal).parentNode;
        if(searching.lastChild.nodeType == 3) {
            searching.lastChild.remove();
        }
        document.getElementById(myValue).parentNode.appendChild(sturf);
    }

    node2.appendChild(label);
    node2.appendChild(y);
    document.getElementById("list_3").appendChild(node2);

    //Default value buttons.
    var node3 = document.createElement("LI");
    var On = document.createElement("INPUT");
    On.setAttribute("type", "radio");
    On.setAttribute('id', 'on');
    On.setAttribute('class', 'switch');
    On.setAttribute('value', 'checked');
    On.setAttribute('name', 'onOff');
    On.addEventListener("change", function() {
        changeBox(myValue);
    });

    function changeBox(myVal) {
        document.getElementById(myVal).checked = !document.getElementById(myVal).checked;
    }

    var Off = document.createElement("INPUT");
    Off.setAttribute("type", "radio");
    Off.setAttribute('id', 'off');
    Off.setAttribute('class', 'switch');
    Off.setAttribute('value' , 'unchecked');
    Off.setAttribute('name', 'onOff');

    if(document.getElementById(myValue).checked) {
        On.setAttribute('checked', 'true');
    } else {
        Off.setAttribute('checked', 'true');
    }

    Off.addEventListener("change", function() {
        changeBox(myValue);
    });

    document.getElementById(myValue).addEventListener("change", function() {
        if(On.checked) {
            On.checked = false;
            Off.checked = true;
        } else {
            Off.checked = false;
            On.checked = true;
        }
    });

    var onLabel = document.createTextNode("Checked:  ");
    node3.appendChild(onLabel);
    node3.appendChild(On);

    node3.appendChild(linebreak);

    var offLabel = document.createTextNode("Unchecked: ");
    node3.appendChild(offLabel);
    node3.appendChild(Off);

    document.getElementById("list_3").appendChild(node3);
}
