"use strict";

const NUM_OPTIONS = 4;

let animal = [
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];
let correctAnimal = "";
let answers = [];
let randomized = false;


$(document).ready(function(){
  $('#click-to-begin').on('click', function(){
    startGame();
    this.remove();
  });
});

function startGame(){
  newRound();
}

function newRound(){
  answers = [];

  for (let i = 0; i < NUM_OPTIONS; i++){
    let answer;

    //Make sure that names come out only once per new round.
    do {
      answer = animal[Math.floor(Math.random() * animal.length)];
    } while (checkForDuplicate(answer))

    addButton(answer);

    answers.push(answer);
  }

  correctAnimal = answers[Math.floor(Math.random() * NUM_OPTIONS)];


  responsiveVoice.speak(invertAnimalName(correctAnimal));
}

function addButton(label){
    let $current = $('<div class="guess"></div>');
    $current.text(label);
    //$current.attr({type: 'button'});
    $current.button();
    //console.log($current);

    $current.on('click', function() {
      if ($current.text() == correctAnimal){
        console.log("Correct");
        $('.guess').remove();
        newRound();
      } else {
        console.log("Wrong");
        $(this).effect("shake", {direction:'up'});
      }
    });

    $('#container').append($current);
}

function checkForDuplicate(answer){
  for (let j=0; j<answers.length;j++){
    if (answers[j] === answer){
      return true;
    }
  }

  return false;
}

function invertAnimalName(str){
  let splitString = str.split("");
  let invertArray = splitString.reverse();
  let invertedString = invertArray.join("");

  return invertedString;
}
