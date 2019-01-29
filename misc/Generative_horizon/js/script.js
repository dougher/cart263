"use strict";
const TIME = 0.005;
let SCROLLING_SPEED = 1;
let STEP_YAXIS = 1;

let horizon = [];

let t = 0;

let pixel = false;

let player;

function preload() {

}

function setup() {
  createCanvas(innerWidth, innerHeight);

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

    if (pixel){
      for (let j=horizon[i].ypos; j<height; j+= STEP_YAXIS){
        point(horizon[i].xpos, j);
      }
    } else {
      line(horizon[i].xpos, horizon[i].ypos, horizon[i].xpos, height);
      // for (let j=horizon[i].ypos; j<height; j+= STEP_YAXIS){
      //   point(horizon[i].xpos, j);
      // }
    }
  }

  //console.log(horizon);

  player.update();
  player.display();

  t += TIME;
}

function keyPressed(){
  console.log(keyCode);
  if (key === 32){

  }

  switch (keyCode){
    case 32:
      pixel = !pixel;
      console.log("Toggled pixel drawing to: " + pixel);
      break;
    case LEFT_ARROW:
      SCROLLING_SPEED--;
      break;
    case RIGHT_ARROW:
      SCROLLING_SPEED++;;
      break;
    case DOWN_ARROW:
      STEP_YAXIS--;
      break;
    case UP_ARROW:
      STEP_YAXIS++;
      break;

  }

  SCROLLING_SPEED = constrain(SCROLLING_SPEED, 1, 10);
  STEP_YAXIS = constrain(STEP_YAXIS, 1, 10);

  console.log("Scrolling speed: " + SCROLLING_SPEED);
  console.log("Step Y Axis: " + STEP_YAXIS);
}

// function Fade(){
//   // let c = map(j, height/2, (height/4)*3 , 0, 255);
//   // if (c >= 255)
//   //   break;
//   //
//   // stroke(c);
// }
