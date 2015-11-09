/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
    
     /* $("#prueba").dragAndDrop({
        tipologia: "sencillo",
        pregunta: "Arrastre cada elemento sobre el elemento correcto",
        tipo_drags: "audio",
        tipo_drops: "texto", 
        intentos: 2,
        drags: {
            "1": {
                contenido: "media/dog.mp3"
            },
            "2": {
                contenido: "media/organo.mp3"
            }
        },
        drops: {
            "1": {
                contenido: "Órgano",
                accepted: ["2"]
            },
            "2": {
                contenido: "Perro",
                accepted: ["1"]
            }
        }
    });

    $("#prueba2").dragAndDrop({
        tipologia: "categoria",
        pregunta: "Arrastre los elementos sobre la categoría correcta",
        tipo_drags: "audio",
        tipo_drops: "imagen",
        intentos: 2,
        drags: {
            1: {
                contenido: "media/dog.mp3"
            },
            2: {
                contenido: "media/organo.mp3"
            }
            ,
            3: {
                contenido: "media/organo.mp3"
            }
        },
        drops: {
            "1": {
                contenido: "img/boy.jpg",
                accepted: ["3", "2"]
            },
            "2": {
                contenido: "img/girl.jpg",
                accepted: ["1"]
            }
        }
    });
});

$(document).on("Retroalimentacion_DragAndDrop", function(evt){
    if(evt.correct){
        //retroalimentación correcto
        alert("respuesta correcta");
    }else{
        console.log(evt.intentos_restantes);
        if(evt.intentos_restantes > 0){
            //retroalimentación volver a intentarlo (aun quedan intentos)
            alert("Tiene "+evt.intentos_restantes+ " intentos restantes.");
        }
        else{
           //retroalimentación incorrecto 
            alert("respuesta incorrecta");
        }
    }
});*/
    
    $(document).on("Retroalimentacion_Puntaje", function(evt){
        alert((evt.puntaje_obtenido/evt.total)*100+"%");
    });
    
    
});


