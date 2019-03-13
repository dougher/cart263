// This document contains all the main elements of the program. It has the document ready,
// all the functions handling the progression (intro, outro, verification, etc.)
// and the jquery stuff (buttons mostly).

"use strict";

let loadGif = "assets/images/loading.gif";
let subway = "assets/images/subway.png";
let subwayGlitch = "assets/images/subway-glitch.gif";

let glitchSound = [
  new Audio("assets/sounds/glitch-1.mp3"),
  new Audio("assets/sounds/glitch-2.mp3"),
  new Audio("assets/sounds/glitch-3.mp3"),
  new Audio("assets/sounds/glitch-4.mp3"),
  new Audio("assets/sounds/glitch-5.mp3"),
  new Audio("assets/sounds/glitch-6.mp3"),
  new Audio("assets/sounds/glitch-7.mp3"),
];
let currentPitch = 1.0;

let round = 1;
let currentElement = "";
let checkout = false;
let skipVisible = false;

$(document).ready(function(){
  $('#currentImg').attr('src', loadGif);

  $.getJSON('data/foods.json', function(data){
    console.log(data);

    ORIGINAL_WRAPPER_SIZE = data.content[0].length;
    ORIGINAL_MAIN_SIZE = data.content[1].length + data.content[2].length;
    ORIGINAL_STUFFING_SIZE = data.content[3].length + data.content[4].length + data.content[5].length;

    foods = data;

    $.getJSON('data/bizarro.json', function(data2){
      bizarro = data2;
      console.log(bizarro);
    });

    $('#text').on('click', function(){
      intro();
      $(this).val("");
      $('#currentImg').attr('src', subway).hide().fadeIn(1000);
      this.remove();
    });

  });
});

// Because responsiveVoice (seems to) only accept event handlers as a variable,
// a variable is created for every time we need the responsiveVoice needs to wait to finish
// talking before doing an given action.

//The intro introduces Bob and creates a skip button to allow to move forward.
function intro(){
  if (round < 4) {
    let $button = $('<div class="skip"></div>');
    $button.text("Skip").button();
    $button.on('click', function(){
      // If the button is pressed, we stop the voice and go straight to calling the start.
      if (responsiveVoice.isPlaying()){
        responsiveVoice.cancel();
        $button.remove();
        start();
      }
    });

    $('#container').append($button);
  }

  if (round > 3){
      currentPitch = currentPitch - 0.2;
  }

  setCurrentStage();
  responsiveVoice.speak("Welcome to Subway. We have now moved on to a fully automated system. You can call me Bob. I will be taking your order. For each category, say out loud what you want to add to it. Once you are finished with a category, say done or skip.", "UK English Female", {pitch:currentPitch, onend: start});
  //Only once the responsive voice is done
}

//Very simple function for the responsiveVoice's parameter event handler to "start" the interaction.
function start(){
  let $skip = $('.skip');

  if ($skip != undefined)
    $skip.remove();

  setNextCategory();
}

//Like the intro, we say a last thing and wait for responsiveVoice to be done before calling the "real" ending.
function outro(){
  responsiveVoice.speak("Congratulations! You have completed your submarine sandwich. Please wait while the transaction page loads. A moment please...", "UK English Female", {pitch: currentPitch, onend: end});

  if ($('#tempLoad').length === 0){
    let $loadimg = $('<img id="tempLoad"/>');
    $loadimg.attr('src', loadGif);
    $('#container').append($loadimg);
  }
}

function end(){
  // The game prepares to restart and waits 5 seconds before calling the function.
  setTimeout(function(){
    restart();
    prepareToLoop();
  }, 3000);
}

// We enumerate the player's choice and make sure they are satisfied with it. If not, we
// restart from scratch :D
function verification(){
  let mainList = "";
  let stuffingList = "";

  for (let i=0;i<sandwich.main.length;i++){
    if (i === sandwich.main.length - 1 && sandwich.main.length > 1){ // If we are more than one thing, we add an and before the last element.
      mainList = mainList + " and " + sandwich.main[i];
    } else if (i === sandwich.main.length - 1){ // Else if we only have one thing, don't add an and to the only element.
      mainList = sandwich.main[i];
    } else { // Else, we have more than one element but aren't at the end of the list yet, so we add the element and a comma.
      mainList = mainList + sandwich.main[i] + ", ";
    }

  }

  for (let i=0;i<sandwich.stuffing.length;i++){
    if (i === sandwich.stuffing.length - 1 && sandwich.stuffing.length > 1){
      stuffingList = stuffingList + " and " + sandwich.stuffing[i];
    } else {
      stuffingList = stuffingList + sandwich.stuffing[i] + ", ";
    }

  }

  let order = "Here is your order: Your bread is " + sandwich.wrapper + ". "
  + "Your main part is composed of  " + mainList + ". "
  + "Your stuffing is composed of " + stuffingList  + ". "
  + "Is this correct?";

  responsiveVoice.speak(order, "UK English Female", {pitch: currentPitch, onend: createYesNoButtons});

}

// On restart, we set all main variables to our their default value,
function restart(){
  currentElement = " ";
  checkout = false;

  sandwich.wrapper = "";
  sandwich.main = [];
  sandwich.stuffing = [];
}

// Originally part of the restart function, this part got put into its own thing
// To allow for restart to be called without looping and changing round.
function prepareToLoop(){
  // We set the logo to the glitched version, which indicates an internal failure.
  $('#currentImg').attr("src", subwayGlitch);
  //We set the current glith sound by making sure its always between 0 and 6, aka our number of sounds.
  glitchSound[(round-1)%7].loop = false;
  glitchSound[(round-1)%7].play();
  // Remove the tempLoad we added when the order is done.
  if ($('#tempLoad') != undefined){
    $('#tempLoad').remove();
  }

  // Wait three seconds before restart from scratch and perpetuating the system "bug".
  setTimeout(function(){
    $('#currentImg').attr("src", subway);
    changeRound();
    intro();
  }, 3000);
}

