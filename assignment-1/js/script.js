let states = {
  Wait: 1,
  Play: 2,
  GameOver: 3
}

let currentState = states.Wait;

let avatar = {
  x: 0,
  y: 0,
  size: 48,
  originalSize: 48,
  color: '#a8cc3d',
  alive: true
}

let food = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  size: 0,
  color: '#3d82cc'
}

const DAMAGE = 0.3;

const MIN_SIZE = 12;
const MAX_SIZE = 64;

const MAX_VELOCITY = 10;

const TIME_TO_WAIT = 60;

const TEXT_SIZE = 36;

let waitTime = 3;
let ms = 0;

let score = 0;
let finalText = "";
let restartText = " Press any key to restart...";

function preload() {

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();
  textSize(TEXT_SIZE);

  //initial setting of canvas elements
  setFood();
}

// draw cycles through three states: "loading" screen, playing state and game over
function draw() {
  switch (currentState){
    case states.Wait:
      load();
      break;
    case states.Play:
      background('#000');

      push();

      displayFood();
      updateAvatar();
      displayAvatar();

      pop();
      break;
    case states.GameOver:
      setFinalText();
      textAlign(CENTER);
      text("Game over\n Final score: " + score + "\n" + finalText + restartText, width/2, height/2);
      break;
  }

}

function load() {
  updateWhileLoading();

  fill('#FFF');
  console.log(ms);

  textAlign(CENTER);
  text (waitTime, width/2 - 12, height/2);
  if (frameCount % TIME_TO_WAIT === 0){
    waitTime--;
  }

  if (waitTime === 0){
    currentState = states.Play;
  }
}

//To restart the game after game over
function keyPressed(){
  if (currentState == states.GameOver){
    reset();
  }
}

function reset(){
  avatar.x = width/2;
  avatar.y = width/2;
  avatar.size = avatar.originalSize;

  score = 0;

  setFood();

  currentState = states.Wait;
}

//This function is called while we wait for the initial countdown
function updateWhileLoading(){
  background('#000');

  displayStaticFood();
  avatar.x = width/2;
  avatar.y = height/2;
  displayAvatar();
}

function updateAvatar(){
  if (avatar.alive){
    avatar.x = mouseX;
    avatar.y = mouseY;

    avatar.size -= DAMAGE;

    if (checkCollision()){
      avatar.size += food.size/2;
      avatar.size = constrain(avatar.size, 0, avatar.originalSize);

      score += floor(food.size/2);

      setFood();
    }

    if (avatar.size <= 0){
      currentState = states.GameOver;
    }
  }
}

//All updating and displaying functions for avatar and food
function displayAvatar(){
  fill(avatar.color);
  ellipse(avatar.x, avatar.y, avatar.size, avatar.size);
}

function setFood(){
    food.x = random(width);
    food.y = random(height);
    food.vx = random (-MAX_VELOCITY, MAX_VELOCITY);
    food.vy = random (-MAX_VELOCITY, MAX_VELOCITY);
    food.size = random(MIN_SIZE, MAX_SIZE);
    food.generated = true;
}

function displayFood(){
// console.log(food.color);
  fill(food.color);
  ellipse(food.x, food.y, food.size, food.size);

  food.x += food.vx;
  food.y += food.vy;

  if (food.x + food.size/2 < 0){
    food.x = width + food.size/2;
    food.y = height - food.y;
  } else if (food.x - food.size/2 > width){
    food.x = 0 - food.size/2;
    food.y = height - food.y;
  }

  if (food.y + food.size/2 < 0){
    food.y = height + food.size/2;
    food.x = width - food.x;
  } else if (food.y - food.size/2 > height){
    food.y = 0 - food.size/2;
    food.x = width - food.x;
  }
}

function displayStaticFood(){
  fill(food.color);
  ellipse(food.x, food.y, food.size, food.size);
}

//Check collision to see if avatar eats food
function checkCollision(){
  let distance = dist(avatar.x, avatar.y, food.x, food.y);

  if (distance < avatar.size/2 + food.size/2)
    return true;
  else
    return false;
}

function setFinalText(){
  if (score === 0){
    finalText = "Aww, did you even try? ;(";
  } else if (score < 100){
    finalText = "That's a beginning... try again?"
  } else if (score < 200){
    finalText = "Not bad!"
  } else if (score < 300){
    finalText = "Good job, but I'm sure you can get even better ;)"
  } else if (score < 400){
    finalText = "Way to go champ! You should tap yourself on the shoulder."
  } else if (score < 500){
    finalText = "Damn son, where did you get those skills?!"
  } else {
    finalText = "Wow, I am so impressed with you :0 Chapeau!"
  }
}
