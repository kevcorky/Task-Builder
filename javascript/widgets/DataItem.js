/*
All functions related to creating a Data item.
*/
var dataCount = 1;

// SETTER
function addData() {
    dataCount++;
}

// GETTER
function getData() {
    return(dataCount);
}

// Adds the Data item as well as the 'Edit' and 'delete' buttons.
function dataSource() {
    var node = document.createElement("LI");
    node.setAttribute('class', 'base');

    var x = document.createElement("INPUT");
    x.setAttribute("type", "textarea");
    x.setAttribute('class', 'DS');
    var dataName = "data_" + String(getData());
    addData();
    x.setAttribute("id", dataName);

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
