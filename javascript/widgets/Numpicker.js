/*
All functions related to creating a Number picker item.
*/
var numCount = 1;

// SETTER
function addNum() {
    numCount++;
}

// GETTER
function getNum() {
    return(numCount);
}

// Adds the Number picker as well as the 'Edit' and 'delete' buttons.
function numbers() {
    var node = document.createElement("LI");
    node.setAttribute('class', 'base');

    var x = document.createElement("INPUT");
    x.setAttribute('type', 'number');
    x.setAttribute('min', '0');
    x.setAttribute('max', '100');
    x.setAttribute('class', 'numbah');

    var slideName = "num " + String(getNum());
    addNum();
    x.setAttribute('id', slideName);

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
function numProps(myValue) {
    document.getElementById("list_3").innerHTML = "";
    var linebreak = document.createElement('br');

    //Properties Title
    var node = document.createElement("LI");
    var x = document.createTextNode("Numstepper");
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

    //Change the min and max values.
    var node3 = document.createElement("LI");
    var labelMin = document.createTextNode("Min. Value: ");

    var min = document.createElement('input');
    min.setAttribute('type', 'text');
    min.setAttribute('id', 'minVal');

    var max = document.createElement('input');
    max.setAttribute('type', 'text');
    max.setAttribute('id', 'minVal');

    var tempMin = document.getElementById(myValue).getAttribute("min");
    var tempMax = document.getElementById(myValue).getAttribute("max");
    min.setAttribute('value', tempMin);
    max.setAttribute('value', tempMax);

    min.addEventListener("change", function() {
        setMin(myValue, min);
    });

    max.addEventListener("change", function() {
        setMax(myValue, max);
    });

    function setMin(myVal, min) {
        document.getElementById(myVal).setAttribute("min", min.value);

        var tempVal = document.getElementById(myVal).value;
        var minVal = min.value;

        if(tempVal < minVal) {
            document.getElementById(myVal).value = minVal;
        }
    }

    function setMax(myVal, max) {
        document.getElementById(myVal).setAttribute('max', max.value);

        var tempVal = document.getElementById(myVal).value;
        var maxVal = max.value;

        if(tempVal > maxVal) {
            document.getElementById(myVal).value = maxVal;
        }
    }

    var minText = document.createTextNode("Min: ");
    var maxText = document.createTextNode("Max: ");

    node3.appendChild(minText);
    node3.appendChild(min);
    node3.appendChild(linebreak);
    node3.appendChild(maxText);
    node3.appendChild(max);
    document.getElementById("list_3").appendChild(node3);
}
