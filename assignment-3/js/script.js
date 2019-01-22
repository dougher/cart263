let gameOver = false;

let time = 0;

$(document).ready(function(){
  $('#restart').hide();
  setInterval(update, 500);

  $('.redacted').on('click', spanClicked);
  $('.unbonus').hover(revealBonus);
});

function update(){
  console.log(gameOver);
  if ($('.redacted').length === 0){
      console.log("Game over!");
      $('span').off('click', '.revealed');
      $('#restart').fadeIn();
  }
  else
    $('span').each(updateSpan);
}

function updateSpan(){
  r = Math.random();
  if (r < .5){
    $(this).removeClass('redacted').addClass('revealed');
  }
}

function spanClicked(){
  $(this).removeClass('revealed').addClass('redacted');
}

function revealBonus(){
  $(this).removeClass('unbonus').addClass('bonus');
}
