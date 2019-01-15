"use strict";
const NB_OF_COINS = 5;

let avatar;
let agents = [];
let win = false;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  avatar = new Avatar(createVector(width/2, height/2), 36, color(190, 0, 0));
  agents.push(avatar);

  for (let i=0; i<NB_OF_COINS; i++){
    agents.push(new Collectible(createVector(random(0, width), random(0, height), 0), random(MIN_SIZE, MAX_SIZE), color('#ffcf3b')));


  }
}

function draw() {
  background(0);
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
   textSize(36);
   textAlign(CENTER);
   text("You've won the game! Congrats :)))\nPress any key to restart...", width/2, height/2);
 }
}

function gameWon(){
  if (!win){
    win = true;

    for (let i=0;i<agents.length;i++){
      agents[i].active = false;
    }
  }
}

function keyPressed(){
  if (win){
    resetAll();
    win = false;
    background(0);
  }
}

function resetAll(){
  for (let i=0;i<agents.length;i++){
    agents[i].reset();
  }
}
