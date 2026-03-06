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
    
    // Shake effect
    shake(element) {
        $(element).addClass('shake');
        setTimeout(() => {
            $(element).removeClass('shake');
        }, 500);
    },

    // Show loading skeleton inside a container
    showLoading(container) {
        const skeleton = Array(3).fill(
            '<div style="flex:1;height:300px;background:#f0f0f0;border-radius:8px;"></div>'
        ).join('');
        $(container).html(`<div style="display:flex;gap:1rem;padding:1rem;">${skeleton}</div>`);
    },

    // Stagger animation class onto a set of elements
    staggerAnimation(selector, animationClass, delay = 100) {
        $(selector).each(function(index) {
            setTimeout(() => {
                $(this).addClass(animationClass);
            }, index * delay);
        });
    },

    // Pulsate effect
    pulsate(element) {
        $(element).addClass('pulsate');
        setTimeout(() => {
            $(element).removeClass('pulsate');
        }, 600);
    }
};

// Initialize animations on document ready
$(document).ready(function() {
    Animations.init();
});
