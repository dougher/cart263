"use strict";

if (annyang){
  let commands = {
    'I give up': reset,
    'Say it again': repeat,
    '(Can you) repeat (please)': repeat,
    'I didn\'t get that': repeat,
    '(I think the answer is) *myGuess': verifyOralGuess
  };

  annyang.addCommands(commands);

  annyang.start();
}

function reset(){
  $('.guess').remove();
  newRound();
}

function repeat(){
  responsiveVoice.speak(invertAnimalName(correctAnimal));
}

function verifyOralGuess(myGuess){
  for (let i = 0; i < answers.length; i++){
    if (answers[i] === myGuess){
      reset();
    }
  }
}
