/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
    $.fn.extend({
        generarPreguntas: function (config) {
            var $container = $(this);
            $container.prop("config", config);
            $container.prop("info", {preguntas: {}, current_question: 0});
            var foo = $container.prop("info");
            shuffle(config.preguntas);
            if (config.hasOwnProperty("cantidad_preguntas") && config.hasOwnProperty("preguntas")) {
                var preguntas = config.preguntas;
                if (config.cantidad_preguntas < config.preguntas.length) {
                    preguntas = config.preguntas.slice(0, config.cantidad_preguntas);
                }
                var cont = 0;
                $.each(preguntas, function (key, value) {
                    if (!value.hasOwnProperty("puntaje")) {
                        console.error("A una pregunta no se le ha asignado puntaje");
                        value.puntaje = 1;
                    }

                    foo.preguntas[key] = {correct: false, answered: false, puntaje: value.puntaje};
                    var $question_tab = $("<div>", {"id": "tab_pregunta_" + cont});
                    var $span = $("<span>", {"class": "numeracion"});
                    $span.html((cont + 1) + ". ");
                    var $p = $("<p>", {"class": "pregunta"}).html(value.pregunta);
                    $p.prepend($span);
                    $question_tab.append($p);
                    switch (value.tipo) {

                        /**************************PICK MANY************************/

                        case "pick_many":
                        {
                            var contador = 0;

                            if (value.respuesta.length > 1) {
                                foo.preguntas[key].tipo = "many";
                            } else {
                                foo.preguntas[key].tipo = "one";
                            }
                            var $optionContainer = $("<div>", {class: "optionContainer"});
                            $.each(value.picks, function (keys, values) {
                                var $input;
                                if (foo.preguntas[key].tipo === "many") {
                                    $input = $("<input>", {"type": "checkbox", "name": "pregunta_" + key + "_" + keys, "option_number": keys});

                                    if (value.respuesta.indexOf(parseInt(keys)) >= 0)
                                    {
                                        $input.prop("correct", true);
                                    }
                                    else {
                                        $input.prop("correct", false);
                                    }

                                    $input.click(function () {
                                        var correcto = true;
                                        $("input[name^=pregunta_" + key + "]").each(function () {
                                            if (($(this).prop("correct") && !$(this).is(':checked')) || (!$(this).prop("correct") && $(this).is(':checked'))) {
                                                correcto = false;
                                                return false;
                                            }
                                        });
                                        foo.preguntas[key].correct = correcto;
                                        foo.preguntas[key].answered = true;
                                    });
                                } else {
                                    $input = $("<input>", {"type": "radio", "name": "pregunta_" + key, "option_number": keys});

                                    if (value.respuesta.indexOf(parseInt(keys)) >= 0)
                                    {
                                        $input.prop("correct", true);
                                    }
                                    else {
                                        $input.prop("correct", false);
                                    }

                                    $input.click(function () {
                                        foo.preguntas[key].correct = $(this).is(':checked') && $(this).prop("correct");
                                        foo.preguntas[key].answered = true;
                                    });
                                }

                                $p = $("<p>", {"class": "opcion_respuesta"}).html(createElement(value.tipo_elementos, values.contenido, keys));
                                $p.prepend($input);
                                $optionContainer.append($p);
                            });
                            $question_tab.append($optionContainer);
                            break;
                        }

                        /**************************SORTABLE************************/

                        case "sortable":
                        {
                            foo.preguntas[key].answered = true;
                            var $ul = $("<ul>", {class: "listaSortable"});
                            $.each(value.elementos, function (keys, values) {
                                var $li = $("<li>");
                                $li.prop("key", keys);
                                $li.html(createElement(value.tipo_elementos, values.contenido, keys));
                                $ul.append($li);
                            });

                            $ul.sortable({stop: function () {
                                    var curArray = []
                                    $("li", $ul).each(function () {
                                        curArray.push(parseInt($(this).prop("key")));
                                    });
                                    foo.preguntas[key].correct = equalsArrays(curArray, value.orden);
                                }});
                            $question_tab.append($ul);
                            break;
                        }

                        /**************************COMPLETAR************************/

                        case "completar":
                        {
                            $p = $("<p>", {class: "parrafoCompletar"});
                            $.each(value.parrafos, function (keys, values) {
                                var replaceStr = values;
                                while (replaceStr.indexOf("<espacio>") > 0) {
                                    replaceStr = replaceStr.replace("<espacio>", "<input type='text' initialized='false'>");
                                }
                                var $minip = $("<p>", {class: "parrafo"});
                                $minip.append(replaceStr);
                                $p.append($minip);
                            });

                            if (Object.keys(value.respuestas).length !== $("input", $p).length) {
                                console.log("ERROR: La cantidad de espacios en el párrafo y respuestas en la configuración no concuerdan");
                            }

                            $.each(value.respuestas, function (keys, values) {
                                var $next = $("input[initialized='false']", $p).first();
                                $next.attr("size", 15);
                                if ($next.length > 0) {
                                    $next.removeAttr("initialized");
                                    $next.prop("key", keys);
                                }
                            });

                            $("input", $p).change(function () {
                                var correct = true;
                                $("input", $p).each(function () {
                                    var thekey = $(this).prop("key");
                                    if (value.ignore_caps) {
                                        if ($(this).val().trim().toLowerCase() !== value.respuestas[thekey].trim()) {
                                            correct = false;
                                            return false;
                                        }
                                    } else {
                                        if ($(this).val().trim() !== value.respuestas[thekey].trim()) {
                                            correct = false;
                                            return false;
                                        }
                                    }
                                });

                                var answered = true;
                                $(".parrafoCompletar input[type=text]").each(function () {
                                    if ($(this).val().trim().length === 0) {
                                        answered = false;
                                        return false;
                                    }
                                });

                                foo.preguntas[key].correct = correct;
                                foo.preguntas[key].answered = answered;
                            });
                            $question_tab.append($p);
                            break;
                        }

                        /**************************RELACIONAR************************/

                        case "relacionar":
                        {
                            if (Object.keys(value.columna_1).length !== Object.keys(value.columna_2).length) {
                                console.log("El numero de elementos en cada columna no coincide");
                                return false;
                            }

                            var selected = null;

                            var $rContainer = $("<div>", {class: "relacionarContainer"});
                            var $columna_1 = $("<div>", {class: "relacionarColumna1"});
                            $.each(value.columna_1, function (keys, values) {
                                var $div = $("<div>");
                                $div.prop("key", keys);
                                $div.html(createElement(value.tipo_columna_1, values.contenido, keys));

                                $div.click(function () {

                                    if (selected != null) {
                                        selected.css("border", "0px");
                                        selected = null;
                                    }

                                    selected = $(this);
                                    var color = getRandomColor();
                                    $(this).prop("color", color);
                                    $(this).css("border", "3px solid " + color);

                                    var thekey = $(this).prop("key");
                                    $(".relacionarContainer .relacionarColumna2 div").each(function () {
                                        if ($(this).prop("current_col1") == thekey) {
                                            $(this).css("border", "0px");
                                            $(this).prop("current_col1", null);
                                            $(this).prop("correct", false);
                                            foo.preguntas[key].correct = false;
                                            foo.preguntas[key].answered = false;
                                        }
                                    });
                                });

                                $columna_1.append($div);
                            });

                            $rContainer.append($columna_1);
                            var $spacer = $("<div>", {class: "relacionarSpacer"});
                            $rContainer.append($spacer);

                            var $columna_2 = $("<div>", {class: "relacionarColumna2"});
                            $.each(value.columna_2, function (keys, values) {
                                var $div = $("<div>");
                                $div.prop("key", keys);
                                $div.prop("current_col1", null);
                                $div.html(createElement(value.tipo_columna_2, values.contenido, keys));
                                $div.click(function () {
                                    if (selected === null) {
                                        return;
                                    }

                                    var selectedKey = parseInt(selected.prop("key"));
                                    var cor = !isNaN(selectedKey) && (value.columna_2[$(this).prop("key")].respuesta === selectedKey);
                                    $(this).prop("correct", cor);
                                    $(this).css("border", "3px solid " + selected.prop("color"));

                                    if ($(this).prop("current_col1") !== null) {
                                        var cur = $(this).prop("current_col1");
                                        $(".relacionarContainer .relacionarColumna1 div").each(function () {
                                            if ($(this).prop("key") == cur) {
                                                $(this).css("border", "0px");
                                            }
                                        });
                                    }

                                    $(this).prop("current_col1", selectedKey);
                                    var correct = true;
                                    $(".relacionarContainer .relacionarColumna2 div").each(function () {
                                        if (!$(this).prop("correct")) {
                                            correct = false;
                                            return false;
                                        }
                                    });
                                    var answered = true;
                                    $(".relacionarContainer .relacionarColumna2 div").each(function () {
                                        if ($(this).prop("current_col1") === null) {
                                            answered = false;
                                            return false;
                                        }
                                    });

                                    foo.preguntas[key].correct = correct;
                                    foo.preguntas[key].answered = answered;
                                    selected = null;
                                });

                                $columna_2.append($div);
                            });
                            $rContainer.append($columna_2);

                            $question_tab.append($rContainer);
                            break;
                        }
                    }
                    $container.append($question_tab);
                    cont++;
                });
                var $btn = $("<button>", {"class": "btnPreguntas"});
                $btn.click(function () {
                    if (!foo.preguntas[foo.current_question].answered) {
                        alert("Debe responder la pregunta antes de enviar");
                        return;
                    }

                    $(".audiobtn").each(function () {
                        $(this).prop("audio")[0].pause();
                        $(this).prop("audio")[0].currentTime = 0;
                    });

                    foo.current_question++;
                    var $button = $(this);
                    $button.prop("disabled", true)
                    if ($("div[id=tab_pregunta_" + foo.current_question + "]").length > 0) {
                        $("div[id=tab_pregunta_" + (foo.current_question - 1) + "]").fadeOut(500, function () {
                            $("div[id=tab_pregunta_" + foo.current_question + "]").fadeIn(500);
                            $button.prop("disabled", false);
                        });
                    } else {
                        $(this).fadeOut(1000);
                        $("div[id=tab_pregunta_" + (foo.current_question - 1) + "]").fadeOut(1000, function () {
                            var puntaje = 0;
                            var total = 0;
                            $.each(foo.preguntas, function (key, value) {
                                total += value.puntaje;
                                if (value.correct) {
                                    puntaje += value.puntaje;
                                }
                            });

                            var objEvt = {
                                type: "Retroalimentacion_Puntaje",
                                container: $container,
                                puntaje_obtenido: puntaje,
                                total: total
                            };

                            $(document).trigger(objEvt);
                        });
                    }
                });
                $btn.html("Siguiente");
                var $btnContainer = $("<div>", {class: "btnContainer"});
                $btnContainer.append($btn);
                $container.append($btnContainer);
                $("#tab_pregunta_0").css("display", "flex").hide().fadeIn(500);
            }
            else {
                console.log("Error en la configuración");
            }
            if(!config.hasOwnProperty("reinicio")){
                var objEvt = {
                    type: "Inicio_Puntaje",
                    container: $container
                };
                $(document).trigger(objEvt);
            }
        },
        reiniciar_preguntas: function(){
            var config = $(this).prop("config");    
            if(config!==null && typeof config === "object"){
                $(this).empty();
                config.reinicio = true;
                $(this).generarPreguntas(config);
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

function equalsArrays(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createElement(tipo, contenido, key) {
    var $ele_drag;
    switch (tipo) {
        case "texto":
        {
            $ele_drag = $("<span>").html(contenido);
            break;
        }
        case "imagen":
        {
            $ele_drag = $("<img>", {src: contenido});
            break;
        }
        case "audio":
        {
            var $audio = $("<audio>", {src: contenido});
            $ele_drag = $("<div>", {class: "audiobtn"}).html("<i class='fa fa-play'></i>");
            $ele_drag.prop("audio", $audio);
            $ele_drag.prop("key", key);
            $ele_drag.click(function () {
                var theaudio = $(this).prop("audio")[0];
                if (!theaudio.paused && !theaudio.ended && 0 < theaudio.currentTime) {
                    theaudio.pause();
                    theaudio.currentTime = 0;
                } else {
                    $(".audiobtn").each(function () {
                        if ($(this).prop("key") !== key) {
                            $(this).prop("audio")[0].pause();
                            $(this).prop("audio")[0].currentTime = 0;
                        }
                    });
                    $ele_drag.prop("audio")[0].play();
                }
            });

            $audio.on("playing", function () {
                $ele_drag.html("<i class='fa fa-stop'></i>");
            });

            $audio.on("ended", function () {
                $ele_drag.html("<i class='fa fa-play'></i>");
            });

            $audio.on("pause", function () {
                $ele_drag.html("<i class='fa fa-play'></i>");
            });
            break;
        }
    }
    return $ele_drag;
}