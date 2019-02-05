let $mouth;
let $fly;
let $choco;

let maxChew = Math.random() * 30;
let currChew = 0;

let buzzSound = new Audio("assets/sounds/buzz.mp3");
let chewingSound = new Audio("assets/sounds/crunch.wav");
let burpSound = new Audio("assets/sounds/burp.wav");
let hmmSound = new Audio("assets/sounds/onomatopoeia.wav");

let isChewing;


$(document).ready(function(){
  console.log(maxChew);
  if (maxChew > 10)
    maxChew = 10;

  $mouth = $('#mouth');
  $fly = $('#fly');
  $choco = $('#chocolate');

  $fly.draggable({
    start: function(event, ui){
      buzzSound.play();
      buzzSound.loop = true;
    },

    stop: function(event, ui){
      buzzSound.pause();
    }
  });

  $mouth.droppable({
    over: function(){
      $mouth.attr("src", "assets/images/mouth-open.png");
    },

    out: function(){
      $mouth.attr("src", "assets/images/mouth-closed.png");
    },

    drop: function(event, ui){
      ui.draggable.hide();
      buzzSound.pause();
      chew();
      isChewing = setInterval(chew, 250);
      chewingSound.play();
      chewingSound.loop = true;
    }
  });
});

function chew(){
  if ($mouth.attr("src") === "assets/images/mouth-open.png")
    $mouth.attr("src", "assets/images/mouth-closed.png");
  else
    $mouth.attr("src", "assets/images/mouth-open.png");

  console.log(currChew);
  currChew++;
  if (currChew >= maxChew){
    $mouth.attr("src", "assets/images/mouth-open.png");

    chewingSound.pause();
    burpSound.play();

    burpSound.addEventListener("ended", function(){
      $mouth.attr("src", "assets/images/mouth-closed.png");
      hmmSound.play();
    });

    clearInterval(isChewing);
  }
}
