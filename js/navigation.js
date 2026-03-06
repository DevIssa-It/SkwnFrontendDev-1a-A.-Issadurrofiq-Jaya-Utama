// Navigation Functionality

const Navigation = {
    // Initialize navigation
    init() {
        this.setupMobileMenu();
        this.setupStickyHeader();
        this.setupSmoothScroll();
        this.setupBackToTop();
        this.setupActiveLinks();
    },
    
    // Setup mobile menu toggle
    setupMobileMenu() {
        const $hamburger = $('#hamburger');
        const $navMenu = $('#navMenu');
        const $overlay = $('#overlay');
        
        // Toggle mobile menu
        $hamburger.on('click', () => {
            $hamburger.toggleClass('active');
            $navMenu.toggleClass('active');
            $overlay.toggleClass('active');
        });
        
        // Close menu when clicking overlay
        $overlay.on('click', () => {
            $hamburger.removeClass('active');
            $navMenu.removeClass('active');
            $overlay.removeClass('active');
            $('.cart-sidebar').removeClass('active');
            $('.search-modal').removeClass('active');
        });
        
        // Close menu when clicking nav link
        $('.nav-link').on('click', () => {
            if ($(window).width() < 992) {
                $hamburger.removeClass('active');
                $navMenu.removeClass('active');
                $overlay.removeClass('active');
            }
        });
    },
    
    // Setup sticky header on scroll
    setupStickyHeader() {
        const $header = $('#header');
        let lastScroll = 0;
        
        $(window).on('scroll', Utils.throttle(() => {
            const currentScroll = $(window).scrollTop();
            
            if (currentScroll > 100) {
                $header.addClass('scrolled');
            } else {
                $header.removeClass('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                $header.css('transform', 'translateY(-100%)');
            } else {
                $header.css('transform', 'translateY(0)');
            }
            
            lastScroll = currentScroll;
        }, 100));
    },
    
    // Setup smooth scroll for anchor links
    setupSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this).attr('href');
            
            if (target === '#' || target === '') return;
            
            e.preventDefault();
            
            const $target = $(target);
            if ($target.length) {
                const headerHeight = $('#header').outerHeight();
                const targetPosition = $target.offset().top - headerHeight;
                
                $('html, body').animate({
                    scrollTop: targetPosition
                }, 600, 'swing');
            }
        });
    },
    
    // Setup back to top button
    setupBackToTop() {
        const $backToTop = $('#backToTop');
        
        // Show/hide button based on scroll position
        $(window).on('scroll', Utils.throttle(() => {
            if ($(window).scrollTop() > 300) {
                $backToTop.addClass('visible');
            } else {
                $backToTop.removeClass('visible');
            }
        }, 100));
        
        // Scroll to top on click
        $backToTop.on('click', () => {
            $('html, body').animate({ scrollTop: 0 }, 600);
        });
    },
    
    // Setup active navigation links
    setupActiveLinks() {
        const sections = $('section[id]');
        
        $(window).on('scroll', Utils.throttle(() => {
            const scrollPosition = $(window).scrollTop() + 200;
            
            sections.each(function() {
                const $section = $(this);
                const sectionTop = $section.offset().top;
                const sectionHeight = $section.outerHeight();
                const sectionId = $section.attr('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    $('.nav-link').removeClass('active');
                    $(`.nav-link[href="#${sectionId}"]`).addClass('active');
                }
            });
        }, 100));
    }
};

// Initialize navigation on document ready
$(document).ready(function() {
    Navigation.init();
});
