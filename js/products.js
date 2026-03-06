// Products Functionality

const Products = {
    allProducts: [],
    displayedProducts: [],
    currentFilter: 'all',
    productsPerPage: CONFIG.app.itemsPerPage,
    
    // Initialize products
    async init() {
        // Only run on pages that have the products grid
        if ($('#productsGrid').length === 0) return;
        this.setupFilters();
        await this.loadProducts();
        await this.loadCategories();
        this.setupLoadMore();
    },
    
    // Load products from API
    async loadProducts() {
        Animations.showLoading('#productsGrid');
        
        const result = await API.getProducts(20);
        
        if (result.success) {
            this.allProducts = result.data;
            this.displayedProducts = this.allProducts.slice(0, this.productsPerPage);
            this.renderProducts();
        } else {
            $('#productsGrid').html(`
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Failed to load products. Please try again later.</p>
                </div>
            `);
        }
    },
    
    // Load categories from API
    async loadCategories() {
        Animations.showLoading('#categoriesGrid');
        
        // Use mock categories for better furniture representation
        const categories = CONFIG.mockCategories;
        this.renderCategories(categories);
    },
    
    // Render products
    renderProducts(products = this.displayedProducts) {
        const $grid = $('#productsGrid');
        
        if (products.length === 0) {
            $grid.html(`
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <p>No products found</p>
                </div>
            `);
            return;
        }
        
        const productsHTML = products.map(product => this.createProductCard(product)).join('');
        $grid.html(productsHTML);
        
        // Add stagger animation
        Animations.staggerAnimation('.product-card', 'fade-in-up', 50);
        
        // Setup product interactions
        this.setupProductInteractions();
    },
    
    // Create product card HTML
    createProductCard(product) {
        const stars = Utils.generateStars(product.rating);
        const hasDiscount = product.oldPrice && product.oldPrice > product.price;
        const discount = hasDiscount 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;
        
        return `
            <div class="product-card" data-category="${product.category}" data-id="${product.id}">
                <div class="product-image">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <div class="product-actions">
                        <button class="product-action-btn wishlist-btn" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="product-action-btn quick-view-btn" data-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    ${product.image 
                        ? `<img src="${product.image}" alt="${product.name}">`
                        : `<div class="product-placeholder"><i class="fas fa-couch"></i></div>`
                    }
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category.replace('-', ' ')}</span>
                    <h3 class="product-name">${Utils.truncateText(product.name, 50)}</h3>
                    <div class="product-rating">
                        <div class="product-stars">${stars}</div>
                        <span class="product-reviews">(${product.reviews})</span>
                    </div>
                    <div class="product-footer">
                        <div class="product-pricing">
                            <span class="product-price">${Utils.formatCurrency(product.price)}</span>
                            ${hasDiscount 
                                ? `<span class="product-old-price">${Utils.formatCurrency(product.oldPrice)}</span>`
                                : ''
                            }
                        </div>
                        <button class="add-to-cart-btn" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Render categories
    renderCategories(categories) {
        const $grid = $('#categoriesGrid');
        
        const categoriesHTML = categories.map(category => `
            <div class="category-card" data-category="${category.slug}">
                <div class="category-placeholder">
                    <i class="fas ${category.icon}"></i>
                </div>
                <div class="category-content">
                    <h3>${category.name}</h3>
                    <p>${category.count} Products</p>
                </div>
            </div>
        `).join('');
        
        $grid.html(categoriesHTML);
        
        // Add click handler
        $('.category-card').on('click', function() {
            const category = $(this).data('category');
            Products.filterByCategory(category);
            Utils.scrollToElement('#products', 100);
        });
    },
    
    // Setup filter buttons
    setupFilters() {
        $('.filter-btn').on('click', function() {
            const filter = $(this).data('filter');
            
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            
            Products.filterProducts(filter);
        });
    },
    
    // Filter products
    filterProducts(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.displayedProducts = this.allProducts.slice(0, this.productsPerPage);
        } else {
            const filtered = this.allProducts.filter(p => p.category === filter);
            this.displayedProducts = filtered.slice(0, this.productsPerPage);
        }
        
        this.renderProducts();
        this.updateLoadMoreButton();
    },
    
    // Filter by category
    filterByCategory(category) {
        // Update filter button
        $('.filter-btn').removeClass('active');
        $(`.filter-btn[data-filter="${category}"]`).addClass('active');
        
        // If no matching button, set to custom category
        if ($(`.filter-btn[data-filter="${category}"]`).length === 0) {
            $('.filter-btn[data-filter="all"]').addClass('active');
        }
        
        this.filterProducts(category);
    },
    
    // Setup load more functionality
    setupLoadMore() {
        $('#loadMoreBtn').on('click', () => {
            this.loadMore();
        });
    },
    
    // Load more products
    loadMore() {
        const currentLength = this.displayedProducts.length;
        const filtered = this.currentFilter === 'all'
            ? this.allProducts
            : this.allProducts.filter(p => p.category === this.currentFilter);
        
        const nextProducts = filtered.slice(
            currentLength,
            currentLength + CONFIG.app.loadMoreIncrement
        );
        
        this.displayedProducts = [...this.displayedProducts, ...nextProducts];
        this.renderProducts();
        this.updateLoadMoreButton();
    },
    
    // Update load more button visibility
    updateLoadMoreButton() {
        const $btn = $('#loadMoreBtn');
        const filtered = this.currentFilter === 'all'
            ? this.allProducts
            : this.allProducts.filter(p => p.category === this.currentFilter);
        
        if (this.displayedProducts.length >= filtered.length) {
            $btn.hide();
        } else {
            $btn.show();
        }
    },
    
    // Setup product interactions
    setupProductInteractions() {
        // Add to cart
        $('.add-to-cart-btn').off('click').on('click', function(e) {
            e.stopPropagation();
            const productId = $(this).data('id');
            const product = Products.allProducts.find(p => p.id === productId);
            if (product) {
                Cart.addItem(product);
                Utils.showToast('Product added to cart!', 'success');
                Animations.pulsate(this);
            }
        });
        
        // Wishlist
        $('.wishlist-btn').off('click').on('click', function(e) {
            e.stopPropagation();
            const $icon = $(this).find('i');
            $icon.toggleClass('far fas');
            
            if ($icon.hasClass('fas')) {
                Utils.showToast('Added to wishlist!', 'success');
            } else {
                Utils.showToast('Removed from wishlist', 'info');
            }
        });
        
        // Quick view
        $('.quick-view-btn').off('click').on('click', function(e) {
            e.stopPropagation();
            const productId = $(this).data('id');
            Products.showQuickView(productId);
        });
    },
    
    // Show quick view modal
    showQuickView(productId) {
        const product = this.allProducts.find(p => p.id === productId);
        if (!product) return;
        
        Utils.showToast('Quick view feature coming soon!', 'info');
    }
};

// Initialize products on document ready
$(document).ready(function() {
    Products.init();
});
