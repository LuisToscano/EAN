/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($){
    $.fn.extend({ 
       dragAndDrop: function(config){
           $container = $(this);
           $container.prop("info", {drags:{}, drops:{}, intentos: 0});
           var foo = $container.prop("info");
           if(config.hasOwnProperty("tipologia") && 
              config.hasOwnProperty("tipo_drags") &&
              config.hasOwnProperty("drags") && 
              config.hasOwnProperty("drops")){
          
               if(!config.hasOwnProperty("intentos")){
                   config.intentos = 1;
               }
               
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
                   
                   case "categoria":{
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
                                    if (value.current_drags !== null && value.current_drags.hasOwnProperty(dragKey)) {
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
                         $drop = $("<div>",{"class": "categoryDropElement"});
                         foo.drops[key].obj = $drop;
                         foo.drops[key].current_drags = {};
                         foo.drops[key].correct = false;
                         $drop.droppable({
                         drop: function (event, ui) {
                            var dragKey = $(ui.draggable).prop("key");
                            foo.drops[key].current_drags[dragKey] = $(ui.draggable);
                            var curDrags = foo.drops[key].current_drags;
                            var correct = value.accepted.length === Object.keys(curDrags).length;
                            if(correct){
                                $.each(value.accepted, function(key, value){
                                    if(!curDrags.hasOwnProperty(value)){
                                        correct = false;
                                        return false;
                                    }
                                });
                            }
                            foo.drops[key].correct = correct;
                        },
                        out: function (event, ui) {
                            var curDrags = foo.drops[key].current_drags;
                            if (curDrags.hasOwnProperty($(ui.draggable).prop("key"))) {
                                delete curDrags[$(ui.draggable).prop("key")];
                                var correct = value.accepted.length === Object.keys(curDrags).length;
                                if(correct){
                                    $.each(value.accepted, function(key, value){
                                        if(!curDrags.hasOwnProperty(value)){
                                            correct = false;
                                            return false;
                                        }
                                    });
                                }
                                foo.drops[key].correct = correct;
                            }
                        }
                        });
                        $container.append($drop);
                     });
                     break;
                   }
                   }
                     
                     $button = $("<button>",{"class": "dragDropButton"});
                     $button.html("Enviar");
                     
                     $button.click(function(){
                         foo.intentos++;
                         var correct = true;
                         $.each(foo.drops, function(key, value){
                                    if (!value.correct) {
                                        correct = false;
                                        return false;
                                    }
                                });
                     
                     if(correct){
                             alert("Respuesta correcta");
                             $.each(foo.drags, function(key, value){
                                    value.obj.draggable("destroy");
                                });
                         }else{
                             if(foo.intentos >= config.intentos){
                                alert("Respuesta incorrecta");
                                $.each(foo.drags, function(key, value){
                                    value.obj.draggable("destroy");
                                });
                            }else{
                                alert("vuelva a intentarlo");
                                switch(config.tipologia){
                                    case "sencillo":{
                                        $.each(foo.drops, function(key, value){
                                            if(!value.correct && value.current_drag !== null){
                                                moverDrag(foo.drags[value.current_drag].obj, foo.drags[key].posicion);
                                                value.current_drag = null;
                                            }
                                        });
                                        break;
                                    }
                                    
                                    case "categoria":{
                                         $.each(foo.drops, function(key, value){
                                            if(!value.correct && value.current_drags !== null){
                                                $.each(value.current_drags, function(keys, values){
                                                    if(config.drops[key].accepted.indexOf(keys)<0){
                                                       moverDrag(values, foo.drags[keys].posicion);
                                                       delete value.current_drags[keys];
                                                    }
                                                });
                                            }
                                        });
                                        break;
                                    }
                                }
                            }
                         }
                     });
                     
                     $container.append($button);
           }else{
               console.log("Error en configuración del Drag and Drop");
           }
       }
    });
})(jQuery);

function moverDrag(dragObj, position) {
    dragObj.css({top: position.top, left: position.left});
}
