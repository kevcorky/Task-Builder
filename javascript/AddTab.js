var tabTitle = $( "#tab_title" );
var tabTemplate = "<li class='tabEdit'><input class='txtTab' type='text'/><a href='#{href}' class='tabHeader'>#{label}</a> <a href='#' class='removeX'>x</a></li>";
var tabs = $( "#tabs" ).tabs();

function addTab() {
  var label = tabTitle.val() || "Tab " + getTab(),
    id = "tabs-" + getTab(),
    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );

  tabs.find( ".ui-tabs-nav" ).append( li );
  tabs.append( "<div id='" + id + "' style='width:98%; height:85%'>" +
                '<ul id="' + id + '-cont" class="tabContent"' + 'style="list-style-type:none"></ul>' +
            "</div>" );
  tabs.tabs( "refresh" );

  var tabCount = getTab();
  for( var i = 1; i < tabCount; i++) {
    var idString = "#tabs-" + i + "-cont";
    if ( !($('#list').hasClass('ui-sortable')) ) {
      $(idString).sortable({
          placeholder: "ui-sortable-placeholder"
      });
    }
  }

  renameTabs();
}
