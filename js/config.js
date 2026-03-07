// Configuration File

const CONFIG = {
    // API Configuration
    api: {
        // MockAPI.io - schema matches our furniture data format exactly
        baseUrl: 'https://69ab28e1e051e9456fa3759f.mockapi.io/api/v1',
        endpoints: {
            products: '/products',
            categories: '/categories',
            productsByCategory: '/products'
        },
        // Fallback to mock data if API is unavailable
        useMockData: true
    },
    
    // Application Settings
    app: {
        name: 'FurniStyle',
        version: '1.0.0',
        debug: false, // Set to false in production
        itemsPerPage: 12,
        loadMoreIncrement: 6,
        animationDuration: 300,
        debounceDelay: 300,
        carouselAutoplayInterval: 5000
    },
    
    // Feature Flags
    features: {
        enableSearch: true,
        enableCart: true,
        enableWishlist: true,
        enableQuickView: true,
        enableAnimations: true,
        enableParallax: true
    },
    
    // UI Configuration
    ui: {
        themes: {
            light: 'light',
            dark: 'dark'
        },
        breakpoints: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400
        }
    },
    
    // Local Storage Keys
    storage: {
        cart: 'furnistyle_cart',
        wishlist: 'furnistyle_wishlist',
        theme: 'furnistyle_theme',
        currency: 'furnistyle_currency'
    },
    
    // Mock Data for furniture categories
    mockCategories: [
        {
            id: 1,
            name: 'Living Room',
            slug: 'living-room',
            icon: 'fa-couch',
            count: 45
        },
        {
            id: 2,
            name: 'Bedroom',
            slug: 'bedroom',
            icon: 'fa-bed',
            count: 38
        },
        {
            id: 3,
            name: 'Dining',
            slug: 'dining',
            icon: 'fa-utensils',
            count: 28
        },
        {
            id: 4,
            name: 'Office',
            slug: 'office',
            icon: 'fa-briefcase',
            count: 32
        },
        {
            id: 5,
            name: 'Outdoor',
            slug: 'outdoor',
            icon: 'fa-tree',
            count: 24
        },
        {
            id: 6,
            name: 'Storage',
            slug: 'storage',
            icon: 'fa-box',
            count: 19
        }
    ],
    
    // Mock furniture products (used as fallback)
    mockProducts: [
        {
            id: 1,
            name: 'Modern Sofa',
            category: 'living-room',
            price: 1299.99,
            oldPrice: 1599.99,
            image: null,
            rating: 4.5,
            reviews: 128,
            badge: 'Sale',
            description: 'Comfortable modern sofa with premium fabric'
        },
        {
            id: 2,
            name: 'King Bed Frame',
            category: 'bedroom',
            price: 899.99,
            oldPrice: null,
            image: null,
            rating: 4.8,
            reviews: 95,
            badge: 'New',
            description: 'Elegant king-size bed frame with storage'
        },
        {
            id: 3,
            name: 'Dining Table Set',
            category: 'dining',
            price: 1499.99,
            oldPrice: 1899.99,
            image: null,
            rating: 4.6,
            reviews: 74,
            badge: 'Sale',
            description: '6-seater dining table with chairs'
        },
        {
            id: 4,
            name: 'Office Desk',
            category: 'office',
            price: 599.99,
            oldPrice: null,
            image: null,
            rating: 4.7,
            reviews: 112,
            badge: null,
            description: 'Ergonomic office desk with cable management'
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
