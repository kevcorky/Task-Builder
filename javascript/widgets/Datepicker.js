/*
All functions related to creating a Datepicker item.
*/
var dateCount = 1;

// SETTER
function addDate() {
    dateCount++;
}

// GETTER
function getDate() {
    return(dateCount);
}


// Adds the Datepicker as well as the 'Edit' and 'delete' buttons.
function dateButt() {
    var node = document.createElement("LI");
    node.setAttribute('class', 'base');

    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute('class', 'date');

    x.addEventListener("click", function() {
        $( this ).datepicker();
        $( this ).datepicker("show");
    });

    var dateName = "date " + String(getDate());
    addDate();
    x.setAttribute('id', dateName);

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
function dateProps(myValue) {
    document.getElementById("list_3").innerHTML = "";
    var linebreak = document.createElement('br');

    //Properties Title
    var node = document.createElement("LI");
    var x = document.createTextNode("Datepicker");
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
        document.getElementById(myVal).parentNode.appendChild(sturf);
    }

    node2.appendChild(label);
    node2.appendChild(y);
    document.getElementById("list_3").appendChild(node2);
}
