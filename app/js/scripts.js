function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('footer-map'), {
    zoom: 4,
    center: uluru,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

// ---------------
// ***carousel****
// ---------------

$(document).ready(function(){
  $('.top-slider').slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear',
  autoplay: true
  });

  // menu serg

$('#panel-toggle').click(function() {
  $('#nav-icon').toggleClass('open');
  $('#panel').toggleClass('open');
});
// $('body').swipe({
//   swipeStatus:function(event, phase, direction, distance, duration, fingers)
//   {
//     if (phase=="move" && direction =="right") {
//       $('#nav-icon').addClass('open');
//       $('#panel').toggleClass('open');
//       return false;
//     }
//     if (phase=="move" && direction =="left") {
//       $('#nav-icon').removeClass('open');
//       $('#panel').toggleClass('open');
//       return false;
//     }
//   }
// });

});

// ---------------
// *End carousel**
// ---------------
