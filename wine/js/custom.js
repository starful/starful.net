
// ISOTOPE FILTER
jQuery(document).ready(function($){

  if ( $('.iso-box-wrapper').length > 0 ) { 

      var $container  = $('.iso-box-wrapper'), 
        $imgs     = $('.iso-box img');

      $container.imagesLoaded(function () {

        $container.isotope({
        layoutMode: 'fitRows',
        itemSelector: '.iso-box'
        });

        $imgs.load(function(){
          $container.isotope('reLayout');
        })

      });

      //filter items on button click

      $('.filter-wrapper li a').click(function(){

          var $this = $(this), filterValue = $this.attr('data-filter');

      $container.isotope({ 
        filter: filterValue,
        animationOptions: { 
            duration: 750, 
            easing: 'linear', 
            queue: false, 
        }                
      });             

      // don't proceed if already selected 

      if ( $this.hasClass('selected') ) { 
        return false; 
      }

      var filter_wrapper = $this.closest('.filter-wrapper');
      filter_wrapper.find('.selected').removeClass('selected');
      $this.addClass('selected');

        return false;
      }); 

  }

});


// PRELOADER JS
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});

/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/
$(function(){

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: false
  });
  wow.init();


  // HIDE MOBILE MENU AFTER CLIKING ON A LINK
  $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });


  // NIVO LIGHTBOX
  $('.iso-box-section a').nivoLightbox({
        effect: 'fadeScale',
    });


  // HOME BACKGROUND SLIDESHOW
  $(function(){
    jQuery(document).ready(function() {
    $('#home').backstretch([
       "images/home-bg-slideshow1.jpg", 
       "images/home-bg-slideshow2.jpg",
       "images/home-bg-slideshow3.jpg",
       "images/home-bg-slideshow4.jpg",
       "images/home-bg-slideshow5.jpg",
       "images/home-bg-slideshow6.jpg",
        ],  {duration: 2000, fade: 750});


    $('#home_1').backstretch([
       "images/portfolio-img1.jpg", 
       "images/portfolio-img2.jpg",
       "images/portfolio-img3.jpg",       
        ],  {duration: 2000, fade: 750});

    });
  })

});

 ////////////////////////////////////////////////////////////////


jQuery(document).ready(function(){


    function check(){
        if(parseInt($('input[name=quantity]').val()) == 0){
            $('.qtyminus').prop("disabled", true);
        } else {
            $('.qtyminus').prop("disabled", false);
        }

        if(parseInt($('input[name=quantity]').val()) == 5){
            $('.qtyplus').prop("disabled", true);
        } else{
            $('.qtyplus').prop("disabled", false);
        }
    }

    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
        
        check();
    });


    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
        check();
    });
});