//Creates a skip button once a first choice has been made for the category with multiple options.
function createSkipButton(){
  let $current = $('<div class="skip"></div>');
  $current.text("Skip").button();

  $current.on('click', function(){
    if (currentElement === "stuffing")
      currentElement = "none";

      setNextCategory();
  });
  $('#container').append('<br/>').append('<br/>').append($current);
}

//We create the button for the current element of each category.
function createCurrentButtons(currentArray){
  console.log("current element: " + currentElement);
  deleteButtons(false); // We first delete the buttons that are already there. The false
  // boolean ensures we take care of choice-related buttons.

  for (let i=0; i<currentArray.length;i++){
    let $current = $('<div class="choice"></div>');
    $current.text(currentArray[i]).button();
    $current.on('click', function(){

      if (currentElement === "none"){
        setNextCategory();
      }else if (currentElement === "main" || currentElement === "stuffing"){
        addToCategory(currentArray, currentArray[i]);
        $current.prop("disabled", true);
      } else {
        sandwich.wrapper = currentArray[i];

        setNextCategory();
      }

    });

    $('#container').append($current);
  }
}

// Buttons for the verification part of the order.
function createYesNoButtons(){
  let $yes = $('<div class="checkout"></div>');
  let $no = $('<div class="checkout"></div>');

  $yes.text("Yes").button();
  $no.text("No").button();

  $yes.on('click', function(){
    outro();
    $no.remove();
    $yes.remove();
  });
  $no.on('click', function(){
    restartFromScratch();
    $yes.remove();
    $no.remove();
  });
  $('#container').append($yes).append($no);
}

function deleteYesNoButtons(){
  let $toDelete = $('.checkout');
  if ($toDelete != undefined){
    for (let i=0; i<$toDelete.length; i++){
      $toDelete.remove();
    }
  }
}

// Delete buttons. The boolean receive lets us know if we are focusing on the skip buttons
// or the element buttons.
function deleteButtons(skip){
  if (skip){
    let $toDelete = $('.skip');

    if ($toDelete != undefined){
      for (let i=0;i<$toDelete.length;i++){
        $toDelete[i].remove();
      }
    }
  } else {
    let $toDelete = $('.choice');

    if ($toDelete != undefined){
      for (let i=0;i<$toDelete.length;i++){
        $toDelete[i].remove();
      }
    }
  }

  // Make sure we delete all those extra br that are created.
  let $brToDelete = $('br');
  //console.log($brToDelete.length);
  for (let i=0;i<$brToDelete.length;i++){
    $brToDelete[i].remove();
  }

  $("#container").append('<br/>');
}

// This function is called everytime the loop is restarted. We increment the current changeRound
// And set the current round elements to add for this loop.
function changeRound(){
  round++;
  console.log(round + " : " + currentPitch);
  switch(round){
    case 1:
      console.log ("Change round shouldn't be called as we are still at round one despite this function being called only in restart");
      break;
    case 2:
      CURRENT_ROUND_BREAD = 2;
      CURRENT_ROUND_MEAT = 3;
      CURRENT_ROUND_CHEESE = 3;
      CURRENT_ROUND_VEGETABLE = 2;
      CURRENT_ROUND_LEAF = 2;
      CURRENT_ROUND_ROOT = 0;
      break;
    case 3:
      CURRENT_ROUND_BREAD = 3;
      CURRENT_ROUND_MEAT = 4;
      CURRENT_ROUND_CHEESE = 3;
      CURRENT_ROUND_VEGETABLE = 2;
      CURRENT_ROUND_LEAF = 4;
      CURRENT_ROUND_ROOT = 4;
      break;
    case 4:
      CURRENT_ROUND_BREAD = 0;
      CURRENT_ROUND_MEAT = 0;
      CURRENT_ROUND_CHEESE = 0;
      CURRENT_ROUND_VEGETABLE = 0;
      CURRENT_ROUND_LEAF = 0;
      CURRENT_ROUND_ROOT = 0;

      CURRENT_ROUND_ROOT = 3;
      CURRENT_ROUND_BIZARROWRAPPER = 2;
      CURRENT_ROUND_BIZARROMEAT = 3;
      CURRENT_ROUND_BIZARROFOOD = 2;
      break;
    case 5:
      CURRENT_ROUND_ROOT = 2;
      CURRENT_ROUND_BIZARROWRAPPER = 2;
      CURRENT_ROUND_BIZARROMEAT = 3;
      CURRENT_ROUND_BIZARROFOOD = 4;
      break;
    case 6:
      CURRENT_ROUND_ROOT = 0;
      CURRENT_ROUND_BIZARROWRAPPER = 2;
      CURRENT_ROUND_BIZARROMEAT = 2;
      CURRENT_ROUND_BIZARROFOOD = 3;
      break;
    case 7:
      CURRENT_ROUND_BIZARROWRAPPER = 2;
      CURRENT_ROUND_BIZARROMEAT = 4;
      CURRENT_ROUND_BIZARROFOOD = 2;
      break;
    case 8:
      CURRENT_ROUND_BIZARROWRAPPER = 0;
      CURRENT_ROUND_BIZARROMEAT = 0;
      CURRENT_ROUND_BIZARROFOOD = 0;
      break;
    case 9:
      RemoveRandomOriginal();
      break;
    case 10:
      RemoveRandomOriginal();
    break;
      case 9:
      RemoveRandomOriginal();
      break;
    default:

    break;
  }
}
