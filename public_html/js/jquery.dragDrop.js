/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($){
    $.fn.extend({ 
       dragAndDrop: function(config){
           $container = $(this);
           $container.prop("info", {drags:{}, drops:{}});
           var foo = $container.prop("info");
           if(config.hasOwnProperty("tipologia") && 
              config.hasOwnProperty("tipo_drags") &&
              config.hasOwnProperty("drags") && 
              config.hasOwnProperty("drops")){
               switch(config.tipologia){
                   case "sencillo":{
                     $.each(config.drags, function(key, value){
                         var $drag;
                         foo.drags[key] = {};
                         
                         switch(config.tipo_drags){
                             case "texto":{
                               if(value.hasOwnProperty("contenido")){
                                $span = $("<span>").html(value.contenido);
                                $drag = $("<div>",{"class": "dragElement"}).html($span);
                               }
                               else{
                                console.log("El contenido de un drag no ha sido definido correctamente.");
                               }
                             }
                         }
                        $drag.prop("key", key);
                        foo.drags[key].obj = $drag;
                        $drag.draggable({
                            stop: function () {
                                var returnToOrigin = true;
                                var dragKey = $(this).prop("key");
                                $.each(foo.drops, function(key, value){
                                    if (value.current_drag !== null && value.current_drag === dragKey) {
                                        returnToOrigin = false;
                                        return false;
                                    }
                                });

                                if (returnToOrigin) {
                                    moverDrag($(this), foo.drags[key].posicion);
                                }
                            }
                        });
                        foo.drags[key].posicion = {top: $drag.position().top , left: $drag.position().left};
                        $container.append($drag);
                     });
                     
                     $.each(config.drops, function(key, value){
                         foo.drops[key] = {};
                         $drop = $("<div>",{"class": "simpleDropElement"});
                         foo.drops[key].obj = $drop;
                         foo.drops[key].current_drag = null;
                         foo.drops[key].correct = false;
                         $drop.droppable({
                         drop: function (event, ui) {
                            var curDrag = foo.drops[key].current_drag;
                            var dragKey = $(ui.draggable).prop("key");
                            if (curDrag === null)
                            {
                                foo.drops[key].current_drag = dragKey;
                            }
                            else {
                                if (curDrag !== $(ui.draggable).prop("key")) {
                                    moverDrag(foo.drags[curDrag].obj, foo.drags[curDrag].posicion);
                                    foo.drops[key].current_drag = dragKey;
                                }
                            }
                            ui.draggable.position({
                                my: "center",
                                at: "center",
                                of: $(this)
                            });
                            foo.drops[key].correct = value.accepted.indexOf(foo.drops[key].current_drag)>=0;
                            console.log(foo);
                        },
                        out: function (event, ui) {
                            var curDrag = foo.drops[key].current_drag;
                            if (curDrag!==null && ($(ui.draggable).prop("key") === foo.drops[key].current_drag)) {
                                foo.drops[key].current_drag = null;
                                foo.drops[key].correct = false;
                            }
                        }
                        });
                        $container.append($drop);
                     });
                     break;
                   }
               }
           }else{
               console.log("Error en configuración del Drag and Drop");
           }
       }
    });
})(jQuery);

function moverDrag(dragObj, position) {
    dragObj.css({top: position.top, left: position.left});
}
