(function($) {
    "use strict";

    $(document).ready(function() {
        console.log("Hero slider script loaded");
        
        // Initialize the hero slider with proper callbacks
        $('.slider-active').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000, // 5 seconds per slide
            dots: false, // Ensure dots are disabled
            arrows: false,
            fade: true,
            cssEase: 'linear',
            speed: 600,
            pauseOnHover: false,
            customPaging: function() {
                return '';
            },
            // Add callbacks to ensure navigation stays in sync
            onBeforeChange: function(slick, currentSlide, nextSlide) {
                updateActiveNavItem(nextSlide);
            },
            onAfterChange: function(slick, currentSlide) {
                updateActiveNavItem(currentSlide);
            }
        });
        
        console.log("Slider initialized");
        
        // Remove any existing dots that might be generated
        $('.slider__area .slick-dots').remove();
        
        // Use a MutationObserver to remove dots if they get added dynamically
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    $('.slider__area .slick-dots').remove();
                }
            });
        });
        
        // Start observing the slider area for changes
        if (document.querySelector('.slider__area')) {
        observer.observe(document.querySelector('.slider__area'), { 
            childList: true, 
            subtree: true 
        });
            console.log("Observer attached");
        }
        
        // Function to update active navigation item
        function updateActiveNavItem(index) {
            console.log("Updating active navigation item to:", index);
            
            // Remove active class from all items
            $('.horizontal-item').removeClass('active');
            
            // Add active class to the current item
            $('.horizontal-item[data-index="' + index + '"]').addClass('active');
        }
        
        // Handle horizontal thumbnail clicks
        $('.horizontal-item').on('click', function() {
            var slideIndex = parseInt($(this).data('index'), 10);
            console.log("Clicked on navigation item:", slideIndex);
            
            // Stop autoplay temporarily when user clicks
            $('.slider-active').slick('slickPause');
            
            // Go to the selected slide
            $('.slider-active').slick('slickGoTo', slideIndex);
            
            // Update active state manually
            updateActiveNavItem(slideIndex);
            
            // Restart autoplay after a short delay
            setTimeout(function() {
                $('.slider-active').slick('slickPlay');
            }, 3000);
        });
        
        // Update horizontal thumbnails on slide change - using multiple events for redundancy
        $('.slider-active').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            console.log("Slide changing from", currentSlide, "to", nextSlide);
            
            // Update active navigation item
            updateActiveNavItem(nextSlide);
        });
        
        // Additional event handler for afterChange to ensure synchronization
        $('.slider-active').on('afterChange', function(event, slick, currentSlide) {
            console.log("Slide changed to", currentSlide);
            
            // Update active navigation item
            updateActiveNavItem(currentSlide);
        });
        
        // Handle window resize
        $(window).on('resize', function() {
            // Get the current slide index and update navigation
            var currentIndex = $('.slider-active').slick('slickCurrentSlide') || 0;
            updateActiveNavItem(currentIndex);
        });
        
        // Initialize active state for first slide
        var initialSlide = $('.slider-active').slick('slickCurrentSlide') || 0;
        updateActiveNavItem(initialSlide);
        console.log("Initial slide set to:", initialSlide);
        
        // Force update when slider is fully loaded
        $(window).on('load', function() {
            var currentIndex = $('.slider-active').slick('slickCurrentSlide') || 0;
            updateActiveNavItem(currentIndex);
            console.log("Window loaded, current slide:", currentIndex);
            
            // Set up periodic check to ensure navigation stays in sync
            setInterval(function() {
                var currentSlide = $('.slider-active').slick('slickCurrentSlide') || 0;
                updateActiveNavItem(currentSlide);
            }, 1000);
        });
        
        // Force sync after a short delay to handle any initialization issues
        setTimeout(function() {
            var currentIndex = $('.slider-active').slick('slickCurrentSlide') || 0;
            updateActiveNavItem(currentIndex);
            console.log("Forced sync after delay, current slide:", currentIndex);
        }, 500);
    });
    
})(jQuery); 