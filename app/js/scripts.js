function initMap() {
	if (document.getElementById('footer-map')) {
// footer
  var uluru = {lat: 50.340931, lng: 30.326125};
  var map = new google.maps.Map(document.getElementById('footer-map'), {
    zoom: 15,
    center: uluru,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  }
  	if (document.getElementById('delivery-map')) {
 // delivery
  var uluru_con = {lat: 50.340931, lng: 30.326125};
  var map_con = new google.maps.Map(document.getElementById('delivery-map'), {
    zoom: 15,
    center: uluru_con,
    scrollwheel: false
  });
  var marker2 = new google.maps.Marker({
    position: uluru_con,
    map: map_con,
    icon: '../img/icons/wish.png'
  });
  }
  	if (document.getElementById('contact-map')) {
// contacts
  var uluru_con = {lat: 50.340931, lng: 30.326125};
  var map_con = new google.maps.Map(document.getElementById('contact-map'), {
    zoom: 15,
    center: uluru_con,
    scrollwheel: false
  });
  var marker3 = new google.maps.Marker({
    position: uluru_con,
    map: map_con,
    icon: '../img/icons/wish.png'
  });
  }
}

// forEach
var forEach = function(array, func) {
	for(var i = 0, n = array.length; i < n; i++) {
		func(array[i], i, array);
	}
}

//getIndex
var getIndex = function(el) {
	var arr = el.parentNode.children;
	for(var i = 0, n = arr.length; i < n; i++) {
		if (el === arr[i]) {return i;}
	}
	return -1;
}

//Slider
var Slider = function() {};

Slider.prototype.setSlider = function(slider, auto, num) {
	this.slider = slider;
	this.content = this.slider.getElementsByClassName("content")[0];
	this.items = this.slider.getElementsByClassName('slide-bottom-item');
	this.indicators = this.slider.getElementsByClassName('indicators')[0];
	this.left = this.slider.getElementsByClassName('left')[0];
	this.right = this.slider.getElementsByClassName('right')[0];
	this.nextItem = 1;
	let _this = this;
	var i, n, el, changeActive, interval;
		num = num - 1 || 0;
		auto = auto || false;

	if (!this.content.getElementsByClassName("active")[0]) {
		this.items[0].classList.add('active');
	}

	this.changeActive = function(prev, next) {
		if (this.indicators) {
			if (this.indicators[prev]) {
				this.indicators[prev].classList.remove("active-item");
			}
			this.indicators[next].classList.add("active-item");
		}
		this.items[prev * this.nextItem].classList.remove("active");
		this.items[next * this.nextItem].classList.add("active");
	}

	if (this.indicators) {
		for (i = 0, n = (this.items.length - num); i<n; i++) {
			el = document.createElement('li');
			el.className = "item";
			this.indicators.appendChild(el);
		}
		el = getIndex(this.content.getElementsByClassName("active")[0]);
		this.indicators = this.slider.getElementsByClassName("item");
		this.indicators[el].classList.add('active-item');
		for (let i = 0, n = this.indicators.length; i < n; i++) {
			this.indicators[i].addEventListener("click", () => {
				this.changeActive(getIndex(this.slider.getElementsByClassName("active-item")[0]), getIndex(this.indicators[i]));
			});
		}
	}

	this.leftChange = function() {
		var prevIndex = getIndex(_this.content.getElementsByClassName("active")[0])
			, nextIndex = prevIndex - 1;
		if (nextIndex === -1 ) {nextIndex += (_this.items.length - num)}
		_this.changeActive(prevIndex, nextIndex);
	}

	if (this.left) {
		this.left.addEventListener("click", this.leftChange);
	}

	this.rightChange = function() {
		var prevIndex = getIndex(_this.content.getElementsByClassName("active")[0])
				, nextIndex = prevIndex + 1;
		if (nextIndex >= (_this.items.length - num) ) {nextIndex = 0}
		_this.changeActive(prevIndex, nextIndex);
	}

	if (this.right) {
		this.right.addEventListener("click", this.rightChange);
	}

	this.content.addEventListener('touchstart', function(e) {
		_this.startX = e.changedTouches[0].pageX;
	});
	this.content.addEventListener('touchend', function(e) {
		if (_this.startX < e.changedTouches[0].pageX) {
			_this.leftChange();
		} else if (_this.startX > e.changedTouches[0].pageX) {
			_this.rightChange();
		}
	});

	if (auto) {
		interval = setInterval(() => {
			var prevIndex = getIndex(this.slider.getElementsByClassName("active")[0])
				, nextIndex = prevIndex + 1 ;
			if (nextIndex >= (this.items.length - num)) {nextIndex = 0;}
			this.changeActive(prevIndex, nextIndex);
		}, 10000);
	}
	this.ready = true;
}

//Portfolio
var Portfolio = function() {};
Portfolio.prototype.setSlider = function(slider, auto, num) {
	Slider.prototype.setSlider.call(this, slider, auto, num);
	this.changeActive = function(prev, next) {
		this.items[prev].classList.remove("active");
		this.items[next].classList.add("active");
		this.nav[prev].classList.remove('active-nav');
		this.nav[next].classList.add('active-nav');
	}
	this.nav = slider.getElementsByClassName('img-nav');
	var _this = this;
	forEach(this.nav, function(el, i) {
		el.setAttribute('data-id', i);
		el.addEventListener('click', function() {
			_this.changeActive(slider.getElementsByClassName("active-nav")[0].getAttribute('data-id'), el.getAttribute('data-id'));
		})
	});
}

var slider = new Portfolio();

window.addEventListener('load', function() {
  if(document.getElementById('portfolio')){
    slider.setSlider(document.getElementById('portfolio').getElementsByClassName('slider-bottom')[0]);
  }
});

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

// ---------------
// ***restaurant menu****
// ---------------

    $('.menu .nav-menu-block-wrapper ul li').eq(0).addClass("active_li");
    $('.menu .content_menu').eq(0).addClass("active");
  $('.menu .nav-menu-block-wrapper ul li').click(function(){
    if(!$(this).hasClass( "active_li" )) {
      var index = $(this).index();
      $('.menu .nav-menu-block-wrapper ul li').removeClass("active_li");
      $(this).addClass("active_li");
      $('.menu .content_menu.active').removeClass("active");
      $('.menu .content_menu').eq(index).addClass("active");
      return false;
    }
  });

$('.list-items .list-item').click(function(){
  $('.child-full-wrapper .active').removeClass('active');
  var new_active = $(this).data('block');
  $('.child-full-wrapper .'+ new_active).addClass('active');
  return false;
});

// ---------------
// *End restaurant menu**
// ---------------

// -----------
// ***popup***
// -----------

var hotelPage = document.getElementById('hotel');
var сateringPage = document.getElementById('сatering');

if (hotelPage) {
  $('.room button').on('click', popUpShow);
}

if (сateringPage) {
  $('.button-order').on('click', popUpShow);
}

$('.popup-container').hide();

$('.popup-overflow').on('click', popUpHide);

$('.popup-container .fa-times').on('click', popUpHide);

function popUpShow(e) {
  e.stopPropagation();
  $('.popup-container').show(300);
  $(".popup-overflow").css('display', 'block');
}

function popUpHide(e) {
  $('.popup-container').hide(300);
  $(".popup-overflow").css('display', 'none');
}

// -----------
// *end popup*
// -----------
// -----------
// ***main-nav mobile***
// -----------
$('.main_nav_sandwich .fa-bars').click(function(){
  	$('header .main_nav .main_head').css('display', 'block');
  	$('header .main_nav .main_nav_sandwich .fa-window-close').css('display', 'block');
  	$('header .main_nav .main_nav_sandwich .fa-bars').css('display', 'none');
  	return false;
});
$('.main_nav_sandwich .fa-window-close').click(function(){
  	$('header .main_nav .main_head').css('display', 'none');
  	$('header .main_nav .main_nav_sandwich .fa-window-close').css('display', 'none');
  	$('header .main_nav .main_nav_sandwich .fa-bars').css('display', 'block');
  	return false;
});
// -----------
// ***end of main-nav mobile***
// -----------
// -----------
// ***footer mobile***
// -----------
$('footer .flex-row-wrapper .contact-open-button').click(function(){
  	$('footer .flex-row-wrapper .contacts').css('display', 'block');
  	$('footer .flex-row-wrapper .contact-open-button').css('display', 'none');
  	return false;
});

// -----------
// ***end of footer mobile***
// -----------

// ---------------
// ***menu tabulation****
// ---------------
    $('#restoran_menu .menu-nav-items .menu-item').eq(0).addClass("active_a");
    $('#restoran_menu .stock-grid-wrapper').eq(0).addClass("active");
    $('#restoran_menu .restoran_menu .kind-of').eq(0).addClass("active-title");
  $('#restoran_menu .menu-nav-items .menu-item').click(function(){
    if(!$(this).hasClass( "active_a" )) {
      var index = $(this).index();
      $('#restoran_menu .menu-nav-items .menu-item').removeClass("active_a");
      $(this).addClass("active_a");
      $('#restoran_menu .stock-grid-wrapper.active').removeClass("active");
      $('#restoran_menu .stock-grid-wrapper').eq(index).addClass("active");

      $('#restoran_menu .restoran_menu .kind-of.active-title').removeClass("active-title");
      $('#restoran_menu .restoran_menu .kind-of').eq(index).addClass("active-title");
      return false;
    }
  });

// ---------------
// ***End menu tabulation****
// ---------------

});

$(document).ready(function() {
  $('.multiple-items').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
	});

$('.center-items').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});
$('.center-items').on('afterChange', function(event, slick, currentSlide) {
	$('.center-slider-item').removeClass('slide-active');
  	$('.slick-center').addClass('slide-active');
});
	
});

$(window).on('orientationchange', function() {
	location.reload();
})
