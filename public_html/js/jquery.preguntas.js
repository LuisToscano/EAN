/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($){
    $.fn.extend({ 
       generarPreguntas: function(config){
          $container = $(this);
          $container.prop("info", {preguntas:{}, tipo: "one"});
          var foo = $container.prop("info");
          shuffle(config.preguntas);
          if(config.hasOwnProperty("cantidad_preguntas") && config.hasOwnProperty("preguntas")){
          var preguntas = config.preguntas;
          if(config.cantidad_preguntas < config.preguntas.length) {
            preguntas = config.preguntas.slice(0,config.cantidad_preguntas);
          }
          var cont = 0;
          $.each(preguntas, function(key, value){
               foo.preguntas[key] = {correct: false};
               $question_tab = $("<div>",{"id": "tab_pregunta_"+cont});
               $span = $("<span>",{"class":"numeracion"});
               $span.html((cont+1)+". ");
               $p = $("<p>",{"class":"pregunta"}).html(value.pregunta);
               $p.prepend($span);
               $question_tab.append($p);
                switch(value.tipo){
                  case "pick_many":{
                    var contador = 0;
                    $.each(value.picks, function(keys, values){
                        if(values.correct){
                            contador++;
                            if(contador>1){
                                foo.tipo = "many";
                                return false;
                            }
                        }
                    });

                    $.each(value.picks, function(keys, values){
                        var $input;
                        if(!values.hasOwnProperty("correct")){
                            values.correct = false;
                        }
                        if(foo.tipo === "many"){
                            $input = $("<input>",{"type": "checkbox", "name": "pregunta_"+key+"_"+keys, "option_number": keys});
                            $input.prop("correct", values.correct);
                            $input.click(function(){
                               var correcto = true;
                               $("input[name^=pregunta_"+key+"]").each(function(){
                                   if(($(this).prop("correct") && !$(this).is(':checked')) || (!$(this).prop("correct") && $(this).is(':checked'))){
                                      correcto = false;
                                      return false;
                                   }
                               });
                               foo.preguntas[key].correct = correcto;
                               alert(foo.preguntas[key].correct);
                            });
                        }else{
                            $input = $("<input>",{"type": "radio", "name": "pregunta_"+key, "option_number": keys});
                            $input.prop("correct", values.correct);
                            $input.click(function(){
                                foo.preguntas[key].correct = $(this).is(':checked') && $(this).prop("correct");
                            });
                        }
                        
                        $p = $("<p>",{"class":"opcion_respuesta"}).html(values.tag);
                        $p.prepend($input);
                        $question_tab.append($p);
                    });
                    break;
                  }
              }
              $container.append($question_tab);
              cont++;
          });
          $("#tab_pregunta_0").show();
        }
        else{
            console.log("Error en la configuración");
        }
       }
    });
})(jQuery);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}