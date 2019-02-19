"use strict";

$(document).ready(function(){

  $(document).on('click', function(){
    responsiveVoice.speak("Fuck you World, I love you though kthanks bye", "UK English Male", {
      pitch: Math.random() * 2,
      rate: Math.random(),
      volume:1,
      onend: function (){
          responsiveVoice.speak("Aand I'm done, bitch.");
      }
    });
  });
});
