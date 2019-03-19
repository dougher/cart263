"use strict";

let frequencies = [220.00, 246.94, 277.18, 293.66, 329.63, 369.99, 415.30];

let pattern = ["xo", "o", "xo", "*", "ox", "ox", "*" , "*x"];
let patternIndex = 0;

let hihat;
let kick;
let snare;

let synth;

let playing = false;

let notePlayer;
let drumsPlayer;

function preload() {

}

function setup() {
  synth = new Pizzicato.Sound({
    source: "wave",
  });
  synth.volume = 0.2;

  hihat = new Pizzicato.Sound("assets/sounds/hihat.wav");
  hihat.volume = 0.5;
  kick = new Pizzicato.Sound("assets/sounds/kick.wav");
  snare = new Pizzicato.Sound("assets/sounds/snare.wav");
}

function draw() {

}

function playMusic(){
  playNote();
  playDrums();
}

function playNote(){
  let frequency = frequencies[floor(random(frequencies.length - 1))];
  synth.frequency = frequency;
  synth.play();
}

function playDrums()  {
  for (let i = 0; i < pattern[patternIndex].length; i++){
    switch(pattern[patternIndex].charAt(i)){
      case '*':
        hihat.play();
        break;
      case 'x':
        kick.play();
        break;
      case 'o':
        snare.play();
        break;
    }
  }

  patternIndex++;
  if (patternIndex >= pattern.length)
    patternIndex = 0;
}

function mousePressed(){
  playing = !playing;
  console.log(playing);

  if (playing){
    notePlayer = setInterval(playNote, 500);
    drumsPlayer = setInterval(playDrums, 250);
  }  else {
    clearInterval(notePlayer);
    clearInterval(drumsPlayer)
    synth.stop();
  }
}
