"use strict";

const NB_OF_COINS = 5;
const TIME_OFFSET = 50;
const TIME_TO_WAIT = 60;

let countdown = 30;

let avatar;
let agents = [];
let win = false;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  textSize(36);

  avatar = new Avatar(createVector(width/2, height/2), 36, color(190, 0, 0));
  agents.push(avatar);

  for (let i=0; i<NB_OF_COINS; i++){
    agents.push(new Collectible(createVector(random(0, width), random(0, height), 0), random(MIN_SIZE, MAX_SIZE), color('#ffcf3b')));


  }
}

function draw() {
  background(0);

  if (countdown <= 0){
    DeactivateAgents();
    //console.log("You lost sucka!");
    fill(255);
    textAlign(CENTER);
    text("Time's up! Game over.\nPress any key to restart...", width/2, height/2);
  } else {
    if (frameCount % TIME_TO_WAIT === 0 && !win){
       countdown--;
    }
  }

  //Cycle through the agents, update an display them.
  for (let i=0;i<agents.length;i++){
   agents[i].update();
   agents[i].display();

   //If we're the avatar, let's check for overlap
   //with the other objects
   if (agents[i] === avatar){
     for (let j=1;j<agents.length;j++){
       if (avatar.overlap(agents[j])){
         avatar.gain(agents[j].size);

         if (avatar.state < 2)
          agents[j].reset();
        }
     }
   }

 }

 if (win){
   fill(255);
   textAlign(CENTER);
   text("You've won the game! Congrats :)))\nPress any key to restart...", width/2, height/2);
 }

 fill(255);
 textAlign(LEFT);
 text(countdown, TIME_OFFSET, TIME_OFFSET);

}

function GameWon(){
  if (!win){
    win = true;

    DeactivateAgents();
  }
}

function DeactivateAgents(){
  for (let i=0;i<agents.length;i++){
    agents[i].active = false;
  }
}

function keyPressed(){
  if (win || countdown <= 0){
    resetAll();
    win = false;
    background(0);
    countdown = 30;
  }
}

function resetAll(){
  for (let i=0;i<agents.length;i++){
    agents[i].reset();
  }
}
