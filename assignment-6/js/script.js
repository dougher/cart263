"use strict";

let verb = "is";
let article = "a";
let vowels = "aeiouy";

let dictionary;

let description;

let $reload;

$(document).ready(function (){
  $.getJSON('data/file.json', dataLoaded);
});

function dataLoaded(data){
  //console.log(data);
  dictionary = data;
  LoadNewText();
}

function LoadNewText(){
  let cat = getRandomElement(dictionary.cats);
  let condiment = getRandomElement(dictionary.condiments);
  let room = getRandomElement(dictionary.rooms);
  let deity = getRandomElement(dictionary.greek[Math.floor(Math.random(dictionary.greek.length))]);

  //console.log(cat + condiment + room + deity);

  if (condiment.charAt(condiment.length-1) === 's'){
    verb = "are";
  }

  for (let i=0; i<vowels.length-1; i++){
    if (vowels.charAt(i) === room.charAt(0))
      article = "an";
  }

  let description = `By ${deity}! ${condiment} ${verb} like ${cat} in ${article} ${room}.`;

  let text = $('<p>' + description + '</p>');

  $('.container').append(text);

  CreateButtons();
}

function CreateButtons(){
  let $reload = $('<div></div>');
  let $reset = $('<div></div>');

  $reload.text("Reload").button();
  $reset.text("Reset").button();

  $reload.on('click', function(){
    description = "";
    LoadNewText();
    $reset.remove();
    this.remove();
  });

  $reset.on('click', function(){
   $('.container').empty();

    $reload.remove();
    this.remove();

    CreateButtons();
  });

  $('.container').append($reload);
  $('.container').append($reset);

}

function getRandomElement(currentArray){
  return currentArray[Math.floor(Math.random() * currentArray.length)];
}
