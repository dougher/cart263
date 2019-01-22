let time = 0;

$(document).ready(function(){
  setInterval(update, 500);

  $('span').on('click', spanClicked);
});

function update(){
  $('span').each(updateSpan);
}

function updateSpan(){
  r = Math.random();
  if (r < .1){
    $(this).removeClass('redacted').addClass('revealed');
  }
}

function spanClicked(){
  $(this).removeClass('revealed').addClass('redacted');
}
