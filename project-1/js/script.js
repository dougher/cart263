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

function spanUpdate(){
  r = Math.random();
  if (r < .2){
    $(this).removeClass('redacted').addClass('revealed');
  }
}

function spanClicked(){
    $(this).removeClass('revealed').addClass('redacted');
}

function spanOff(){
  //console.log("Span turning off");
  $(this).off('click');
}

function bonusRevealed(){
  console.log ($(this).is('.unbonus'));
  if ($(this).is('.unbonus')){
    bonusFound++;
  }

  $(this).removeClass('unbonus').addClass('bonus');

  $('#bonus-text').text("Found " + bonusFound + " of " + nbOfBonuses + " bonus words!");
}

function bonusOff(){
  $(this).unbind('mouseenter').unbind('mouseleave');
}

function reset(){
  $('.revealed').each(function(){
    $(this).removeClass('revealed').addClass('redacted').on('click', spanClicked);
  });

  $('.bonus').each(function(){
    $(this).removeClass('bonus').addClass('unbonus').hover(bonusRevealed);
  });

  $('#bonus-text').text("");
  bonusFound = 0;

  $(this).fadeOut();
}
