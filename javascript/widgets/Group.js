var groupCount = 1;

// SETTER
function addGroup() {
    groupCount++;
}

// GETTER
function getGroup() {
    return(groupCount);
}


function addGroup() {
    var groupTitle = $( "#group_title" );

    var label = groupTitle.val() || "Group " + getGroup();

    var group = document.createElement("fieldset");
    group.setAttribute('class', 'fieldClass');

    var divSection = document.createElement("div");
    divSection.setAttribute('class', "innerGroup");

    var drop = document.createElement("UL");
    drop.setAttribute('class', 'sortable');

    var active = $("#tabs .ui-tabs-panel:visible").attr("id");

    var elems = document.getElementById(active).getElementsByTagName("li");

    var moving = new Array();

    for(q = 0; q < elems.length; q++) {
        var save = elems[q].parentNode.parentNode.className;
        if(save != 'innerGroup') {
            var tempElem = elems[q];
            tempElem.setAttribute('style', 'margin-left: 0');
            moving.push(tempElem);
        }
    }

    var counter = 0;
    var length = moving.length;

    while(length > counter) {
        drop.insertBefore(moving.pop(), drop.firstChild);

        length--;
    }

    divSection.appendChild(drop);
    group.appendChild(divSection);

    var fieldName = "group " + String(getGroup());
    groupCount++;
    group.setAttribute("id", fieldName);

    var legend = document.createElement('legend');
    legend.innerText = label + " ";

    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('style', 'text-decoration: none; color: red')

    var span = document.createElement('span');
    span.setAttribute('class', 'groupDel');
    span.innerText = "x";

    a.addEventListener('click', function(){
        $(this).parent().parent().remove();
    });

    legend.addEventListener('click', function(){
        $(this).parent().find('.innerGroup').slideToggle("slow");
    });

    legend.setAttribute('class', 'groupName');

    a.appendChild(span);
    legend.appendChild(a);
    group.appendChild(legend);

    var tabID = String(getSelectedTabId());

    var tabContID = document.getElementById(tabID).children[0].id;

    document.getElementById(tabContID).appendChild(group);

    active = '#' + active;

    runSort(active);

    remake();
}
