$(document).ready(function(){
  let $divs = $('div');
  let buttonUpdate = false;

  $divs.hide().fadeIn(3000);

  $('#toggle').on('click', function(){
    $('#first').animate({
      color: "red"
    }, 1000);
    $('#second').animate({
      color: "green"
    }, 1000);
    $('#third').animate({
      color: "blue"
    }, 1000, function(){
      if (!buttonUpdate){
        buttonUpdate = true;
        $('#toggle').fadeOut(500, function(){
          $(this).text("Fade out!").fadeIn(500, function(){
            $(this).on('click', function(){
              $divs.fadeOut(3000);
            });
          });
        });
      }

    });
  });



  // $('#first').css("color", "red");
  // $('#second').css("color", "green");
  // $('#third').css("color", "blue");
});
