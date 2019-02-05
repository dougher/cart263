//let bubbles = [];
let idles = [
  "assets/images/idle.gif",
  "assets/images/idle_blinkonce.gif",
  "assets/images/idle_blinktwice.gif",

];
let reactions = [
  "assets/images/reaction_chookity.gif",
  "assets/images/reaction_wouaw.gif",
  "assets/images/reaction_oooh.gif",
  "assets/images/reaction_hmmm.gif"
];
let $img;

let sounds = [
  "assets/sounds/chookity.mp3",
  "assets/sounds/wouaw.mp3",
  "assets/sounds/oooh.mp3",
  "assets/sounds/hmmm.mp3"
];
let sound;

let soundPlaying = false;
// let state = {Idle:0, BlinkOnce:1, BlinkTwice:2};
// let current = state.Idle;

let idleInterval;

//We do a few simple things when the page is ready: get the image
//DOM element in a variable and set it to the initial gif, then set the
//intervals for randomized idle and the update which creates the floating bubbles.
$(document).ready(function(){
  $img = $('#mooncake');

  $img.attr('src', idles[0]);

  idleInterval = setInterval(randomIdle, 1500);

  setInterval(update, 2000);
});

//Every two seconds, the canvas generates a div bubble which floats up the
//main screen and can be popped to generate feedback.
function update(){
  //We set a random position for the bubbles that is within
  //the width of the screen.
  let xpos = Math.random() * innerWidth - parseInt($('.bubble').css('width'));

  let $b = $('<div></div>');
  $b.attr('class', 'bubble');
  $b.offset({
    'top': innerHeight,
    'left': xpos
  });

  let end = - parseInt($b.css('height')) * 2.5;
  console.log(xpos + " " + innerHeight);
  $b.animate({
    'top': end
  }, 8000, function(){
    this.remove();
  });

  $b.click(function(){
    let $text = $('<div>');
    $text.html(getReaction());
    $(this).append($text);
    $text.hide().fadeIn(500);

    sound.play();
    sound.addEventListener("ended", function(){
      randomIdle(); //We call idle once to make sure the idle gets set right back.
      //Then we set the interval so it gets back to being generated every second and a half.
      idleInterval = setInterval(randomIdle, 1500);

      $text.fadeOut(500, function(){ //Wait for the string to fade out before destroying
      // its div container.
        $b.remove();
      });

    });
  });

  $('body').append($b);


  $img.click(function(){
    if (!soundPlaying){
      soundPlaying = true;
      sound = new Audio("assets/sounds/squeak.wav");
      sound.play();
      sound.addEventListener('ended', function(){
        soundPlaying = false;
      });
    }

  });
  //bubbles.push($b);
}

//We randomize which idle gifs is being used to make the blinking less predictive.
function randomIdle(){
  let index = getRandomInt(0, idles.length - 1);  //Using credited random function found online.
  console.log(index);
  $img.attr('src', idles[index]);
}

function getReaction(){
 let index = getRandomInt(0, reactions.length-1); //Using credited random function found online.
 //let index = 2;

 clearInterval(idleInterval); //We stop the idle interval to avoid the idle
 //gifs preventing the reaction gifs.

 //We image and sound to the current index and send the corresponding string
 //to the bubble that called this function.
 $img.attr('src', reactions[index]);
 sound = new Audio(sounds[index]);
 switch (index){
  case 0:
    return "Chookity";
    break;
  case 1:
    return "Wouaw!";
    break;
  case 2:
    return "Ooooh";
    break;
  case 3:
    return "Hmmm";
    break;
  default:
    //If there needs to be a default case; shouldn't be the case since our
    //index can't be higher than the amount of gifs in the array.
    break;
 }
}
