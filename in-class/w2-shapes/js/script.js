"use strict";

function preload() {

}

let sq;
let cir;
let ln;

function setup() {
  createCanvas(innerWidth, innerHeight);
  sq = new Square (random(0, width), random(0, height), random(10, 50));
  cir = new Circle (random(0, width), random(0, height), random(10, 50));
  ln = new Line (random(0, width), random(0, height), random(0, width), random(0, height));
}


function draw() {
  background(0);
  sq.update();
  sq.display();
  cir.update();
  cir.display();
  ln.update()
  ln.display();
}
