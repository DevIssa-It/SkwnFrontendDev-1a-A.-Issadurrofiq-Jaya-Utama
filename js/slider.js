// Slider/Carousel Functionality

const Slider = {
    currentSlide: 0,
    totalSlides: 0,
    autoplayInterval: null,
    
    // Initialize slider
    init() {
        this.setupHeroSlider();
        this.setupTestimonialsSlider();
    },
    
    // Setup hero slider
    setupHeroSlider() {
        const $slides = $('.hero-slide');
        this.totalSlides = $slides.length;
        
        if (this.totalSlides <= 1) return;
        
        // Create navigation dots
        this.createHeroDots();
        
        // Setup autoplay
        if (CONFIG.app.carouselAutoplayInterval > 0) {
            this.startAutoplay();
        }
        
        // Pause on hover
        $('.hero').hover(
            () => this.stopAutoplay(),
            () => this.startAutoplay()
        );
    },
    
    // Create hero navigation dots
    createHeroDots() {
        const dotsHTML = Array.from({ length: this.totalSlides }, (_, i) => 
            `<span class="hero-dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></span>`
        ).join('');
        
        $('<div class="hero-dots"></div>').html(dotsHTML).appendTo('.hero');
        
        // Add dots styles
        this.addDotsStyles();
        
        // Setup dot click handlers
        $('.hero-dot').on('click', function() {
            const slideIndex = $(this).data('slide');
            Slider.goToSlide(slideIndex);
        });
    },
    
    // Add dots styles
    addDotsStyles() {
        if ($('#slider-dots-styles').length === 0) {
            $('head').append(`
                <style id="slider-dots-styles">
                    .hero-dots {
                        position: absolute;
                        bottom: 30px;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        gap: 10px;
                        z-index: 10;
                    }
                    .hero-dot {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.5);
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .hero-dot.active {
                        background: var(--primary-color);
                        width: 30px;
                        border-radius: 6px;
                    }
                </style>
            `);
        }
    },
    
    // Go to specific slide
    goToSlide(index) {
        const $slides = $('.hero-slide');
        
        $slides.removeClass('active');
        $slides.eq(index).addClass('active');
        
        $('.hero-dot').removeClass('active');
        $('.hero-dot').eq(index).addClass('active');
        
        this.currentSlide = index;
    },
    
    // Next slide
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    },
    
    // Previous slide
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    },
    
    // Start autoplay
    startAutoplay() {
        if (this.totalSlides <= 1) return;
        
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, CONFIG.app.carouselAutoplayInterval);
    },
    
    // Stop autoplay
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    },
    
    // Setup testimonials slider
    setupTestimonialsSlider() {
        let currentIndex = 0;
        const $testimonials = $('.testimonial-card');
        const totalTestimonials = $testimonials.length;
        
        if (totalTestimonials <= 1) {
            $('.slider-controls').hide();
            return;
        }
        
        // Show only 3 testimonials on desktop, 1 on mobile
        const updateVisibility = () => {
            const isMobile = $(window).width() < 992;
            const visibleCount = isMobile ? 1 : 3;
            
            $testimonials.hide();
            
            for (let i = 0; i < visibleCount; i++) {
                const index = (currentIndex + i) % totalTestimonials;
                $testimonials.eq(index).show().addClass('fade-in');
            }
        };
        
        updateVisibility();
        
        // Next button
        $('.slider-controls .next-btn').on('click', () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            updateVisibility();
        });
        
        // Previous button
        $('.slider-controls .prev-btn').on('click', () => {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            updateVisibility();
        });
        
        // Update on window resize
        $(window).on('resize', Utils.debounce(updateVisibility, 300));
    }
};

// Initialize slider on document ready
$(document).ready(function() {
    Slider.init();
});
