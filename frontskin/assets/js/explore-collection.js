(function($) {
    "use strict";

    $(document).ready(function() {
        // Tab functionality
        $('.explore-tabs .nav-link').on('click', function(e) {
            e.preventDefault();
            $(this).tab('show');
        });
        
        // Dot navigation
        $('.explore-dots .dot').on('click', function() {
            var dotIndex = $(this).index();
            var currentTab = $('.tab-pane.active');
            
            // Update active dot
            $('.explore-dots .dot').removeClass('active');
            $(this).addClass('active');
            
            // Implement pagination functionality here if needed
            // For now, just showing how the dots can be used
        });
        
        // Auto rotation for slides (if needed)
        var slideInterval;
        
        function startSlideInterval() {
            slideInterval = setInterval(function() {
                var activeDot = $('.explore-dots .dot.active');
                var nextDot = activeDot.next('.dot').length ? activeDot.next('.dot') : $('.explore-dots .dot:first');
                
                nextDot.trigger('click');
            }, 5000);
        }
        
        // Start auto rotation
        startSlideInterval();
        
        // Pause auto rotation on hover
        $('.explore-items').hover(
            function() {
                clearInterval(slideInterval);
            },
            function() {
                startSlideInterval();
            }
        );
    });
    
})(jQuery); 