/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 $("document").ready(function () { 
 $("#prueba").generarPreguntas({
 cantidad_preguntas: 5,
 preguntas: [
 {
 tipo: "pick_many",
 pregunta: "Ejemplo de única respuesta",
 tipo_elementos: "audio",
 respuesta: [3],
 picks: {
 1: {
 contenido: "media/organo.mp3"
 },
 2: {
 contenido: "media/organo.mp3"
 },
 3: {
 contenido: "media/organo.mp3"
 },
 4: {
 contenido: "media/organo.mp3"
 }
 }
 },
 {
 tipo: "pick_many",
 pregunta: "Ejemplo de múltiple respuesta",
 tipo_elementos: "texto",
 respuesta: [1,3],
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
 tipo_elementos: "audio",
 elementos: {
 1: {
 contenido: "media/organo.mp3"
 },
 2: {
 contenido: "media/organo.mp3"
 },
 3: {
 contenido: "media/organo.mp3"
 },
 4: {
 contenido: "media/organo.mp3"
 }
 },
 orden: [3, 4, 1, 2]
 }
 ,
 {
 tipo: "completar",
 pregunta: "Complete los espacios en blanco",
 parrafo: "Los colores de la bandera de Colombia son <espacio>, <espacio> y <espacio>",
 ignore_caps: true,
 respuestas: {
 1: "amarillo",
 2: "azul",
 3: "rojo"
 }
 },
 {
 tipo: "relacionar",
 pregunta: "Relaciona mediante el clic los elementos de ambas columnas",
 tipo_columna_1: "audio",
 tipo_columna_2: "imagen",
 columna_1: {
 1: {
 contenido: "media/organo.mp3"
 },
 2: {
 contenido: "media/organo.mp3"
 },
 3: {
 contenido: "media/organo.mp3"
 },
 4: {
 contenido: "media/organo.mp3"
 }
 },
 columna_2: {
 1: {
 contenido: "img/boy.jpg",
 respuesta: 2
 },
 2: {
 contenido: "img/boy.jpg",
 respuesta: 3
 },
 3: {
 contenido: "img/boy.jpg",
 respuesta: 1
 },
 4: {
 contenido: "img/boy.jpg",
 respuesta: 4
 }
 }
 }
 ]
 });
 
 */
$("document").ready(function () {
    $("#prueba").dragAndDrop({
        tipologia: "categoria",
        pregunta: "Arrastre cada elemento sobre la categoría correcta",
        tipo_drags: "texto",
        tipo_drops: "texto",
        intentos: 2,
        drags: {
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
                contenido: "Amarillos",
                accepted: [1, 3]
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
    $(".blackout>div").hide();
    $(".blackout .instruccion").fadeIn(500);
    $(".blackout").css('display', 'flex').hide().fadeIn(500);

    $(".blackout").click(function () {
        $(this).fadeOut(500);
    });

    $(".blackout .instruccion .iconContainer").click(function () {
        $(".blackout").fadeOut(500);
    });

    $(".blackout .instruccion").click(function (event) {
        event.stopPropagation();
    });

    $(".blackout .retroalimentacion").click(function (event) {
        event.stopPropagation();
    });

});

$(document).on("Retroalimentacion_DragAndDrop", function (evt) {
    if (evt.correct) {
        $(".blackout>div").hide();
        $(".blackout .retroalimentacion.correcto").fadeIn(500);
        $(".blackout").fadeIn(500);
        
        $(".blackout .retroalimentacion.correcto button").click(function () {
                evt.container.reiniciar_dragDrop();
                $(".blackout").fadeOut(500);
        });
    } else {
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
                evt.container.reiniciar_dragDrop();
                $(".blackout").fadeOut(500);
            });
        }
    }
});


/*
 $(document).ready(function () {
 $("#prueba").ahorcado({
 palabras: ["perro limpio", "gato gordo", "casa", "guitarra", "espada"],
 cantidad_palabras: 3,
 oportunidades_palabra: 6,
 vidas: 2,
 imagenes: {
 1: {
 url: "img/HangMan-07.svg",
 intentos_restantes: 0
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
 $(".blackout>div").hide();
 $(".blackout .instruccion").fadeIn(500);
 
 $(".blackout").css('display', 'flex').hide().fadeIn(500);
 
 $(".blackout").click(function () {
 $(this).fadeOut(500);
 });
 
 $(".blackout .instruccion .iconContainer").click(function () {
 $(".blackout").fadeOut(500);
 });
 
 $(".blackout .instruccion").click(function (event) {
 event.stopPropagation();
 });
 
 $(".blackout .retroalimentacion").click(function (event) {
 event.stopPropagation();
 });
 
 });
 
 $(document).on("Retroalimentacion_Ahorcado", function (evt) {
 if (evt.correct) {
 $(".blackout>div").hide();
 $(".blackout .retroalimentacion.correcto").fadeIn(500);
 $(".blackout").fadeIn(500);
 } else {
 if (evt.intentos_restantes > 0) {
 $(".blackout>div").hide();
 $(".blackout .retroalimentacion.otro_intento").show();
 $(".blackout").fadeIn(500);
 $(".blackout .retroalimentacion.otro_intento button").click(function(){
 $(".blackout").fadeOut(500);
 });
 }
 else {
 //retroalimentación incorrecto 
 $(".blackout>div").hide();
 $(".blackout .retroalimentacion.incorrecto").fadeIn(500);
 $(".blackout").fadeIn(500);
 $(".blackout .retroalimentacion.incorrecto button").click(function(){
 evt.container.reiniciar_ahorcado();
 $(".blackout").fadeOut(500);
 });
 }
 }
 });*/




