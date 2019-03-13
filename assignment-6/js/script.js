"use strict";

let verb = "is";

$(document).ready(function (){
  $.getJSON('data/file.json', dataLoaded);
});

function dataLoaded(data){
  console.log(data);

  let cat = getRandomElement(data.cats);
  let condiment = getRandomElement(data.condiments);
  let room = getRandomElement(data.rooms);

  console.log(cat);

  if (condiment.charAt(condiment.length-1) === 's'){
    verb = "are";
  }

  let description = `${condiment} ${verb} like ${cat} in a ${room}.`;

  let text = $('<p>' + description + '</p>');

  $('body').append(text);
}

function getRandomElement(currentArray){
  return currentArray[Math.floor(Math.random() * currentArray.length)];
}
