// Search Functionality

const Search = {
    searchResults: [],
    
    // Initialize search
    init() {
        this.setupSearchModal();
        this.setupSearchInput();
    },
    
    // Setup search modal
    setupSearchModal() {
        // Open search modal
        $('#searchBtn').on('click', () => {
            this.openModal();
        });
        
        // Close search modal
        $('#searchClose').on('click', () => {
            this.closeModal();
        });
        
        // Close on overlay click
        $('#overlay').on('click', () => {
            this.closeModal();
        });
        
        // Close on escape key
        $(document).on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    },
    
    // Setup search input
    setupSearchInput() {
        const $searchInput = $('#searchInput');
        
        // Search on input with debounce
        $searchInput.on('input', Utils.debounce((e) => {
            const query = e.target.value.trim();
            this.performSearch(query);
        }, CONFIG.app.debounceDelay));
        
        // Search on form submit
        $searchInput.closest('form').on('submit', (e) => {
            e.preventDefault();
            const query = $searchInput.val().trim();
            this.performSearch(query);
        });
        
        // Focus input when modal opens
        $('#searchModal').on('transitionend', function() {
            if ($(this).hasClass('active')) {
                $searchInput.focus();
            }
        });
    },
    
    // Open search modal
    openModal() {
        $('#searchModal').addClass('active');
        $('#overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    },
    
    // Close search modal
    closeModal() {
        $('#searchModal').removeClass('active');
        $('#overlay').removeClass('active');
        $('body').css('overflow', '');
        $('#searchInput').val('');
        $('#searchResults').html('');
    },
    
    // Perform search
    async performSearch(query) {
        const $results = $('#searchResults');
        
        if (!query || query.length < 2) {
            $results.html('');
            return;
        }
        
        // Show loading
        $results.html(`
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Searching...</p>
            </div>
        `);
        
        // Perform API search
        const result = await API.searchProducts(query);
        
        if (result.success) {
            this.searchResults = result.data;
            this.displayResults();
        } else {
            $results.html(`
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Search failed. Please try again.</p>
                </div>
            `);
        }
    },
    
    // Display search results
    displayResults() {
        const $results = $('#searchResults');
        
        if (this.searchResults.length === 0) {
            $results.html(`
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>No products found matching your search.</p>
                </div>
            `);
            return;
        }
        
        const resultsHTML = `
            <div class="search-results-header">
                <h4>Found ${this.searchResults.length} results</h4>
            </div>
            <div class="search-results-list">
                ${this.searchResults.map(product => this.createResultItem(product)).join('')}
            </div>
        `;
        
        $results.html(resultsHTML);
        
        // Add result styles
        this.addResultStyles();
        
        // Setup result interactions
        this.setupResultInteractions();
    },
    
    // Create result item HTML
    createResultItem(product) {
        return `
            <div class="search-result-item" data-id="${product.id}">
                <div class="result-image">
                    ${product.image 
                        ? `<img src="${product.image}" alt="${product.name}">`
                        : `<div class="product-placeholder"><i class="fas fa-couch"></i></div>`
                    }
                </div>
                <div class="result-info">
                    <h5>${product.name}</h5>
                    <p class="result-category">${product.category.replace('-', ' ')}</p>
                    <div class="result-footer">
                        <span class="result-price">${Utils.formatCurrency(product.price)}</span>
                        <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Add result styles
    addResultStyles() {
        if ($('#search-result-styles').length === 0) {
            $('head').append(`
                <style id="search-result-styles">
                    .search-results-header {
                        padding-bottom: 1rem;
                        border-bottom: 1px solid var(--border-color);
                        margin-bottom: 1rem;
                    }
                    .search-results-list {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .search-result-item {
                        display: flex;
                        gap: 1rem;
                        padding: 1rem;
                        background: var(--bg-secondary);
                        border-radius: var(--radius-md);
                        cursor: pointer;
                        transition: all var(--transition-fast);
                    }
                    .search-result-item:hover {
                        background: var(--bg-primary);
                        box-shadow: var(--shadow-md);
                    }
                    .result-image {
                        width: 80px;
                        height: 80px;
                        border-radius: var(--radius-md);
                        overflow: hidden;
                        flex-shrink: 0;
                        background: white;
                    }
                    .result-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .result-image .product-placeholder {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                        color: var(--primary-light);
                    }
                    .result-info {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                    .result-info h5 {
                        font-family: var(--font-primary);
                        font-size: var(--font-size-base);
                        font-weight: var(--font-weight-semibold);
                        margin-bottom: 0.25rem;
                    }
                    .result-category {
                        font-size: var(--font-size-sm);
                        color: var(--text-secondary);
                        text-transform: capitalize;
                        margin-bottom: 0.5rem;
                    }
                    .result-footer {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: auto;
                    }
                    .result-price {
                        font-size: var(--font-size-lg);
                        font-weight: var(--font-weight-bold);
                        color: var(--primary-color);
                    }
                    .btn-sm {
                        padding: 0.5rem 1rem;
                        font-size: var(--font-size-sm);
                    }
                    .empty-state,
                    .error-message {
                        text-align: center;
                        padding: 3rem 1rem;
                        color: var(--text-secondary);
                    }
                    .empty-state i,
                    .error-message i {
                        font-size: 3rem;
                        margin-bottom: 1rem;
                        opacity: 0.3;
                    }
                </style>
            `);
        }
    },
    
    // Setup result interactions
    setupResultInteractions() {
        // Add to cart from search results
        $('.search-result-item .add-to-cart-btn').on('click', function(e) {
            e.stopPropagation();
            const productId = $(this).data('id');
            const product = Search.searchResults.find(p => p.id === productId);
            
            if (product) {
                Cart.addItem(product);
                Utils.showToast('Product added to cart!', 'success');
            }
        });
        
        // Click on result item
        $('.search-result-item').on('click', function() {
            const productId = $(this).data('id');
            Search.closeModal();
            Utils.scrollToElement('#products', 100);
            // Could implement product detail view here
        });
    }
};

// Initialize search on document ready
$(document).ready(function() {
    Search.init();
});
