//This file contains all the handling for the microphone as well as some of the handling
//for the responsiveVoice that don't focus on other elements -- meaning responsiveVoice
//is present elsewhere if its placed in mainloop- or array-heavy functions.

"use strict";

if (annyang){
  let commands = {
    'done': checkIfSkippable,
    'skip': checkIfSkippable,
    'yes': checkIfCheckoutYes,
    'no': checkIfCheckoutNo,
    '(please) repeat': repeat,
    '*choice': checkChoice,
    'Bob': respond
  };

  annyang.addCommands(commands);

  annyang.start();
}

function checkChoice(choice){
  switch (currentElement){
    case "wrapper":
      for (let i=0; i<wrapper.length;i++){
        if (choice === wrapper[i]){
          sandwich.wrapper = choice;
        }
      }

      if (sandwich.wrapper === ""){
        sandwich.wrapper = wrapper[Math.floor(Math.random() * wrapper.length)];
      }

      setNextCategory();
      break;
    case "main":
      addToCategory(main, choice);
      break;
    case "stuffing":
      addToCategory(stuffing, choice);
      break;
  }
}

function checkIfSkippable(){
  //console.log("In check if skippable");
  if (currentElement === "bread"){
    responsiveVoice.speak("You cannot skip this part. You must make a choice.", "UK English Female", {pitch: currentPitch});
  } else {
    setNextCategory();
  }
}

function checkIfCheckoutYes(){
  if (checkout){
    deleteYesNoButtons();
    outro();
  } else if (currentElement === "main" || currentElement === "stuffing"){
    responsiveVoice.speak("I am listening.");
  } else {
    responsiveVoice.speak("This isn't a yes or no question.", "UK English Female", {pitch: currentPitch, onend: repeat});
  }
}

function checkIfCheckoutNo(){
  if (checkout){
    deleteYesNoButtons();
    restartFromScratch();
  } else if (currentElement === "main" || currentElement === "stuffing"){
    if (currentElement === "stuffing")
      currentElement = "none";

    setNextCategory();
  }  else {
    responsiveVoice.speak("This isn't a yes or no question.", "UK English Female", {pitch: currentPitch, onend: repeat});
  }
}

function invalid(){
  responsiveVoice.speak("Your choice could not be understood. Please try again.", "UK English Female", {pitch: currentPitch});
}

function respond(){
  responsiveVoice.speak("That is my name. What else should I add to your current selection?", "UK English Female", {pitch: currentPitch});
}

function repeat(){
  switch (currentElement){
    case "wrapper":
      responsiveVoice.speak("What type of bread do you want?", "UK English Female", {pitch: currentPitch});
      break;
    case "main":

      responsiveVoice.speak("What type of meat, substitute, or cheese do you want?", "UK English Female", {pitch: currentPitch});
      break;
    case "stuffing":
      responsiveVoice.speak("What stuffing do you want to add?", "UK English Female", {pitch: currentPitch});
      break;
    default:

      break;
  }
}

function anythingElse(){
  responsiveVoice.speak("Is there anything else?", "UK English Female", {pitch: currentPitch});
}

function restartFromScratch(){
  responsiveVoice.speak("I am sorry about this. Let me restart from scratch.", "UK English Female", {pitch: currentPitch, onend: restart});
  restart();
}
