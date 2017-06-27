/*
All functions related to creating a Slider item.
*/
var slideCount = 1;

// SETTER
function addSlide() {
    slideCount++;
}

// GETTER
function getSlide() {
    return(slideCount);
}

// Adds the Slider as well as the 'Edit' and 'delete' buttons.
function slider() {
    var node = document.createElement("LI");
    node.setAttribute('class', 'base');

    var x = document.createElement("DIV");
    x.setAttribute('class', 'slideStuff');

    var slideName = "slider_" + String(getSlide());
    addSlide();
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

    $(function() {
        $( ".slideStuff" ).slider();
    });

    var active = $("#tabs .ui-tabs-panel:visible").attr("id");

    var test = document.getElementById(active).getElementsByClassName("fieldClass");

    if(test.length > 0) {
        remake();
    }
}

//Is called when the Edit button is clicked. Creates the appropriate Properties.
function slideProps(myValue) {
    document.getElementById("list_3").innerHTML = "";
    var linebreak = document.createElement('br');

    //Properties Title
    var node = document.createElement("LI");
    var x = document.createTextNode("Slider");
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

    var elem = document.getElementById(myValue).parentNode;
    var name = "";

    var node = elem.childNodes[3];

    if (typeof node !== 'undefined') {
        if(node.nodeType == 3) {
            name = String(node.data);
        }
    }

    if(name != "") {
        y.setAttribute('value', name);
    }

    y.addEventListener("change", function() {
        setValues(myValue, y);
    });

    function setValues(myVal, y) {
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
