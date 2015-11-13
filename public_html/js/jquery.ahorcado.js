/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var cssLink = $("<link rel='stylesheet' type='text/css' href='css/sopa_main.css'>");
//$("head").append(cssLink); 

(function ($) {
    $.fn.extend({
        ahorcado: function (config) {
            var cssLink = $("<link rel='stylesheet' href='icons/css/font-awesome.min.css'>");
            $("head").append(cssLink);
            var $container = $(this);
            var shuffled = shuffle(config.palabras);
            $container.prop("config", config);
            $container.prop("info", {palabras: [], palabras_restantes: [], current_word: 0, oportunidades: config.oportunidades_palabra, vidas: config.vidas});
            var foo = $container.prop("info");
            foo.palabras = shuffled.slice(0, config.cantidad_palabras);
            foo.palabras_restantes = shuffled.slice(config.cantidad_palabras, shuffled.length);

            var cont = 0;

            var $background = $("<div>", {class: "fondoAhorcado"});
            $background.append($("<img>", {src: getCurrentImage(config.imagenes, foo.oportunidades)}));
            $.each(foo.palabras, function (key, value) {
                var $word_tab = $("<div>", {id: "tab_palabra_" + cont});
                cont++;
                var $wordContainer = $("<div>", {class: "wordContainer"});
                for (var i = 0; i < value.length; i++) {
                    if(value.charAt(i)!==" "){
                        var $input = $("<input>", {type: "text"});
                        $input.attr("size", 1);
                        $input.attr("maxlength", 1);
                        $input.attr("readonly", true);
                        $input.prop("letra", value.charAt(i));
                        $wordContainer.append($input);
                    }else{
                        var $separator = $("<div>", {class: "separator"});
                        $wordContainer.append($separator);
                    }
                }
                $word_tab.append($wordContainer);
                $background.append($word_tab);
            });

            $container.append($background);
            var $letrasContainer = $("<div>", {class: "letrasContainer"});
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>A</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>B</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>C</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>D</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>E</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>F</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>G</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>H</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>I</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>J</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>K</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>L</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>M</p>"));
            $container.append($letrasContainer);

            $letrasContainer = $("<div>", {class: "letrasContainer"});
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>N</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>O</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>P</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>Q</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>R</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>S</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>T</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>U</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>V</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>W</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>X</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>Y</p>"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("<p>Z</p>"));
            $container.append($letrasContainer);

            $letrasContainer = $("<div>", {class: "letrasContainer"});

            $container.append($letrasContainer);

            var $intentosContainer = $("<div>", {class: "intentosAhorcado"}).html("<span>oportunidades restantes:</span>" + foo.oportunidades);
            $container.append($intentosContainer);

            $(".letrasContainer div.letra").click(function () {
                var block = $(this).prop("blocked");
                
                if(block!==null && block){
                    return;
                }
                
                if ($(this).hasClass("correct") || $(this).hasClass("incorrect")) {
                    return;
                }
                var val = $("p", $(this)).html().toLowerCase();
                var cont = 0, cont2 = 0;

                var $curTab = $("#tab_palabra_" + foo.current_word);
                $(".wordContainer input", $curTab).each(function () {
                    if ($(this).prop("letra").toLowerCase() === val) {
                        $(this).val(val.toUpperCase());
                        cont++;
                    }

                    if ($(this).val().trim().length > 0) {
                        cont2++;
                    }
                });

                if (cont === 0) {
                    $(this).addClass("incorrect");
                    foo.oportunidades--;
                    var newimg = getCurrentImage(config.imagenes, foo.oportunidades);
                    if (newimg.length > 0) {
                        $("img", $("div.fondoAhorcado")).attr("src", newimg);
                    }
                    if (foo.oportunidades >= 0) {
                        $("div.intentosAhorcado", $container).html("<span>oportunidades restantes:</span>  " + foo.oportunidades);
                        if (foo.oportunidades === 0) {
                            foo.vidas--;

                            var objEvt = {
                                type: "Retroalimentacion_Ahorcado",
                                container: $container,
                                correct: false,
                                intentos_restantes: foo.vidas
                            };
                            $(document).trigger(objEvt);

                            if (foo.vidas > 0) {
                                $(".wordContainer input", $curTab).val("");
                                $(".letrasContainer div.letra").removeClass("correct");
                                $(".letrasContainer div.letra").removeClass("incorrect");
                                foo.oportunidades = config.oportunidades_palabra;
                                $("div.intentosAhorcado", $container).html("<span>oportunidades restantes:</span> " + foo.oportunidades);
                                var newimg = getCurrentImage(config.imagenes, foo.oportunidades);
                                if (newimg.length > 0) {
                                    $("img", $("div.fondoAhorcado")).attr("src", newimg);
                                }
                            } else {
                                $("#tab_palabra_" + (foo.current_word)).fadeOut(500);
                                
                                $("div.letrasContainer .letra", $container).each(function(){
                                   $(this).prop("blocked", true); 
                                });
                            }
                        }
                    }
                }
                else {
                    $(this).addClass("correct");
                    if (cont2 === $(".wordContainer input", $curTab).length) {
                        foo.current_word++;
                        if (foo.current_word < foo.palabras.length) {
                            $("#tab_palabra_" + (foo.current_word - 1)).fadeOut(500, function () {
                                $("#tab_palabra_" + (foo.current_word)).fadeIn(500);
                                $(".letrasContainer .letra", $container).removeClass("incorrect");
                                $(".letrasContainer .letra", $container).removeClass("correct");
                                foo.oportunidades = config.oportunidades_palabra;
                                $("div.intentosAhorcado", $container).html("<span>oportunidades restantes:</span> " + foo.oportunidades);
                                var newimg = getCurrentImage(config.imagenes, foo.oportunidades);
                                if (newimg.length > 0) {
                                    $("img", $("div.fondoAhorcado")).attr("src", newimg);
                                }
                            });
                        } else {
                            var objEvt = {
                                type: "Retroalimentacion_Ahorcado",
                                container: $container,
                                correct: true
                            };
                            $(document).trigger(objEvt);
                        }
                    }
                }
            });
            
            $("#tab_palabra_0").fadeIn(500);
            if(!config.hasOwnProperty("reinicio")){
                var objEvt = {
                    type: "Inicio_Ahorcado"
                };
                $(document).trigger(objEvt);
            }
        },
        reiniciar_ahorcado: function(){
            var config = $(this).prop("config");
            
            $("div.letrasContainer .letra", $(this)).each(function(){
               $(this).removeClass("correct");
               $(this).removeClass("incorrect");
            });
            
            if(config!==null && typeof config === "object"){
                $(this).empty();
                config.reinicio = true;
                $(this).ahorcado(config);
            }
        }
    });

})(jQuery);

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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

function getCurrentImage(imagenes, intentos) {
    var url = "";

    $.each(imagenes, function (key, value) {
        if (value.intentos_restantes === intentos) {
            url = value.url;
        }
    });

    return url;
}