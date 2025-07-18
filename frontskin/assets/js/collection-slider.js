(function($) {
    "use strict";

    $(document).ready(function() {
        // Collection category slider functionality
        $('.collection-category-slider').each(function() {
            const slider = $(this);
            const categories = slider.find('.collection-category');
            
            // Initialize - make first category active
            categories.first().addClass('active');
            
            // Click event for categories
            categories.on('click', function() {
                const category = $(this);
                const index = category.index();
                
                // Skip if already active
                if (category.hasClass('active')) return;
                
                // Update active class
                categories.removeClass('active');
                category.addClass('active');
                
                // Add slide animation
                categories.removeClass('slide-in');
                category.addClass('slide-in');
                
                // If slider is connected to a slider, update it too
                if (window.jQuery && window.jQuery('.slider-active').slick) {
                    window.jQuery('.slider-active').slick('slickGoTo', index);
                }
                
                // If we have horizontal items, update them too (for backward compatibility)
                $('.horizontal-item').removeClass('active');
                $('.horizontal-item[data-index="' + index + '"]').addClass('active');
                
                // Update any underline indicator
                var underline = document.querySelector('.slider-nav-underline');
                if (underline) {
                    underline.style.width = '25%';
                    underline.style.transform = 'translateX(' + (index * 25) + '%)';
                }
                
                // Reset auto rotation timer when manually clicked
                clearInterval(categoryInterval);
                startCategoryInterval();
            });
            
            // Auto rotation for categories
            let categoryInterval;
            
            function startCategoryInterval() {
                categoryInterval = setInterval(function() {
                    const activeCategory = slider.find('.collection-category.active');
                    const nextCategory = activeCategory.next('.collection-category').length ? 
                        activeCategory.next('.collection-category') : 
                        categories.first();
                    
                    nextCategory.trigger('click');
                }, 5000); // 5 seconds interval to match typical slick slider timing
            }
            
            // Start auto rotation
            startCategoryInterval();
            
            // Pause auto rotation on hover
            slider.hover(
                function() {
                    clearInterval(categoryInterval);
                },
                function() {
                    startCategoryInterval();
                }
            );
        });
        
        // Listen for slick slider events to keep collection-category-slider in sync
        if (window.jQuery && window.jQuery('.slider-active').length) {
            window.jQuery('.slider-active').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                // Find the corresponding collection category and activate it
                $('.collection-category').removeClass('active slide-in');
                $('.collection-category').eq(nextSlide).addClass('active slide-in');
            });
            
            // Get slick slider settings to match timings
            var slickSettings = {};
            if (window.jQuery('.slider-active')[0] && window.jQuery('.slider-active')[0].slick) {
                slickSettings = window.jQuery('.slider-active')[0].slick.options || {};
                
                // If we have a different autoplaySpeed, use it for our category slider
                if (slickSettings.autoplay && slickSettings.autoplaySpeed) {
                    // Clear existing intervals
                    clearInterval(window.categorySliderInterval);
                    
                    // Create new global interval with matched timing
                    window.categorySliderInterval = setInterval(function() {
                        const activeCategory = $('.collection-category-slider .collection-category.active');
                        const allCategories = $('.collection-category-slider .collection-category');
                        const nextCategory = activeCategory.next('.collection-category').length ? 
                            activeCategory.next('.collection-category') : 
                            allCategories.first();
                        
                        // Only trigger click if not already animating
                        if (!nextCategory.hasClass('slide-in')) {
                            nextCategory.trigger('click');
                        }
                    }, slickSettings.autoplaySpeed);
                }
            }
        }
    });
    
})(jQuery); 