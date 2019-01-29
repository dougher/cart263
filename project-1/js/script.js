//let bubbles = [];

$(document).ready(function(){
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

  $('body').append(b);

  //bubbles.push(b);


}
