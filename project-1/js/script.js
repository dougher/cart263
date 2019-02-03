//let bubbles = [];
let imgs = [];
imgs.push("assets/images/mooncake_noblink.gif");
imgs.push("assets/images/mooncake_blinkonce.gif");
imgs.push("assets/images/mooncake_blinktwice.gif");
let $img;

let state = {Idle:0, BlinkOnce:1, BlinkTwice:2};
let current = state.Idle;

$(document).ready(function(){
  $img = $('#mooncake');

  $img.attr('src', imgs[0]);

  setInterval(randomFace, 1500);

  setInterval(update, 2000);
});

function update(){
  let xpos = Math.random() * innerWidth;

  let b = $('<div></div>');
  b.attr('class', 'bubble');
  b.offset({
    'top': innerHeight,
    'left': xpos
  });

  let end = - parseInt(b.css('height')) * 2.5;
  console.log(xpos + " " + innerHeight);
  b.animate({
    'top': end
  }, 8000, function(){
    this.remove();
  });

  b.click(function(){
    this.remove();
  });

  $('body').append(b);

  //bubbles.push(b);
}

function randomFace(){
  let curr = getRandomInt(0, imgs.length - 1);
  console.log(curr);
  $img.attr('src', imgs[curr]);
}
