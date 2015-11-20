
$("document").ready(function () {
    $("#prueba").dragAndDrop({
        tipologia: "categoria", //categoria o sencillo
        pregunta: "Arrastre cada elemento sobre la categoría correcta", //enunciado para visualizarse previo a la actividad
        tipo_drags: "texto", //imagen, audio o texto
        tipo_drops: "texto", //imagen, audio o texto
        intentos: 2,
        drags: {
            1: {
                contenido: "elemento 1" //si tipo_drags es audio o imagen, debe agregarse la url del archivo. ej: img/boy.jpg - media/perro.mp3
            },
            2: {
                contenido: "elemento 2"
            },
            3: {
                contenido: "elemento 3"
            },
            4: {
                contenido: "elemento 4"
            },
            5: {
                contenido: "elemento 5"
            },
            6: {
                contenido: "elemento 6"
            }
        },
        drops: {
            1: {
                contenido: "Amarillos", //si tipo_drops es audio o imagen, debe agregarse la url del archivo. ej: img/boy.jpg - media/perro.mp3
                accepted: [1, 3] //identificadores (separados por coma) de los drags que deben ir en este drop.
            },
            2: {
                contenido: "Verdes",
                accepted: [2]
            },
            3: {
                contenido: "Rojos",
                accepted: [4, 5]
            }
        }
    });
});

$(document).on("Inicio_DragAndDrop", function (evt) {

    //evento que se dispara al terminar de cargar la actividad.

    //mostrar instrucciones
    $(".blackout>div").hide();
    $(".blackout .instruccion").fadeIn(500);
    $(".blackout").css('display', 'flex').hide().fadeIn(500);

    $(".blackout .instruccion .iconContainer").click(function () {
        $(".blackout").fadeOut(500);
    });

});

$(document).on("Retroalimentacion_DragAndDrop", function (evt) {

    //evento que se dispara cuando el usuario da clic al botón de validar respuesta

    if (evt.correct) {

        //cuando la respuesta es correcta

        //mostrar realimentación correcto
        $(".blackout>div").hide();
        $(".blackout .retroalimentacion.correcto").fadeIn(500);
        $(".blackout").fadeIn(500);

        $(".blackout .retroalimentacion.correcto button").click(function () {
            evt.container.reiniciar_dragDrop();
            $(".blackout").fadeOut(500);
        });
    } else {
        if (evt.intentos_restantes > 0) {

            //cuando la respuesta es incorrecta pero aun quedan intentos

            //mostrar retroalimentación volver a intentarlo
            $(".blackout>div").hide();
            $(".blackout .retroalimentacion.otro_intento").show();
            $(".blackout").fadeIn(500);
            $(".blackout .retroalimentacion.otro_intento button").click(function () {
                $(".blackout").fadeOut(500);
            });
        }
        else {
            //cuando la respuesta es incorrecta y ya no hay mas intentos

            //mostrar retroalimentación incorrecto
            $(".blackout>div").hide();
            $(".blackout .retroalimentacion.incorrecto").fadeIn(500);
            $(".blackout").fadeIn(500);
            $(".blackout .retroalimentacion.incorrecto button").click(function () {
                evt.container.reiniciar_dragDrop();
                $(".blackout").fadeOut(500);
            });
        }
    }
});

