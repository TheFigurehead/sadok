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


$(document).ready(function(){

  // ---------------
  // ***carousel****
  // ---------------

  $('.top-slider').slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear',
  autoplay: true
  });

  // ---------------
  // *End carousel**
  // ---------------

  // ---------------
  // **hotel page***
  // ---------------

  var hotelPage = document.getElementById('hotel');

  if (hotelPage) {
    $('.room button').on('click', popUpShow);
  }

  // ----------------
  // *end hotel page*
  // ----------------

  // -----------
  // ***popup***
  // -----------

  $('.popup-container').hide();

  $('.popup-overflow').on('click', popUpHide);

  $('.popup-container .fa-times').on('click', popUpHide);

  function popUpShow(e) {
    e.stopPropagation();
    $('.popup-container').show(300);
  }

  function popUpHide(e) {
    $('.popup-container').hide(300);
  }

  // -----------
  // *end popup*
  // -----------

});