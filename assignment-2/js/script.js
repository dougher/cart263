"use strict";
let avatar;
let agents = [];

const NB_OF_COINS = 5;

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
         avatar.grow(agents[j].size);
         agents[j].reset();
       }
     }
   }

 }
}
