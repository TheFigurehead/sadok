function initMap() {
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
  slider.setSlider(document.getElementById('portfolio').getElementsByClassName('slider-bottom')[0]);
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

// ---------------
// *End restaurant menu**
// ---------------

});