/*

$("document").ready(function () {
    $("#prueba").generarPreguntas({
        cantidad_preguntas: 5, //número de preguntas que saldrán en la actividad (se escogen al azar entre las descritas en "preguntas"
        preguntas: [//banco de preguntas separadas por coma
            {
                tipo: "pick_many", //pick_many, sortable, completar o relacionar
                pregunta: "Ejemplo de única respuesta", //enunciado a mostrarse antes de la actividad
                tipo_elementos: "texto", //texto, imagen o audio
                respuesta: [3], //cual(es) de los contenidos descritos en "picks" es(son) la respuesta correcta.
                //si tiene varios elementos separados por coma se tomará como pregunta de selección múltiple con múltiple respuesta.
                picks: {
                    1: {
                        contenido: "Incorrecto" //si tipo_elementos es audio o imagen, debe agregarse la url del archivo. ej: img/boy.jpg - media/perro.mp3
                    },
                    2: {
                        contenido: "Incorrecto"
                    },
                    3: {
                        contenido: "Correcto"
                    },
                    4: {
                        contenido: "Incorrecto"
                    }
                }
            }
            ,
            {
                tipo: "pick_many",
                pregunta: "Ejemplo de múltiple respuesta",
                tipo_elementos: "texto",
                respuesta: [1, 3],
                picks: {
                    1: {
                        contenido: "Correcto"
                    },
                    2: {
                        contenido: "Incorrecto"
                    },
                    3: {
                        contenido: "Correcto"
                    },
                    4: {
                        contenido: "Incorrecto"
                    }
                }
            },
            {
                tipo: "sortable",
                pregunta: "Ordene la lista",
                tipo_elementos: "texto",
                elementos: {
                    1: {
                        contenido: "elemento 3"
                    },
                    2: {
                        contenido: "elemento 4"
                    },
                    3: {
                        contenido: "elemento 1"
                    },
                    4: {
                        contenido: "elemento 2"
                    }
                },
                orden: [3, 4, 1, 2] //escribir el orden correcto de los elementos descritos en el atributo previo "elementos"
            }
            ,
            {
                tipo: "completar",
                pregunta: "Complete los espacios en blanco con la palabra test",
                //dentro de cada párrafo escribir la etiqueta <espacio> donde se desee que aparezca una caja de texto.
                parrafos: {
                    1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. <espacio> Eligendi autem ipsum quasi, maxime non laudantium ullam debitis repellat quae. Quis optio nesciunt distinctio cumque doloremque sit incidunt similique ex aspernatur. Saepe incidunt enim vitae sapiente quis adipisci inventore quaerat doloremque officiis, repudiandae nulla natus iste, sed, perferendis ratione harum ipsum alias eius iusto hic ut ex. Vel ab enim eum.",
                    2: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi autem ipsum quasi, maxime non laudantium ullam debitis repellat quae. Quis optio nesciunt distinctio <espacio> cumque doloremque sit incidunt similique ex aspernatur. Saepe incidunt enim vitae sapiente quis adipisci inventore quaerat doloremque officiis, repudiandae nulla natus iste, sed, perferendis ratione harum ipsum alias eius iusto hic ut ex. Vel ab enim eum."
                },
                ignore_caps: true, //ignorar mayusculas en las respuestas
                //el numero de respuestas debe ser igual al de etiquetas <espacio> distribuidas en los párrafos.
                respuestas: {
                    1: "test",
                    2: "test"
                }
            },
            {
                tipo: "relacionar",
                pregunta: "Relaciona mediante el clic los elementos de ambas columnas",
                tipo_columna_1: "texto",
                tipo_columna_2: "texto",
                columna_1: {
                    1: {
                        contenido: "elemento 1"
                    },
                    2: {
                        contenido: "elemento 2"
                    },
                    3: {
                        contenido: "elemento 3"
                    },
                    4: {
                        contenido: "elemento 4"
                    }
                },
                columna_2: {
                    1: {
                        contenido: "va con el 2",
                        respuesta: 2 //id del elemento de la columna 1 al que corresponde.
                    },
                    2: {
                        contenido: "va con el 3",
                        respuesta: 3
                    },
                    3: {
                        contenido: "va con el 1",
                        respuesta: 1
                    },
                    4: {
                        contenido: "va con el 4",
                        respuesta: 4
                    }
                }
            }
        ]
    });
});

$(document).on("Inicio_Puntaje", function (evt) {

    //evento que se dispara al terminar de cargar la actividad.

    //mostrar instrucciones
    $(".blackout>div").hide();
    $(".blackout .instruccion").fadeIn(500);
    $(".blackout").css('display', 'flex').hide().fadeIn(500);

    $(".blackout .instruccion .iconContainer").click(function () {
        $(".blackout").fadeOut(500);
    });

});

$(document).on("Retroalimentacion_Puntaje", function (evt) {
    //evento que se dispara cuando el usuario responde todas las preguntas

    //agrega el puntaje obtenido a la etiqueta h2 con clase resultado
    $(".blackout .retroalimentacion.puntaje .resultado").html(evt.puntaje_obtenido + "/" + evt.total);

    //selecciona el mensaje correcto según la cantidad de respuestas correctas
    var mensaje = "";
    if (evt.puntaje_obtenido <= 6) {
        mensaje = "<p>Mensaje para menos de 6 preguntas correctas</p>";
    } else {
        if (evt.puntaje_obtenido <= 9) {
            mensaje = "<p>Mensaje para entre 7 y 9 preguntas correctas</p>";
        } else {
            if (evt.puntaje_obtenido === 10) {
                mensaje = "<p>Mensaje para entre 10 preguntas correctas</p>";
            }
        }
    }

    //agregar mensaje al elemento de clase .mensaje
    $(".blackout .retroalimentacion.puntaje .mensaje").html(mensaje);

    //mostrar retroalimentación
    $(".blackout>div").hide();
    $(".blackout .retroalimentacion.puntaje").fadeIn(500);
    $(".blackout").fadeIn(500);
    $(".blackout .retroalimentacion.puntaje button").click(function () {
        evt.container.reiniciar_preguntas();
        $(".blackout").fadeOut(500);
    });
});

$(document).ready(function () {
    $("#prueba").ahorcado({
        palabras: ["perro limpio", "gato gordo", "casa", "guitarra", "espada"], //banco de palabras o frases
        cantidad_palabras: 3, //cuantas palabras del banco se usarán en la actividad
        oportunidades_palabra: 6, //cantidad de veces que el usuario puede escoger la letra equivocada
        vidas: 2, //cantidad de vidas (una vida se pierde al gastar todas las oportunidades de una palabra) antes de perder el juego
        imagenes: { 
            //imagenes que aparecerán durante el transcurso del juego
            1: {
                url: "img/HangMan-07.svg", //ruta del archivo de imagen
                intentos_restantes: 0 //número de oportunidades restantes en las que se verá esta imagen
            },
            2: {
                url: "img/HangMan-06.svg",
                intentos_restantes: 1
            },
            3: {
                url: "img/HangMan-05.svg",
                intentos_restantes: 2
            },
            4: {
                url: "img/HangMan-04.svg",
                intentos_restantes: 3
            },
            5: {
                url: "img/HangMan-03.svg",
                intentos_restantes: 4
            },
            6: {
                url: "img/HangMan-02.svg",
                intentos_restantes: 5
            },
            7: {
                url: "img/HangMan-01.svg",
                intentos_restantes: 6
            }
        }
    });
});

$(document).on("Inicio_Ahorcado", function (evt) {
    //evento que se dispara al terminar de cargar la actividad.
    $(".blackout>div").hide();
    $(".blackout .instruccion").fadeIn(500);

    $(".blackout").css('display', 'flex').hide().fadeIn(500);

    $(".blackout .instruccion .iconContainer").click(function () {
        $(".blackout").fadeOut(500);
    });
});

$(document).on("Retroalimentacion_Ahorcado", function (evt) {
    
    //evento que se dispara cuando el usuario resuelve correctamente todas las palabras
    
    if (evt.correct) {
        //retroalimentación incorrecto 
        $(".blackout>div").hide();
        $(".blackout .retroalimentacion.correcto").fadeIn(500);
        $(".blackout").fadeIn(500);
        $(".blackout .retroalimentacion.correcto button").click(function () {
            evt.container.reiniciar_ahorcado();
            $(".blackout").fadeOut(500);
        });
    } else {
        //retroalimentación vuelve a intentarlo 
        if (evt.intentos_restantes > 0) {
            $(".blackout>div").hide();
            $(".blackout .retroalimentacion.otro_intento").show();
            $(".blackout").fadeIn(500);
            $(".blackout .retroalimentacion.otro_intento button").click(function () {
                $(".blackout").fadeOut(500);
            });
        }
        else {
            //retroalimentación incorrecto 
            $(".blackout>div").hide();
            $(".blackout .retroalimentacion.incorrecto").fadeIn(500);
            $(".blackout").fadeIn(500);
            $(".blackout .retroalimentacion.incorrecto button").click(function () {
                evt.container.reiniciar_ahorcado();
                $(".blackout").fadeOut(500);
            });
        }
    }
});*/






