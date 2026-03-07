// Main Application Entry Point

const App = {
    cachedProducts: [],

    // Initialize application
    init() {
        if (CONFIG.app.debug) {
            console.log(`${CONFIG.app.name} v${CONFIG.app.version} - Initializing...`);
        }
        
        try {
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
            
            if (CONFIG.app.debug) {
                console.log(`${CONFIG.app.name} - Initialization complete!`);
            }
        } catch (error) {
            console.error('Initialization error:', error);
            Utils.showToast('Failed to initialize application', 'error');
        }
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
            $('.category-item').removeClass('category-item-active');
            $(this).addClass('category-item-active');

            // Update preview images from cached API products
            const products = App.cachedProducts || [];
            if (products.length === 0) return;

            // Pick 3 products starting at offset based on which category was clicked
            const categoryIndex = $('.category-item').index(this);
            const $imgs = $('.categories-preview li img');
            $imgs.each(function(i) {
                const pick = products[(categoryIndex * 3 + i) % products.length];
                if (pick && pick.image) {
                    const $img = $(this);
                    $img.animate({ opacity: 0 }, 200, function() {
                        $img.attr('src', pick.image).animate({ opacity: 1 }, 300);
                    });
                }
            });
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
    
    // Setup product carousel functionality - loads data from MockAPI
    async setupProductCarousel() {
        const $productList = $('.product-list');
        const $prevBtn = $('#productPrev');
        const $nextBtn = $('#productNext');

        let currentIndex = 2;
        const gap = 32;

        // Show skeleton loading state while API call is in-flight
        $productList.html(
            Array(5).fill(`
                <li class="product-item">
                    <div class="product-image-preview" style="display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);">
                        <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--primary-color);opacity:0.5;"></i>
                    </div>
                </li>
            `).join('')
        );

        // Fetch products from MockAPI
        let products = [];
        try {
            const result = await API.getProducts(8);
            products = result.success ? result.data : [];
        } catch (error) {
            console.error('Failed to load products:', error);
        }

        // Cache products so other sections (e.g. category preview) can use them
        App.cachedProducts = products;

        if (products.length === 0) {
            $productList.html('<li style="color:white;padding:2rem;opacity:0.6;">Could not load products.</li>');
            return;
        }

        // Render carousel items from API data
        $productList.html(products.map((product, i) => {
            const safeName = Utils.escapeHTML(product.name);
            const safeImage = Utils.escapeHTML(product.image || 'assets/images/products/placeholder.svg');
            
            return `
            <li class="product-item${i === 2 ? ' active' : ''}">
                <div class="product-image-preview">
                    <img src="${safeImage}" alt="${safeName}" loading="lazy">
                    <div class="product-image-info">
                        <div class="product-price-tag">$${product.price.toFixed(2)}</div>
                        <h3 class="product-name">${safeName}</h3>
                    </div>
                </div>
            </li>
        `}).join(''));

        function getItemSizes() {
            const w = window.innerWidth;
            if (w <= 767) return { itemWidth: 200, activeWidth: 240 };
            if (w <= 991) return { itemWidth: 250, activeWidth: 280 };
            return { itemWidth: 300, activeWidth: 354 };
        }

        function updateCarousel() {
            const $items = $('.product-item');
            $items.removeClass('active');
            $items.eq(currentIndex).addClass('active');

            const { itemWidth } = getItemSizes();
            const isMobile = window.innerWidth <= 991;
            let translateX = 0;

            if (isMobile) {
                translateX = currentIndex * (itemWidth + gap);
            } else if (currentIndex === 0) {
                translateX = 0;
            } else if (currentIndex === 1) {
                translateX = itemWidth / 2;
            } else {
                translateX = itemWidth / 2;
                for (let i = currentIndex - 1; i > 0; i--) {
                    translateX += itemWidth + gap;
                }
            }

            $productList.css('transform', `translateX(-${translateX}px)`);
            $prevBtn.prop('disabled', currentIndex === 0);
            $nextBtn.prop('disabled', currentIndex === $('.product-item').length - 1);
        }

        $prevBtn.on('click', function() {
            if (currentIndex > 0) { currentIndex--; updateCarousel(); }
        });

        $nextBtn.on('click', function() {
            if (currentIndex < $('.product-item').length - 1) { currentIndex++; updateCarousel(); }
        });

        $productList.on('click', '.product-item', function() {
            currentIndex = $(this).index();
            updateCarousel();
        });

        updateCarousel();

        $(window).on('resize', Utils.debounce(() => { updateCarousel(); }, 300));
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
            const email = Utils.sanitizeHTML($input.val().trim());
            
            // Validate email
            if (!Utils.isValidEmail(email)) {
                Utils.showToast('Please enter a valid email address', 'error');
                Animations.shake($input);
                return;
            }
            
            // Check if already subscribed
            const subscriptions = Utils.storage.get('newsletter_subscriptions', []);
            if (subscriptions.some(sub => sub.email === email)) {
                Utils.showToast('This email is already subscribed', 'info');
                return;
            }
            
            // Simulate API call
            const $button = $form.find('button');
            const $buttonIcon = $button.find('i');
            
            $button.prop('disabled', true).addClass('loading');
            $buttonIcon.removeClass('fa-envelope').addClass('fa-spinner fa-spin');
            
            setTimeout(() => {
                Utils.showToast('Thank you for subscribing!', 'success');
                $input.val('');
                $button.prop('disabled', false).removeClass('loading');
                $buttonIcon.removeClass('fa-spinner fa-spin').addClass('fa-envelope');
                
                // Store subscription in localStorage
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
