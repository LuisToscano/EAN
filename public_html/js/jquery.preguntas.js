/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($){
    $.fn.extend({ 
       generarPreguntas: function(config){
          $container = $(this);
          shuffle(config.preguntas);
          if(config.hasOwnProperty("cantidad_preguntas") && config.hasOwnProperty("preguntas")){
          var preguntas = config.preguntas;
          if(config.cantidad_preguntas < config.preguntas.length) {
            preguntas = config.preguntas.slice(0,config.cantidad_preguntas);
          }
          var cont = 0;
          $.each(preguntas, function(key, value){
               $question_tab = $("<div>",{"id": "tab_pregunta_"+cont});
               $span = $("<span>",{"class":"numeracion"});
               $span.html(cont+". ");
               $p = $("<p>",{"class":"pregunta"}).html(value.pregunta);
               $p.prepend($span);
               $question_tab.append($p);
              switch(value.tipo){
                  case "pick_many":{
                    break;
                  }
              }
              $container.append($question_tab);
              console.log($container);
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