// Utility Functions

const Utils = {
    // Debounce function
    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Format number
    formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    },
    
    // Truncate text
    truncateText(text, maxLength, suffix = '...') {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + suffix;
    },
    
    // Generate random ID
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    // Get viewport dimensions
    getViewport() {
        return {
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        };
    },
    
    // Check if element is in viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
        );
    },
    
    // Smooth scroll to element
    scrollToElement(selector, offset = 0) {
        const element = $(selector);
        if (element.length) {
            $('html, body').animate({
                scrollTop: element.offset().top - offset
            }, CONFIG.app.animationDuration);
        }
    },
    
    // Local Storage helpers
    storage: {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },
        
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error writing to localStorage:', error);
                return false;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        },
        
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return false;
            }
        }
    },
    
    // Show toast notification
    showToast(message, type = 'info', duration = 3000) {
        const toast = $(`
            <div class="toast toast-${type} toast-enter">
                <div class="toast-content">
                    <i class="fas fa-${this.getToastIcon(type)}"></i>
                    <span>${message}</span>
                </div>
            </div>
        `);
        
        // Add toast styles if not exists
        if ($('#toast-container').length === 0) {
            $('body').append('<div id="toast-container"></div>');
            this.addToastStyles();
        }
        
        $('#toast-container').append(toast);
        
        setTimeout(() => {
            toast.addClass('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    // Get toast icon based on type
    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    },
    
    // Add toast styles dynamically
    addToastStyles() {
        if ($('#toast-styles').length === 0) {
            $('head').append(`
                <style id="toast-styles">
                    #toast-container {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 9999;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .toast {
                        background: white;
                        padding: 1rem 1.5rem;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        min-width: 250px;
                        max-width: 400px;
                    }
                    .toast-content {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    .toast-content i {
                        font-size: 1.25rem;
                    }
                    .toast-success { border-left: 4px solid #27AE60; }
                    .toast-success i { color: #27AE60; }
                    .toast-error { border-left: 4px solid #E74C3C; }
                    .toast-error i { color: #E74C3C; }
                    .toast-warning { border-left: 4px solid #F39C12; }
                    .toast-warning i { color: #F39C12; }
                    .toast-info { border-left: 4px solid #3498DB; }
                    .toast-info i { color: #3498DB; }
                </style>
            `);
        }
    },
    
    // Animate counter
    animateCounter(element, target, duration = 2000) {
        const $element = $(element);
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                $element.text(Math.floor(target));
                clearInterval(timer);
            } else {
                $element.text(Math.floor(current));
            }
        }, 16);
    },
    
    // Generate star rating HTML
    generateStars(rating, maxStars = 5) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    },
    
    // Shuffle array
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    // Get random items from array
    getRandomItems(array, count) {
        const shuffled = this.shuffleArray(array);
        return shuffled.slice(0, count);
    },
    
    // Validate email
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    // Get URL parameters
    getUrlParams() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    },
    
    // Set URL parameter
    setUrlParam(key, value) {
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    }
};
