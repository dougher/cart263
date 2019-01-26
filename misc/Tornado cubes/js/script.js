"use strict";

const LIFETIME = 3;

let angle = 0;
let boxes = [];

function preload() {

}

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);

  noFill();
  stroke("#fcc517");
}

function draw() {
  background(0);

  let b = new Box(orbit(), mouseY - height/2, frameCount * 0.01, frameCount * 0.1, LIFETIME);
  boxes.push(b);

  for (let i = 0; i<boxes.length;i++){
    if (boxes[i].time <= 0){
      boxes.splice(i, 1);
    }

    boxes[i].update();
    boxes[i].display();
  }

}

function orbit(){
  let x = mouseX - width/2;

  x += (Math.sin(angle)*(mouseY))/2;

  angle+= 0.1;

  return x;
}
