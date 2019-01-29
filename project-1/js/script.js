let nbOfBonuses = 0;
let bonusFound = 0;

$(document).ready(function(){
  $('#restart').hide();
  nbOfBonuses = $('.unbonus').length;
  setInterval(update, 500);

  $('.redacted').on('click', spanClicked);
  $('.unbonus').hover(bonusRevealed);
});

function update(){

  if ($('.redacted').length === 0){
      //console.log("Game over!");
      $('.revealed').each(spanOff);
      $('.unbonus').each(bonusOff);
      $('#restart').fadeIn().on('click', reset);
  }
  else
    $('span').each(spanUpdate);
}
