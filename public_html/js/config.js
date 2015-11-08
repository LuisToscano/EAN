/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$("document").ready(function () { 
    $("#prueba").generarPreguntas({
        cantidad_preguntas: 4,
        preguntas: [
            {
                tipo: "pick_many",
                pregunta: "Ejemplo de única respuesta",
                tipo_elementos: "texto",
                picks: {
                    1: {
                        tag: "Incorrecto"
                    },
                    2: {
                        tag: "Incorrecto"
                    },
                    3: {
                        tag: "Correcto",
                        correct: true
                    },
                    4: {
                        tag: "Incorrecto"
                    }
                }
            },
            {
                tipo: "pick_many",
                pregunta: "Ejemplo de múltiple respuesta",
                picks: {
                    1: {
                        tag: "Correcto",
                        correct: true
                    },
                    2: {
                        tag: "Incorrecto"
                    },
                    3: {
                        tag: "Correcto",
                        correct: true
                    },
                    4: {
                        tag: "Incorrecto"
                    }
                }
            },
            {
                tipo: "sortable",
                pregunta: "Ordene la lista",
                elementos: {
                    1: {
                        tag: "Tercer elemento"
                    },
                    2: {
                        tag: "Cuarto elemento"
                    },
                    3: {
                        tag: "Primer elemento"
                    },
                    4: {
                        tag: "Segundo elemento"
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
                tipo_columna_1: "texto",
                tipo_columna_2: "texto",
                columna_1: {
                    1: {
                        contenido: "Texto 1"
                    },
                    2: {
                        contenido: "Texto 2"
                    },
                    3: {
                        contenido: "Texto 3"
                    },
                    4: {
                        contenido: "Texto 4"
                    }
                },
                columna_2: {
                    1: {
                        contenido: "Relaciona con Texto 2",
                        respuesta: 2
                    },
                    2: {
                        contenido: "Relaciona con Texto 3",
                        respuesta: 3
                    },
                    3: {
                        contenido: "Relaciona con Texto 1",
                        respuesta: 1
                    },
                    4: {
                        contenido: "Relaciona con Texto 4",
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
    
    
});


