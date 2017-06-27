/*
All functions related to creating a checkbox item.
*/

var radioCount = 1;

//SETTER
function addRadio() {
    radioCount++;
}

//GETTER
function getRadio() {
    return(radioCount);
}

// Adds the radio button as well as the 'Edit' and 'delete' buttons.
function radio() {
    var node = document.createElement("LI");
    node.setAttribute('class', 'base');

    var x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute('class', 'rad');
    x.setAttribute("id", "rd");
    var radioName = "radio " + String(getRadio());
    addRadio();
    x.setAttribute("id", radioName);

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
function radioProperties(myValue) {
    document.getElementById("list_3").innerHTML = "";

    var node = document.createElement("LI");
    var x = document.createTextNode("Radio Button");
    var el_span = document.createElement('span');
    el_span.setAttribute('class', 'propLabel');

    el_span.appendChild(x);
    node.appendChild(el_span);
    document.getElementById("list_3").appendChild(node);

    var node2 = document.createElement("LI");
    var label = document.createTextNode("Label: ");

    var y = document.createElement('input');
    y.setAttribute('type', 'text');
    y.setAttribute('id', 'selector');

    var elem = "";

    var temp = document.getElementById(myValue).parentNode;
    var child = temp.childNodes;
    var count = child.length;

    if(count == '4') {
        elem =child[3].textContent;
    }

    if(elem != "") {
        y.setAttribute('value', elem);
    }

    y.addEventListener("change", function() {
        setLabel(myValue, y);
    });

    function setLabel(myVal, y) {
        var sturf = document.createTextNode(String(y.value));
        var searching = document.getElementById(myVal).parentNode;
        if(searching.lastChild.nodeType == 3) {
            searching.lastChild.remove();
        }
        document.getElementById(myVal).parentNode.appendChild(sturf);
    }

    function setValues(myVal, y) {
        document.getElementById(myVal).setAttribute('name', y.value);
    }

    node2.appendChild(label);
    node2.appendChild(y);
    document.getElementById("list_3").appendChild(node2);

    var node3 = document.createElement("LI");
    var label2 = document.createTextNode("Group Name: ");

    var groupLabel = document.createElement('input');
    groupLabel.setAttribute('type', 'text');
    groupLabel.setAttribute('id', 'selector2');

    var elem2 = document.getElementById(myValue).name;

    if(elem2 != myValue) {
        groupLabel.setAttribute('value', elem2);
    }

    groupLabel.addEventListener("change", function() {
        setValues(myValue, groupLabel);
    });

    node3.appendChild(label2);
    node3.appendChild(groupLabel);
    document.getElementById("list_3").appendChild(node3);
}
