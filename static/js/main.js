(function ($) {
	"use strict";

	 	// onePageNav
		$('.header-nav').onePageNav({
		    currentClass: 'active',
		    changeHash: false,
		    scrollSpeed: 500,
		    scrollThreshold: 1,
		    filter: '',
		    easing: 'swing',
		    begin: function() {
		        //I get fired when the animation is starting

	        	if($(window).width() < 801){
	        		$('.cssmenu ul').slideUp().removeClass('open');
	        	}
		           
		    }, 
		    end: function() { 
		         
		    },
		    scrollChange: function($currentListItem) {
		        //I get fired when you enter a section and I pass the list item of the section
 
		    }
		});
 
  	
 	 	// Sticky Header 
    	$(".sticky-on").sticky({topSpacing: 0});


     	// Mainmenu 
		$(".cssmenu").each(function(){
		      var title = ($(this).data('title'))? $(this).data('title') : "Menu";
		      $(this).menumaker({
		        title: title,
		        format: "multitoggle"
		    });
		})


		// screenshot Slider
		var swiper = new Swiper('.swiper-container', {
	      effect: 'coverflow',
	      loop: !0, 
	      mode:'horizontal',
	      grabCursor: true,
	      centeredSlides: !0,
	      parallax: !0,
	      grabCursor: true,
	      effect: 'coverflow',
	      slidesPerView: 'auto',
	      coverflowEffect: {
	        rotate:  -5, 
	        stretch: 0,
	        depth: 90,
	        modifier: 1,
	        slideShadows : !1,
	      },
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: !0
	      },
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	    });

}(jQuery));
