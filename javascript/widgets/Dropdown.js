/*
All functions related to creating a Dropdown item.
*/
var dropCount = 1;

// SETTER
function addDrop() {
    dropCount++;
}

//GETTER
function getDrop() {
    return(dropCount);
}

// Adds the Dropdown as well as the 'Edit' and 'delete' buttons.
function dropdown() {
    var x = document.createElement('div');
    var node = document.createElement("LI");
    node.setAttribute('class', 'base');

    var dropName = "drop " + String(getDrop());
    addDrop();
    x.setAttribute("id", dropName);
    x.setAttribute('class', 'dropdown');

    x.innerHTML = "<select name='' class='dropdown' id='" + String(dropName) + "'>"
        + '<option value="" disabled selected hidden>Please select</option>'
    +'</select>';

    while(x.firstChild) {
        node.appendChild(x.firstChild);
    }

    var y = document.createElement('button');
    y.setAttribute('content', 'test content');
    y.setAttribute('class', 'properties');
    y.innerHTML = 'Edit';

    var z = document.createElement('button');
    z.setAttribute('content', 'test content');
    z.setAttribute('class', 'delete');
    z.innerHTML = 'x';

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
function dropProps(myValue) {
    document.getElementById("list_3").innerHTML = "";

    var node = document.createElement("LI");
    var x = document.createTextNode("Combobox");
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
        elem = child[3].textContent;
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

    node2.appendChild(label);
    node2.appendChild(y);
    document.getElementById("list_3").appendChild(node2);

    var node3 = document.createElement("LI");
    var field = document.createElement('input');
    field.setAttribute('type', 'text');
    field.setAttribute('id', 'addition');

    var butt = document.createElement("INPUT");
    butt.setAttribute("type", "button");
    butt.setAttribute("value", "Add");

    field.addEventListener("change", function() {
        addEntry(myValue, field);
    });

    butt.addEventListener("click", function() {
        addEntry(myValue, field);
    });

    function addEntry(myVal, field) {
        if(field.value == "") {
            return;
        }
        var test = document.getElementById(myVal);
        if(test.firstChild.disabled) {
            var elt = document.getElementById('myList');

            document.getElementById(myVal).remove(elt.firstChild);
            elt.remove(elt.firstChild);
        }
        var entry = document.createElement("option");
        entry.text = field.value;
        var copy = document.createElement("option");
        copy.text = field.value;
        document.getElementById(myVal).add(entry);
        document.getElementById('myList').add(copy);
        field.value = "";
    }

    node3.appendChild(field);
    node3.appendChild(butt);
    document.getElementById("list_3").appendChild(node3);

    var node4 = document.createElement("LI");
    var menu = document.createElement('div');
    var e = document.getElementById(myValue);
    var optionsArray = new Array();

    for(i = 0; i < e.options.length; i++) {
        optionsArray[i] = e.options[i].value;
    }

    menu.innerHTML = "<select id='myList' size='6'>"
        + "</select>";

    while(menu.firstChild) {
        node4.appendChild(menu.firstChild);
    }

    var del = document.createElement("INPUT");
    del.setAttribute("type", "button");
    del.setAttribute("value", "Delete");
    del.setAttribute('id', 'removeOption');

    del.addEventListener('click', function() {
        deleteOption(myValue);
    });

    function deleteOption(myVal) {
        var elt = document.getElementById('myList');

        document.getElementById(myVal).remove(elt.selectedIndex);
        elt.remove(elt.selectedIndex);
    }

    node4.appendChild(del);
    document.getElementById("list_3").appendChild(node4);

    for(i = 0; i < optionsArray.length; i++) {
        var enter = document.createElement("option");
        enter.text = optionsArray[i];
        document.getElementById('myList').add(enter);
    }
}
