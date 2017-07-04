function initMap() {
  var footerMap = document.getElementById('footer-map');

	if (footerMap) {
// footer
  var uluru = {lat: 50.290691, lng: 30.695672};
  var map = new google.maps.Map(footerMap, {
    zoom: 15,
    center: uluru,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: 'http://www.wishspace.com.ua/wp-content/themes/wishplace/img/icons/wish.png'
  });
  }
  	if (document.getElementById('delivery-map')) {
 // delivery
  var uluru_con = {lat: 50.290691, lng: 30.695672};
  var map_con = new google.maps.Map(document.getElementById('delivery-map'), {
    zoom: 15,
    center: uluru_con,
    scrollwheel: false
  });
  var marker2 = new google.maps.Marker({
    position: uluru_con,
    map: map_con,
    icon: 'http://www.wishspace.com.ua/wp-content/themes/wishplace/img/icons/wish.png'
  });
  }
  	if (document.getElementById('contact-map')) {
// contacts
  var uluru_con = {lat: 50.290691, lng: 30.695672};
  var map_con = new google.maps.Map(document.getElementById('contact-map'), {
    zoom: 15,
    center: uluru_con,
    scrollwheel: false
  });
  var marker3 = new google.maps.Marker({
    position: uluru_con,
    map: map_con,
    icon: 'http://www.wishspace.com.ua/wp-content/themes/wishplace/img/icons/wish.png'
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

    //my
   // _this.customChange();
    //end my
	}

	if (this.left) {
		this.left.addEventListener("click", this.leftChange);
	}

	this.rightChange = function() {
		var prevIndex = getIndex(_this.content.getElementsByClassName("active")[0])
				, nextIndex = prevIndex + 1;
		if (nextIndex >= (_this.items.length - num) ) {nextIndex = 0}
		_this.changeActive(prevIndex, nextIndex);

    //my
    //_this.customChange();
    //end my
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
  //my
  this.customChange = function() {
    $('.slide-bottom-item img').height(0);
    $('.slide-bottom-item.active img').css({height: 'auto'});
    var activeHeight = $('.slide-bottom-item.active img').height();
    $('#portfolio .slider-bottom').css({maxHeight: activeHeight + 'px'});
  }
  var _this = this;
  //end my
	this.changeActive = function(prev, next) {
		this.items[prev].classList.remove("active");
		this.items[next].classList.add("active");
		this.nav[prev].classList.remove('active-nav');
		this.nav[next].classList.add('active-nav');
    _this.customChange();
	}
	this.nav = slider.getElementsByClassName('img-nav');
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
    // my
    slider.customChange();
    // end my
  }
});
//end slider

$(document).ready(function() {
  if ($('.top-slider').length) {
    $('.top-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    arrows: false
    });
  }

  // verification for mobile panel
  if (document.getElementById('panel')) {

    if (!window.matchMedia("(max-width: 870px)").matches) {$('body').css({paddingLeft: '50px'})};

    var pluses = $('#panel .plus');

    $.each(pluses, function(i, item) {
      if (!$('.dropdown', $(item).parent()).length) $(item).remove()
    });

    pluses = $('#panel .plus');

    pluses.on('click', function() {
      $(this).parent().toggleClass('active');
    });

    // menu serg
    $('#panel-toggle').click(function() {
      $('#nav-icon').toggleClass('open');
      $('#panel').toggleClass('open');

      pluses.parent().removeClass('active');
    });
    // end menu serg
  };
  // end verification for mobile panel

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
  $('.booking-button-block button').on('click', popUpShow);
}

if (сateringPage) {
  $('.button-order').on('click', popUpShow);
}

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
// ***hover effect on mobile***
// -----------
if (!window.matchMedia("(max-width=1024px)")) {
  if (document.getElementById('hotel')) {
    $('.stock-grid-wrapper .stock-grid').click(function(){
        var index = $(this).index();
        $('.stock-grid-wrapper .stock-grid .stock-wrapper p').removeClass("active_elements");
        $('.stock-grid-wrapper .stock-grid .stock-wrapper .button').removeClass("active_elements");
        $('.stock-grid-wrapper .stock-grid .stock-wrapper p').eq(index).addClass("active_elements");
        $('.stock-grid-wrapper .stock-grid .stock-wrapper .button').eq(index).addClass("active_elements");
    });
  }

  if (document.getElementById('welness')||document.getElementById('fitness_new')) {
    $('.multiple-slider-wrapper .multiple-fitness-items .multiple-slider-item').click(function(){
        var index = $(this).index();
        $('.multiple-slider-wrapper .multiple-fitness-items .multiple-slider-item .title-block-wrapper').css('display', 'block');
        $('.multiple-slider-wrapper .multiple-fitness-items .multiple-slider-item .icon').css('display', 'block');
        $('.multiple-slider-wrapper .multiple-fitness-items .multiple-slider-item .button-details').css('display', 'none');
        $('.multiple-slider-wrapper .multiple-fitness-items .multiple-slider-item .title-block-wrapper').eq(index).css('display', 'none');
        $('.multiple-slider-wrapper .multiple-fitness-items .multiple-slider-item .icon').eq(index).css('display', 'none');
        $('.multiple-slider-wrapper .multiple-fitness-items .multiple-slider-item .button-details').eq(index).css('display', 'block');
    });
  }
}
// -----------
// ***End hover effect on mobile***
// -----------
// -----------
// ***main-nav mobile***
// ----------- 
$('.main_nav_sandwich .fa-bars').click(function(){
  	$('header .main_nav .main_head li').css('display', 'block');
    $('header .main_nav .main_head .phone').css('position', 'relative');
    $('header .main_nav .main_head .phone').css('top', '0');
    $('header .main_nav .main_head .phone').css('right', '0');
  	$('header .main_nav .main_nav_sandwich .fa-window-close').css('display', 'block');
  	$('header .main_nav .main_nav_sandwich .fa-bars').css('display', 'none');
  	return false;
});

$('.main_nav_sandwich .fa-window-close').click(function(){
  	$('header .main_nav .main_head li').css('display', 'none');
    $('header .main_nav .main_head .phone').css('position', 'absolute');
    $('header .main_nav .main_head .phone').css('top', '15px');
    $('header .main_nav .main_head .phone').css('right', '30px');
    $('header .main_nav .main_head .phone').css('display', 'block');
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
  $('#restoran_menu .menu-nav-items .menu-item').click(function() {
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

// ---------------
// ***slick sliders****
// ---------------

$(document).ready(function() {
  if ($('.multiple-items').length) {
   //  $('.multiple-items').slick({
   //    infinite: true,
   //    slidesToShow: 3,
   //    slidesToScroll: 1,
   //    responsive: [
   //      {
   //        breakpoint: 870,
   //        settings: {
   //          slidesToShow: 1,
   //          slidesToScroll: 1
   //        }
   //      }
   //    ]
	// });

   //  $('.center-items').slick({
   //    centerMode: true,
   //    centerPadding: '60px',
   //    slidesToShow: 3,
   //    adaptiveHeight: true,
   //    responsive: [
   //      {
   //        breakpoint: 768,
   //        settings: {
   //          arrows: false,
   //          centerMode: true,
   //          centerPadding: '40px',
   //          slidesToShow: 3
   //        }
   //      },
   //      {
   //        breakpoint: 480,
   //        settings: {
   //          arrows: false,
   //          centerMode: true,
   //          centerPadding: '40px',
   //          slidesToShow: 1
   //        }
   //      }
   //    ]
   //  });
   //  $('.center-items').on('afterChange', function(event, slick, currentSlide) {
   //  	$('.center-slider-item').removeClass('slide-active');
   //    	$('.slick-center').addClass('slide-active');
   //  });
  }
// ---------------
// ***End slick sliders****
// ---------------

// ---------------
// ***noUiSlider****
// ---------------
var menuCategory = document.getElementById('menu-category');

 if (menuCategory) {
var html5Slider = document.getElementById('html5');

noUiSlider.create(html5Slider, {
  start: [ 20, 120 ],
  connect: true,
  range: {
    'min': 0,
    'max': 140
  }
});

  var inputNumber = document.getElementById('input-number');
  var inputNumber2 = document.getElementById('input-number2');

html5Slider.noUiSlider.on('update', function( values, handle ) {

  if ( handle ) {
    inputNumber2.value = Math.round(values[1]);
  }else{
    inputNumber.value = Math.round(values[0]);
  }
});

inputNumber.addEventListener('change', function(){
  html5Slider.noUiSlider.set([this.value, null]);
});

inputNumber2.addEventListener('change', function(){
  html5Slider.noUiSlider.set([null, this.value]);
});
} 
// ---------------
// ***End of noUiSlider****
// ---------------

  // datepicker hotel
  var arrivalDateInput = $('#arrival-date');

  if (arrivalDateInput.length > 0) {
    var arrivalDate, 
    departureDate,
    monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    departureDateInput = $('#departure-date'),
    dateNow = new Date();

    arrivalDateInput.datepicker({
      minDate: 0,
      dateFormat: "m/d/yy",
      firstDay: 1,
      monthNames: monthes
    }).on('change', function() {
      arrivalDate = $(this).val().match(/(\d\d\d\d|\d\d|\d)/g);

      dateOnclick.bind(this)(arrivalDate);
      var dateForDepartureDate = new Date(arrivalDate[2], arrivalDate[0] - 1, +arrivalDate[1] + 1)
      departureDateInput.datepicker('option', 'minDate', dateForDepartureDate);

      

      if (!departureDate || +arrivalDate[0] > +departureDate[0] || (+arrivalDate[1] >= +departureDate[1] && +arrivalDate[0] >= +departureDate[0]) || +arrivalDate[2] > +departureDate[2]) 
        departureDateInput.val((dateForDepartureDate.getMonth() + 1) + '/' + dateForDepartureDate.getDate() + '/' + dateForDepartureDate.getFullYear()).trigger('change');
    });

    departureDateInput.datepicker({
      minDate: 0,
      dateFormat: "m/d/yy",
      firstDay: 1,
      monthNames: monthes
    }).on('change', function() {
      departureDate = $(this).val().match(/(\d\d\d\d|\d\d|\d)/g);

      dateOnclick.bind(this)(departureDate);
    });

    arrivalDateInput.val((dateNow.getMonth() + 1) + '/' + dateNow.getDate() + '/' + dateNow.getFullYear()).trigger('change');

    function dateOnclick(date) {
      var parent = $(this).parent();

      month = monthes[+date[0] - 1];

      $('.number', parent).text(date[1]);
      $('.month', parent).text(' / ' + monthes[+date[0] - 1]);
    }

    var adults = 1,
    children = 0,
    adultsSelect = $('#adults'),
    childrenSelect = $('#children'),
    guestsNumberBlock = $('.guests .number');

    adultsSelect.on('change', function() {
      adults = +adultsSelect.val();
      guestsNumberBlock.text(children + adults);
    })

    childrenSelect.on('change', function() {
      children = +childrenSelect.val();
      guestsNumberBlock.text(children + adults);
    })

    var bookingSubmit = $('.booking-button-block button');

    bookingSubmit.on('click', function() {
      var bookingData = {
        arrivalDate: {
          day: +arrivalDate[1],
          month: +arrivalDate[0],
          year: +arrivalDate[2]
        },
        departureDate: {
          day: +departureDate[1],
          month: +departureDate[0],
          year: +departureDate[2]
        },
        guests: {
          adults: adults,
          children: children
        }
      }

      $('#datepicker-popup input[name="arival-date"]').val(arrivalDate[1] + '/' + arrivalDate[0] + '/' + arrivalDate[2]);
      $('#datepicker-popup input[name="departure-date"]').val(departureDate[1] + '/' + departureDate[0] + '/' + departureDate[2]);
      $('#datepicker-popup input[name="adults"]').val(adults);
      $('#datepicker-popup input[name="children"]').val(children);
      $('#datepicker-popup form').on('submit', function(event) {
        event.preventDefault();
        console.log(this.elements['arival-date'].value);
      })
    })
  }
  // end datepicker hotel

  // timetable page
  var timetablePage = document.getElementById('timetable');

  if (timetablePage) {
    // table inner
    var training = {
      "Пилатес": {
        id: 0,
        days: [[14], [11, 14]],
        color: '#ef336a',
        onHoverText: 'Пилатес'
      },
      "Йога": {
        id: 1,
        days: [[14], [11, 17, 20]],
        color: '#fffb79',
        onHoverText: 'Йога'
      },
      "Тайбо": {
        id: 2,
        days: [null, [11, 17, 20]],
        color: '#a4dfd9',
        onHoverText: 'Тайбо'
      }
    }

    var allTrainingsBlock = $('.all-trainings'),
    styles = '<style>\n',
    td = $('#timetable-table tr:not(:first-of-type) td:not(:first-of-type)');

    for (var key in training) {
      var id = training[key].id,
      color = training[key].color,
      days = training[key].days;

      allTrainingsBlock.append($('<div class="col"> \n\
          <a href="#" id="training-' + id + '"><span>' + key + '</span></a> \n\
        </div>'));

      styles += '.training-' + id + '.active {\n\
          background-color: ' + color + '!important;\n\
        }\n\
        .training-' + id + ':after {\n\
          content: "' + training[key].onHoverText + '";\n\
        }\n\
        #training-' + id + ':before {\n\
          background-color: ' + color + ';\n\
        }'

      for (var i = 0; i < days.length; i++)
        if (days[i]) 
          for (var j = 0; j < days[i].length; j++) {
            td.eq((days[i][j] - 9) * 7 + i).append($('<a href="#" class="training-' + id + '"></a>'))
          }

      $('#training-' + id).on('click', function(event) {
        event.preventDefault();

        $('[id^="training"]').removeClass('active');
        $(this).addClass('active');

        $('[class^="training"]').removeClass('active');
        $('.' + $(this).attr('id')).addClass('active');
      })
    }

    styles += '</style>'

    $('head').append($(styles));
    $('[class^="training"]').addClass('active');
    // end table inner

    // datepicker
    var days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
    dayBlock =  $('.current-date .day'),
    dateBlock = $('.current-date .date'),
    dateSelected = new Date();

    dayBlock.text(days[dateSelected.getDay() - 1]);
    dateBlock.text(dateSelected.getDate());

    $('#timetable-datepicker').datepicker({
      firstDay: 1,
      onSelect: function(dateText, inst) {
        dateSelected = $(this).datepicker("getDate");

        var day = days[dateSelected.getDay() - 1],
        date = dateSelected.getDate();

        dayBlock.text(day);
        dateBlock.text(date);

        td.removeClass('active');
        $('[class^="training"]').removeClass('active');
        $('#timetable-table td:nth-of-type(' + (dateSelected.getDay() + 1) + ')').addClass('active').children().addClass('active');
        $('#timetable-table th').removeClass('active');
        $('#timetable-table th:nth-of-type(' + (dateSelected.getDay() + 1) + ')').addClass('active');
      }
    });

    $('.datepicker-wrapper .prev').on('click', function() {
      $('.ui-datepicker-prev.ui-corner-all').trigger('click');
    });

    $('.datepicker-wrapper .next').on('click', function() {
      $('.ui-datepicker-next.ui-corner-all').trigger('click');
    });
    // end datepicker

    // timeline
    var timeTd = $('td.time'),
    timeLine = $('.timeline');

    function reloadTimeLine() {
      var dateNow = new Date(),
      hours = dateNow.getHours(),
      minutes = dateNow.getMinutes();
      
      if (hours > 9 && hours < 22) {
        currentBlock = timeTd.eq(hours - 9);

        timeLine.css({top: (currentBlock.position().top + currentBlock.outerHeight(true) / 60 * minutes) + 'px'});
      } else timeLine.css({top: '52px'})
    }

    reloadTimeLine();
    setInterval(reloadTimeLine, 60000);
    // end timeline
  }
  // end timetable page	

  // scale-slider
  var scaleSlider = $('.scale-slider');

  if (scaleSlider.length) {
    var slides = $('.scale-slider-slide', scaleSlider),
    slideTrack =$('.scale-slider-track', scaleSlider),
    maxHeight = 0,
    arrowPrev = $('.arrow-left', scaleSlider),
    arrowNext = $('.arrow-right', scaleSlider),
    slideWidth = slides.eq(0).outerWidth(),
    trackPosition = 0;
    minLeftTrack = 0;
    maxLeftTrack = -(slides.length - 1) * slideWidth,
    activeSlide = 2;


    $.each(slides, function(i, item) {
      maxHeight = $(item).outerHeight() > maxHeight ? $(item).outerHeight() : maxHeight;
    })

    slides.height(maxHeight);
    $('img', slides).css({height: '100%'});
    slides.eq(1).addClass('active');

    slideTrack.append(slides.eq(0).clone());
    slideTrack.prepend(slides.eq(slides.length - 1).clone());
    
    trackPosition -= slideWidth
    slideTrack.css({left: trackPosition + 'px'});
    slides = $('.scale-slider-slide', scaleSlider);

    arrowPrev.on('click', function() {
      if (trackPosition < minLeftTrack - 10) {
        trackPosition += slideWidth
        slideTrack.animate({left: trackPosition + 'px'}, 300);
        slides.removeClass('active');
        activeSlide--;
        slides.eq(activeSlide).addClass('active');
      }
    })

    arrowNext.on('click', function() {
      if (trackPosition > maxLeftTrack + 10) {
        trackPosition -= slideWidth
        slideTrack.stop().animate({left: trackPosition + 'px'}, 300);
        slides.removeClass('active');
        activeSlide++;
        slides.eq(activeSlide).addClass('active');
      }
    })
  }
  // end scale-slider
});

$(window).on('orientationchange', function() {
	location.reload();
})