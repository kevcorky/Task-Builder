function runSort() {

  var helperClone = function (event, object) {
      if (undefined == object) {
          var helper = $(this).clone(),
              height = $(this).height(),
              width = $(this).width();
      } else {
          var helper = object.clone(),
              height = object.height(),
              width = object.width();
      }

      return helper;
  },
      sortable = $(".sortable"),
      draggable = $(".base"),
      dragGroup = $(".fieldClass"),
      revertCheck = function () {
          console.log("revertCheck", sortable.find("li").length > 4, sortable.find("li").length);
      };

  draggable.draggable({
      connectToSortable: sortable,
      helper: helperClone,
      revert: revertCheck,

  });

  dragGroup.draggable({
      connectToSortable: sortable,
      helper: helperClone,
      revert: revertCheck,

  });

  sortable.sortable({
      placeholder: "ui-state-highlight",
      receive: function (event, ui) {
          console.log("receive", $(this).find("li").length < 4, $(this).find("li").length);
          ui.item.remove();

          var test = $(this).data().uiSortable.currentItem[0].type;

          if(test == 'fieldset') {
              $(this).data().uiSortable.currentItem.addClass('acceptable').css({
                  'margin-left': '0'
              });
          } else {
              $(this).data().uiSortable.currentItem.addClass('acceptable').css({
                  'margin-left': '0'
              });
          }

      },
      update: function (event, ui) {
          console.log("update", $(this).find("li").length < 4, $(this).find("li").length);
          if (!this.reverted) {
              //do stuff
              console.log("update fired");
          } else {
              this.reverted = false;
              console.log("update didn't fire");
              ui.item.effect('highlight', {
                  color: 'red'
              });
          }
      }
  });

  $(".tabs-1").droppable({
      accept: 'li, .fieldClass',
      over: function (event, ui) {
          $(this).effect('highlight');
      },
      drop: function (event, ui) {
          var target = $(this).find('ul');
          var clone = ui.draggable.clone();
          ui.draggable.remove();
          clone.appendTo(target).show().removeClass('acceptable').draggable({
              connectToSortable: sortable,
              helper: helperClone,
              revert: revertCheck
          });
      }
  });
  $("ul, li").disableSelection();

}
