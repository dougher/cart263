"use strict";
const TIME = 0.005;
const SCROLLING_SPEED = 1;

let horizon = [];

let t = 0;

let player;

function preload() {

}

function setup() {
  createCanvas(innerWidth, innerHeight);
  let first = new Point(width/2, height/2);

  horizon.push(first);

  player = new Character(width/2,height/2);
}

function draw() {
  background(255);

  let n = noise(t);

  let y = map(n, 0, 1, height/4, (height/4) * 3);

  let p = new Point(width/2, y);
  horizon.push(p);

  for (let i=0; i<horizon.length;i++){
    horizon[i].update();

    if (!horizon[i].active)
      horizon.splice(i, 1);

    horizon[i].display();
  }

  player.update();
  player.display();

  t += TIME;
}

function keyPressed(){
  switch (keyCode){
    case LEFT_ARROW:
      player.move("Left");
      break;
    case RIGHT_ARROW:
      player.move("Right");
      break;
  }
}
