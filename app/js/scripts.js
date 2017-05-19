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

//Lazy
var Lazy = function(){};
Lazy.scroll = function() {
	var className = 'lazyLoading'
	var lazy = document.getElementsByClassName(className);
	forEach(lazy, function(el, i) {
		if (el && (el.getBoundingClientRect().top - (window.innerHeight * 2)) < 0) {
			el.classList.remove(className);
			el.src = el.getAttribute('data-src');
		}
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

});

// ---------------
// *End carousel**
// ---------------
