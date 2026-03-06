// Main Application Entry Point

const App = {
    // Initialize application
    init() {
        console.log(`${CONFIG.app.name} v${CONFIG.app.version} - Initializing...`);
        
        // Initialize all modules
        this.initializeModules();
        
        // Setup global event listeners
        this.setupGlobalListeners();
        
        // Setup category toggle
        this.setupCategoryToggle();
        
        // Setup product carousel
        this.setupProductCarousel();
        
        // Setup newsletter form
        this.setupNewsletterForm();
        
        // Log initialization complete
        console.log(`${CONFIG.app.name} - Initialization complete!`);
    },
    
    // Initialize all modules
    initializeModules() {
        // Modules are initialized in their respective files
        // This is just a placeholder for any app-wide initialization
    },
    
    // Setup global event listeners
    setupGlobalListeners() {
        // Handle window resize
        $(window).on('resize', Utils.debounce(() => {
            this.handleResize();
        }, 300));
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                Slider.stopAutoplay();
            } else {
                Slider.startAutoplay();
            }
        });
        
        // Prevent default form submissions
        $('form').on('submit', function(e) {
            if (!$(this).hasClass('ajax-form')) {
                e.preventDefault();
            }
        });
    },
    
    // Setup category toggle functionality
    setupCategoryToggle() {
        // Category item click handler
        $('.category-item').on('click', function() {
            // Remove active class from all items
            $('.category-item').removeClass('category-item-active');
            
            // Add active class to clicked item
            $(this).addClass('category-item-active');
        });
        
        // Category preview hover effect
        const $previewItems = $('.categories-preview li');
        
        $previewItems.on('mouseenter', function() {
            const $hovered = $(this);
            
            // Remove all expanded/collapsed classes first
            $previewItems.removeClass('expanded collapsed');
            
            // Make hovered item expanded (472px)
            $hovered.addClass('expanded');
            
            // Make all other items collapsed (148px)
            $previewItems.not($hovered).addClass('collapsed');
        });
        
        $('.categories-preview ul').on('mouseleave', function() {
            // Reset to default state
            $previewItems.removeClass('expanded collapsed');
        });
    },
    
    // Setup product carousel functionality
    setupProductCarousel() {
        const $productList = $('.product-list');
        const $productItems = $('.product-item');
        const $prevBtn = $('#productPrev');
        const $nextBtn = $('#productNext');
        
        let currentIndex = 2; // Start with third item as active (index 2)
        const gap = 32; // var(--spacing-lg) = 2rem = 32px

        function getItemSizes() {
            const w = window.innerWidth;
            if (w <= 767) return { itemWidth: 200, activeWidth: 240 };
            if (w <= 991) return { itemWidth: 250, activeWidth: 280 };
            return { itemWidth: 300, activeWidth: 354 };
        }
        
        // Function to update carousel position and active item
        function updateCarousel() {
            // Update active class
            $productItems.removeClass('active');
            $productItems.eq(currentIndex).addClass('active');

            const { itemWidth } = getItemSizes();
            const isMobile = window.innerWidth <= 991;
            
            // Calculate transform to position the active item
            let translateX = 0;

            if (isMobile) {
                // Mobile: active item starts at left edge
                translateX = currentIndex * (itemWidth + gap);
            } else if (currentIndex === 0) {
                translateX = 0;
            } else if (currentIndex === 1) {
                translateX = itemWidth / 2;
            } else {
                // Desktop: show half of previous item to hint swiping
                translateX = itemWidth / 2;
                for (let i = currentIndex - 1; i > 0; i--) {
                    translateX += itemWidth + gap;
                }
            }
            
            // Apply negative transform to shift items left
            $productList.css('transform', `translateX(-${translateX}px)`);
            
            // Update button states
            $prevBtn.prop('disabled', currentIndex === 0);
            $nextBtn.prop('disabled', currentIndex === $productItems.length - 1);
        }
        
        // Previous button click
        $prevBtn.on('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        // Next button click
        $nextBtn.on('click', function() {
            if (currentIndex < $productItems.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Click on product item to make it active
        $productItems.on('click', function() {
            currentIndex = $(this).index();
            updateCarousel();
        });
        
        // Initialize carousel
        updateCarousel();
        
        // Update on window resize
        $(window).on('resize', Utils.debounce(() => {
            updateCarousel();
        }, 300));
    },
    
    // Handle window resize
    handleResize() {
        const viewport = Utils.getViewport();
        
        // Close mobile menu on desktop
        if (viewport.width >= 992) {
            $('#hamburger').removeClass('active');
            $('#navMenu').removeClass('active');
            $('#overlay').removeClass('active');
        }
    },
    
    // Handle window scroll events are handled by Navigation module
    
    // Setup newsletter form
    setupNewsletterForm() {
        $('#newsletterForm').on('submit', function(e) {
            e.preventDefault();
            
            const $form = $(this);
            const $input = $form.find('input[type="email"]');
            const email = $input.val().trim();
            
            // Validate email
            if (!Utils.isValidEmail(email)) {
                Utils.showToast('Please enter a valid email address', 'error');
                Animations.shake($input);
                return;
            }
            
            // Simulate API call
            const $button = $form.find('button');
            const originalText = $button.text();
            
            $button.prop('disabled', true).addClass('loading');
            $button.text('Subscribing...');
            
            setTimeout(() => {
                Utils.showToast('Thank you for subscribing!', 'success');
                $input.val('');
                $button.prop('disabled', false).removeClass('loading');
                $button.text(originalText);
                
                // Store subscription in localStorage
                const subscriptions = Utils.storage.get('newsletter_subscriptions', []);
                subscriptions.push({
                    email: email,
                    date: new Date().toISOString()
                });
                Utils.storage.set('newsletter_subscriptions', subscriptions);
            }, 1500);
        });
    },
    
    // Show loading overlay
    showLoading() {
        if ($('#app-loading').length === 0) {
            $('body').append(`
                <div id="app-loading">
                    <div class="loading-spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading...</p>
                    </div>
                </div>
            `);
            
            // Add loading styles
            $('head').append(`
                <style>
                    #app-loading {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(255, 255, 255, 0.95);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                    }
                    #app-loading .loading-spinner {
                        text-align: center;
                    }
                    #app-loading .loading-spinner i {
                        font-size: 3rem;
                        color: var(--primary-color);
                        margin-bottom: 1rem;
                    }
                </style>
            `);
        }
    },
    
    // Hide loading overlay
    hideLoading() {
        $('#app-loading').fadeOut(300, function() {
            $(this).remove();
        });
    }
};

// Initialize app when document is ready
$(document).ready(function() {
    App.init();
});

// Handle page load complete
$(window).on('load', function() {
    // Hide any initial loading indicators
    App.hideLoading();
    
    // Add loaded class to body
    $('body').addClass('loaded');
});

// Service Worker Registration (optional, for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
