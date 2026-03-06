// API Service

const API = {
    // Initialize API service
    init() {
        this.baseUrl = CONFIG.api.baseUrl;
        this.endpoints = CONFIG.api.endpoints;
    },
    
    // Generic fetch wrapper
    async fetch(endpoint, options = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('API Fetch Error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Get all products
    async getProducts(limit = null) {
        const endpoint = limit 
            ? `${this.endpoints.products}?limit=${limit}`
            : this.endpoints.products;
        
        const result = await this.fetch(endpoint);
        
        if (!result.success && CONFIG.api.useMockData) {
            return { success: true, data: this.getMockProducts() };
        }
        
        // Transform API data to match our furniture structure
        if (result.success) {
            result.data = this.transformProductData(result.data);
        }
        
        return result;
    },
    
    // Get product by ID
    async getProduct(id) {
        const endpoint = `${this.endpoints.products}/${id}`;
        const result = await this.fetch(endpoint);
        
        if (result.success) {
            result.data = this.transformProductData([result.data])[0];
        }
        
        return result;
    },
    
    // Get categories
    async getCategories() {
        const result = await this.fetch(this.endpoints.categories);
        
        if (!result.success && CONFIG.api.useMockData) {
            return { success: true, data: CONFIG.mockCategories };
        }
        
        // Transform categories to match furniture categories
        if (result.success) {
            result.data = this.transformCategoryData(result.data);
        }
        
        return result;
    },
    
    // Get products by category
    async getProductsByCategory(category, limit = null) {
        const endpoint = limit
            ? `${this.endpoints.productsByCategory}/${category}?limit=${limit}`
            : `${this.endpoints.productsByCategory}/${category}`;
        
        const result = await this.fetch(endpoint);
        
        if (result.success) {
            result.data = this.transformProductData(result.data);
        }
        
        return result;
    },
    
    // Transform product data from API to our format
    transformProductData(products) {
        return products.map((product, index) => ({
            id: product.id,
            name: product.title,
            category: this.mapCategoryToFurniture(product.category),
            price: product.price,
            oldPrice: product.price * 1.3, // Add some variation
            image: product.image,
            rating: product.rating?.rate || 4.5,
            reviews: product.rating?.count || Math.floor(Math.random() * 200) + 10,
            badge: index % 3 === 0 ? 'Sale' : (index % 5 === 0 ? 'New' : null),
            description: product.description
        }));
    },
    
    // Transform category data
    transformCategoryData(categories) {
        return categories.map((cat, index) => {
            const furnitureCategory = this.mapCategoryToFurniture(cat);
            const mockCat = CONFIG.mockCategories.find(m => m.slug === furnitureCategory);
            
            return {
                id: index + 1,
                name: mockCat?.name || cat.charAt(0).toUpperCase() + cat.slice(1),
                slug: furnitureCategory,
                icon: mockCat?.icon || 'fa-couch',
                count: Math.floor(Math.random() * 50) + 10
            };
        });
    },
    
    // Map API categories to furniture categories
    mapCategoryToFurniture(apiCategory) {
        const categoryMap = {
            "electronics": "office",
            "jewelery": "living-room",
            "men's clothing": "bedroom",
            "women's clothing": "bedroom"
        };
        
        return categoryMap[apiCategory] || "living-room";
    },
    
    // Get mock products (fallback)
    getMockProducts() {
        return CONFIG.mockProducts.map(product => ({
            ...product,
            image: null // Placeholder for image
        }));
    },
    
    // Search products
    async searchProducts(query) {
        const result = await this.getProducts();
        
        if (result.success && query) {
            const lowerQuery = query.toLowerCase();
            result.data = result.data.filter(product => 
                product.name.toLowerCase().includes(lowerQuery) ||
                product.description.toLowerCase().includes(lowerQuery) ||
                product.category.toLowerCase().includes(lowerQuery)
            );
        }
        
        return result;
    }
};

// Initialize API service
$(document).ready(function() {
    API.init();
});
