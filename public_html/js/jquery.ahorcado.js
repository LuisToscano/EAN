/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
    $.fn.extend({
        ahorcado: function (config) {
            var $container = $(this);
            var shuffled = shuffle(config.palabras);
            $container.prop("info", {palabras: [], palabras_restantes: [], current_word: 0});
            var foo = $container.prop("info");
            foo.palabras = shuffled.slice(0, config.cantidad_palabras);
            foo.palabras_restantes = shuffled.slice(config.cantidad_palabras, shuffled.length);

            var cont = 0;
            $.each(foo.palabras, function (key, value) {
                var $word_tab = $("<div>", {id: "tab_palabra_" + cont});
                var $wordContainer = $("<div>", {class: "wordContainer"});
                for(var i=0; i<=value.length; i++){
                  var $input = $("<input>", {type: "text"});
                  $input.attr("size", 1);
                  $input.attr("maxlength", 1);
                  $input.attr("readonly", true);
                  $input.prop("letra", value.charAt(i));
                  $wordContainer.append($input);
                }
                $word_tab.append($wordContainer);
                $container.append($word_tab);
            });
            
            var $letrasContainer = $("<div>",{class:"letrasContainer"});
            $letrasContainer.append($("<div>", {class: "letra"}).html("A"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("B"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("C"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("D"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("E"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("F"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("G"));
            $container.append($letrasContainer);
            
            $letrasContainer = $("<div>",{class:"letrasContainer"});
            $letrasContainer.append($("<div>", {class: "letra"}).html("H"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("I"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("J"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("K"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("L"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("M"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("N"));
            $container.append($letrasContainer);
            
            $letrasContainer = $("<div>",{class:"letrasContainer"});
            $letrasContainer.append($("<div>", {class: "letra"}).html("O"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("P"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("Q"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("R"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("S"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("T"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("U"));
            $container.append($letrasContainer);
            
            $letrasContainer = $("<div>",{class:"letrasContainer"});
            $letrasContainer.append($("<div>", {class: "letra"}).html("V"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("W"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("X"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("Y"));
            $letrasContainer.append($("<div>", {class: "letra"}).html("Z"));
            $container.append($letrasContainer);
            
            $(".letrasContainer div.letra").click(function(){
                if($(this).hasClass("selected")){
                    return;
                }
                var val = $(this).html().toLowerCase();
                var cont = 0;
                $(".wordContainer input").each(function(){
                    if($(this).prop("letra").toLowerCase() === val){
                        $(this).val(val.toUpperCase());
                        cont++;
                    }
                });
                $(this).addClass("selected");
            });
            
            $("#tab_palabra_0").show();
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