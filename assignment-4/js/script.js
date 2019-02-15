let $mouth;
let $fly;
let $choco;

let maxChew = parseInt(Math.random() * 30);
let currChew = 0;
let isChewing = false;

let buzzSound = new Audio("assets/sounds/buzz.mp3");
let ahhhSound = new Audio("assets/sounds/ahhh.mp3");
let chewingSound = new Audio("assets/sounds/crunch.wav");
let burpSound = new Audio("assets/sounds/burp.wav");
let hmmSound = new Audio("assets/sounds/hmmm.wav");
let nuhuhSound = new Audio("assets/sounds/nuh-uh.mp3");

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

  $choco.draggable({revert: "valid"});

  $mouth.droppable({

    over: function(event, ui){

      if ($choco.attr("id") === ui.draggable.attr("id")){
        //console.log("Playing nuh-uhhh.");
        nuhuhSound.play();
        nuhuhSound.loop = false;
      } else{
        $mouth.attr("src", "assets/images/mouth-open.png");
        ahhhSound.play();
        ahhhSound.loop = false;
      }

    },

    out: function(){
      $mouth.attr("src", "assets/images/mouth-closed.png");
      ahhhSound.pause();
      ahhhSound.currentTime = 0;
    },

    drop: function(event, ui){
      if ($fly.attr("id") === ui.draggable.attr("id")){
        ui.draggable.hide();
        buzzSound.pause();
        ahhhSound.pause();
        
        chew();
        isChewing = setInterval(chew, 250);
        chewingSound.play();
        chewingSound.loop = true;
      }
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
