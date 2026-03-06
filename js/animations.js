// Animation Handlers

const Animations = {
    // Initialize animations
    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupParallax();
        this.setupHoverEffects();
    },
    
    // Setup scroll-triggered animations
    setupScrollAnimations() {
        if (!CONFIG.features.enableAnimations) return;
        
        // Create intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements with animate-on-scroll class
        $('.animate-on-scroll').each(function() {
            observer.observe(this);
        });
        
        // Add animate-on-scroll to section elements
        $('section').each(function() {
            if (!$(this).hasClass('hero')) {
                $(this).addClass('section-enter');
            }
        });
        
        // Section animation observer
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('active');
                }
            });
        }, observerOptions);
        
        $('.section-enter').each(function() {
            sectionObserver.observe(this);
        });
    },
    
    // Setup counter animations
    setupCounterAnimations() {
        const counters = $('.stat-number[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !$(entry.target).hasClass('counted')) {
                    $(entry.target).addClass('counted');
                    const target = parseInt($(entry.target).data('count'));
                    Utils.animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.each(function() {
            counterObserver.observe(this);
        });
    },
    
    // Setup parallax effect
    setupParallax() {
        if (!CONFIG.features.enableParallax) return;
        
        $(window).on('scroll', Utils.throttle(() => {
            // Disable parallax on mobile/tablet to prevent layout issues
            if (window.innerWidth <= 991) {
                $('.hero-image').css({ transform: '' });
                return;
            }

            const scrolled = $(window).scrollTop();
            
            // Parallax for hero section
            $('.hero-image').css({
                transform: `translateY(${scrolled * 0.5}px)`
            });
            
            // Parallax for other elements
            $('.parallax').each(function() {
                const speed = $(this).data('speed') || 0.5;
                const offset = scrolled * speed;
                $(this).css({
                    transform: `translateY(${offset}px)`
                });
            });
        }, 16));
    },
    
    // Setup hover effects
    setupHoverEffects() {
        // Add ripple effect to buttons
        $('.btn, .product-card, .category-card').on('mouseenter', function(e) {
            if ($(this).find('.ripple-effect').length === 0) {
                $(this).append('<span class="ripple-effect"></span>');
            }
        });
        
        // Product card tilt effect
        $('.product-card').on('mousemove', function(e) {
            const card = $(this);
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.css({
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
            });
        });
        
        $('.product-card').on('mouseleave', function() {
            $(this).css({
                transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
            });
        });
    },
    
    // Fade in element
    fadeIn(element, duration = 300) {
        $(element).fadeIn(duration);
    },
    
    // Fade out element
    fadeOut(element, duration = 300) {
        $(element).fadeOut(duration);
    },
    
    // Slide down element
    slideDown(element, duration = 300) {
        $(element).slideDown(duration);
    },
    
    // Slide up element
    slideUp(element, duration = 300) {
        $(element).slideUp(duration);
    },
    
    // Animate element with custom properties
    animate(element, properties, duration = 300, easing = 'swing', callback = null) {
        $(element).animate(properties, duration, easing, callback);
    },
    
    // Show modal with animation
    showModal(modalSelector) {
        const $modal = $(modalSelector);
        const $overlay = $('#overlay');
        
        $overlay.addClass('active');
        $modal.addClass('active');
        $('body').css('overflow', 'hidden');
    },
    
    // Hide modal with animation
    hideModal(modalSelector) {
        const $modal = $(modalSelector);
        const $overlay = $('#overlay');
        
        $overlay.removeClass('active');
        $modal.removeClass('active');
        $('body').css('overflow', '');
    },
    
    // Stagger animation for multiple elements
    staggerAnimation(elements, animationClass, delay = 100) {
        $(elements).each(function(index) {
            const element = this;
            setTimeout(() => {
                $(element).addClass(animationClass);
            }, index * delay);
        });
    },
    
    // Loading animation
    showLoading(container) {
        $(container).html(`
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
        `);
    },
    
    // Hide loading
    hideLoading(container) {
        $(container).find('.loading-spinner').remove();
    },
    
    // Skeleton loading
    showSkeleton(container, type = 'card', count = 3) {
        let skeletonHTML = '';
        
        for (let i = 0; i < count; i++) {
            if (type === 'card') {
                skeletonHTML += `
                    <div class="skeleton skeleton-card"></div>
                `;
            } else if (type === 'text') {
                skeletonHTML += `
                    <div class="skeleton skeleton-text"></div>
                `;
            }
        }
        
        $(container).html(skeletonHTML);
    },
    
    // Pulsate effect
    pulsate(element, duration = 500) {
        $(element).addClass('pulse');
        setTimeout(() => {
            $(element).removeClass('pulse');
        }, duration);
    },
    
    // Shake effect
    shake(element) {
        $(element).addClass('shake');
        setTimeout(() => {
            $(element).removeClass('shake');
        }, 500);
    }
};

// Initialize animations on document ready
$(document).ready(function() {
    Animations.init();
});
