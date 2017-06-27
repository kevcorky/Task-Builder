/*
All functions related to creating a Role item.
*/
var roleCount = 1;

// SETTER
function addRole() {
    roleCount++;
}

// GETTER
function getRole() {
    return(roleCount);
}

// Adds the Role as well as the 'Edit' and 'delete' buttons.
function role() {
    var x = document.createElement('div');
    var node = document.createElement("LI");
    node.setAttribute('class', 'base');

    var dsElem = document.createElement('INPUT');
    dsElem.setAttribute('type', 'textarea');
    dsElem.setAttribute('class', 'tiedElem');
    var dsID = "dsTied_" + String(getRole());
    dsElem.setAttribute('id', dsID);

    var dsLabel = document.createElement('label');
    dsLabel.htmlFor = dsID;
    dsLabel.innerHTML = 'DataSource: ';

    node.appendChild(dsLabel);
    node.appendChild(dsElem);

    var roleName = "role_" + String(getRole());
    x.setAttribute("id", roleName);
    x.setAttribute('class', 'roles');

    var label = document.createElement('label');
    label.htmlFor = roleName;
    label.innerHTML = "Type: ";

    x.innerHTML = "<select name='' style='margin-right: 5px; display: none' class='roles' id='" + String(roleName) + "'>"
        + '<option>A</option>'
        +'<option>N</option>'
        +'<option>C</option>'
    +'</select>';

    while(x.firstChild) {
        node.appendChild(x.firstChild);
    }

    var min = document.createElement("INPUT");
    min.setAttribute('type', 'number');

    var minID = 'minRole_' + getRole();
    min.setAttribute('id', minID);
    min.setAttribute('min', '0');
    min.setAttribute('max', '10');
    min.setAttribute('style', 'margin-right: 5px; display: none');
    min.setAttribute('label', 'Min:');
    min.setAttribute('class', 'minMax');

    var label_1 = document.createElement('label');
    label_1.htmlFor = minID;
    label_1.innerHTML = "Min: ";

    var max = document.createElement("INPUT");
    max.setAttribute('type', 'number');
    var maxID = 'maxRole_' + getRole();
    max.setAttribute('id', maxID);
    max.setAttribute('class', 'minMax');

    max.setAttribute('min', '0');
    max.setAttribute('max', '10');
    max.setAttribute('style', 'margin-right: 5px; display: none');
    max.setAttribute('label', 'Max:');

    var label_2 = document.createElement('label');
    label_2.htmlFor = maxID;
    label_2.innerHTML = "Max: ";

    addRole();

    var y = document.createElement('button');
    y.setAttribute('content', 'test content');
    y.setAttribute('class', 'properties');
    y.innerHTML = 'Edit';

    var z = document.createElement('button');
    z.setAttribute('content', 'test content');
    z.setAttribute('class', 'delete');
    z.innerHTML = 'x';

    node.appendChild(min);

    node.appendChild(max);

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
function roleProps(myValue) {

    document.getElementById("list_3").innerHTML = "";

    var node = document.createElement("LI");
    var x = document.createTextNode("Role");
    var el_span = document.createElement('span');
    el_span.setAttribute('class', 'propLabel');

    el_span.appendChild(x);
    node.appendChild(el_span);
    document.getElementById("list_3").appendChild(node);

    var active = $("#tabs .ui-tabs-panel:visible").attr("id");

    var temp = document.getElementById(active).getElementsByTagName("li");
    var elems = new Array();

    var finalEntries = new Array();

    for(j = 0; j < temp.length; j++) {
        elems[j] = temp[j].cloneNode(true);
    }

    for(var i = 0; i < elems.length; i++) {
        var temp = elems[i].firstChild;

        if(temp.className == "DS") {
            finalEntries.push(elems[i]);
        }
    }

    var node4 = document.createElement("LI");
    var menu = document.createElement('div');
    menu.innerHTML = "<select id='dsOptions' size='6'>"
        + "</select>";

    while(menu.firstChild) {
        node4.appendChild(menu.firstChild);
    }

    var submit = document.createElement('INPUT');
    submit.setAttribute('type', 'button');
    submit.value = "Connect To";

    submit.addEventListener('click', function() {
        var e = document.getElementById("dsOptions");
        var str = e.options[e.selectedIndex].text;

        document.getElementById(myValue).parentNode.children[1].value = str;
    });

    node4.appendChild(submit);

    document.getElementById("list_3").appendChild(node4);

    for(i = 0; i < finalEntries.length; i++) {
        var enter = document.createElement("option");
        enter.text = String(finalEntries[i].firstChild.id);
        document.getElementById('dsOptions').add(enter);
    }
}
