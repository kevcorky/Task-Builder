function renameTabs() {
    var tabs = $( "#tabs" ).tabs();
    tabs.find( ".ui-tabs-nav" ).sortable({
           axis: "x",
           stop: function() {
              tabs.tabs( "refresh" );
          },
          select: function(event, ui) {
              alert("PRESSED TAB!");
          }
     });

    $('.tabEdit').off('dblclick');
    $('.tabEdit').off('keydown blur dblclick');

    $('.tabEdit').on('dblclick',function(){
        $(this).find('input').toggle().val($(this).find('a.tabHeader').html()).focus();
        $(this).find('a.tabHeader').toggle();
    });

   $('.tabEdit').on('keydown blur dblclick','input',function(e){
       if(e.type=="keydown")
       {
         if(e.which==13)
          {
              $(this).toggle();
              $(this).siblings('a.tabHeader').toggle().html($(this).val());
          }
          if(e.which==38 || e.which==40 || e.which==37 || e.which==39 || e.keyCode == 32)
          {
             e.stopPropagation();
        }

       }
       else if(e.type=="focusout")
       {
           if($(this).css('display')=="inline-block")
           {
               $(this).toggle();
               $(this).siblings('a.tabHeader').toggle().html($(this).val());
           }
       }

   });
}
