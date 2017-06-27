function remake() {

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
        revertCheck = function () {
        };

    draggable.draggable({
        connectToSortable: sortable,
        helper: helperClone,
    });

    sortable.sortable({
        placeholder: "ui-state-highlight",
        receive: function (event, ui) {
            ui.item.remove();

            $(this).data().uiSortable.currentItem.addClass('acceptable').css({
                'width': 'auto',
                'height': 'auto',
                'margin-left': '0'
        });

        },

    });

}
