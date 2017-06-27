/*
All functions related to creating a Textbox item.
*/
var textCount = 1;

// SETTER
function addText() {
    textCount++;
}

// GETTER
function getText() {
    return(textCount);
}


// Adds the Checkbox as well as the 'Edit' and 'delete' buttons.
function text() {
      var node = document.createElement("LI");
      node.setAttribute('class', 'base');

      var x = document.createElement("INPUT");
      x.setAttribute("type", "textarea");
      x.setAttribute("id", "ta");
      x.setAttribute('class', 'txt');
      var textName = "textbx " + String(getText());
      addText();
      x.setAttribute("id", textName);

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
function textBoxProperties(myValue) {
    document.getElementById("list_3").innerHTML = "";

    var node = document.createElement("LI");
    var x = document.createTextNode("Textbox");
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

    node2.appendChild(label);
    node2.appendChild(y);
    document.getElementById("list_3").appendChild(node2);

    var node3 = document.createElement("LI");
    var label2 = document.createTextNode("Value: ");

    var groupLabel = document.createElement('input');
    groupLabel.setAttribute('type', 'text');
    groupLabel.setAttribute('id', 'selector2');

    var elem2 = document.getElementById(myValue).value;

    if(elem2 != myValue) {
        groupLabel.setAttribute('value', elem2);
    }

    groupLabel.addEventListener("change", function() {
        setValues(myValue, groupLabel);
    });

    function setValues(myVal, y) {
        document.getElementById(myVal).value = y.value;
    }

    node3.appendChild(label2);
    node3.appendChild(groupLabel);
    document.getElementById("list_3").appendChild(node3);
}
