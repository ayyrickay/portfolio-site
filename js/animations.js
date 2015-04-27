//change color of design-skill icon
$( "#design-skill" ).click(function() {
  if($('#design-skill').hasClass('skill-filter')){
            $('#design-skill').removeClass('skill-filter');
  }else{
      $('#design-skill').addClass('skill-filter');
  }
});

//change color of dev skill icon
$( "#dev-skill" ).click(function() {
  if($('#dev-skill').hasClass('skill-filter')){
            $('#dev-skill').removeClass('skill-filter');
  }else{
      $('#dev-skill').addClass('skill-filter');
  }
});

//change color of doodle skill icon
$( "#doodle-skill" ).click(function() {
  if($('#doodle-skill').hasClass('skill-filter')){
            $('#doodle-skill').removeClass('skill-filter');
  }else{
      $('#doodle-skill').addClass('skill-filter');
  }
});

//show text on hover of social icons
$(".social-icon img").hover(function(){
    $(this).next().css("visibility", "visible");
    }, function(){
    $(this).next().css("visibility", "hidden");
});
