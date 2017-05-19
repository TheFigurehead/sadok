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
});

// ---------------
// *End carousel**
// ---------------

// ---------------
// ***restaurant menu****
// ---------------

$(document).ready(function(){
  $('#main .nav_menu .nav-menu-block-wrapper ul .europe').click(function() {
    $('#main .content_menu').removeClass('active');
    $('#main .europe_content').addClass('active');
    $('#main .nav_menu .nav-menu-block-wrapper ul li').removeClass('active_li');
    $('#main .nav_menu .nav-menu-block-wrapper ul .europe').addClass('active_li');
  })

  $('#main .nav_menu .nav-menu-block-wrapper ul .asia').click(function() {
    $('#main .content_menu').removeClass('active');
    $('#main .asia_content').addClass('active');
    $('#main .nav_menu .nav-menu-block-wrapper ul li').removeClass('active_li');
    $('#main .nav_menu .nav-menu-block-wrapper ul .asia').addClass('active_li');
  })

  $('#main .nav_menu .nav-menu-block-wrapper ul .bar').click(function() {
    $('#main .content_menu').removeClass('active');
    $('#main .bar_content').addClass('active');
    $('#main .nav_menu .nav-menu-block-wrapper ul li').removeClass('active_li');
    $('#main .nav_menu .nav-menu-block-wrapper ul .bar').addClass('active_li');
  })

  $('#main .nav_menu .nav-menu-block-wrapper ul .child').click(function() {
    $('#main .content_menu').removeClass('active');
    $('#main .child_content').addClass('active');
    $('#main .nav_menu .nav-menu-block-wrapper ul li').removeClass('active_li');
    $('#main .nav_menu .nav-menu-block-wrapper ul .child').addClass('active_li');
  })

  $('#main .nav_menu .nav-menu-block-wrapper ul .banquet').click(function() {
    $('#main .content_menu').removeClass('active');
    $('#main .banquet_content').addClass('active');
    $('#main .nav_menu .nav-menu-block-wrapper ul li').removeClass('active_li');
    $('#main .nav_menu .nav-menu-block-wrapper ul .banquet').addClass('active_li');
  })

});

// ---------------
// *End restaurant menu**
// ---------------