// Shopping Cart Functionality

const Cart = {
    items: [],
    
    // Initialize cart
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.updateUI();
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Open cart
        $('#cartBtn').on('click', () => {
            this.open();
        });
        
        // Close cart
        $('#cartClose').on('click', () => {
            this.close();
        });
        
        // Close on overlay click
        $('#overlay').on('click', () => {
            this.close();
        });
    },
    
    // Add item to cart
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: quantity
            });
        }
        
        this.saveToStorage();
        this.updateUI();
        this.animateCartIcon();
    },
    
    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateUI();
        Utils.showToast('Item removed from cart', 'info');
    },
    
    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateUI();
            }
        }
    },
    
    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },
    
    // Get total items count
    getItemsCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },
    
    // Clear cart
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
        Utils.showToast('Cart cleared', 'info');
    },
    
    // Open cart sidebar
    open() {
        $('#cartSidebar').addClass('active');
        $('#overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    },
    
    // Close cart sidebar
    close() {
        $('#cartSidebar').removeClass('active');
        $('#overlay').removeClass('active');
        $('body').css('overflow', '');
    },
    
    // Update cart UI
    updateUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    },
    
    // Update cart count badge
    updateCartCount() {
        const count = this.getItemsCount();
        $('.cart-count').text(count);
        
        if (count > 0) {
            $('.cart-count').show();
        } else {
            $('.cart-count').hide();
        }
    },
    
    // Update cart items display
    updateCartItems() {
        const $cartItems = $('#cartItems');
        
        if (this.items.length === 0) {
            $cartItems.html(`
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `);
            return;
        }
        
        const itemsHTML = this.items.map(item => this.createCartItemHTML(item)).join('');
        $cartItems.html(itemsHTML);
        
        // Setup item interactions
        this.setupCartItemInteractions();
    },
    
    // Create cart item HTML
    createCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    ${item.image 
                        ? `<img src="${item.image}" alt="${item.name}">`
                        : `<div class="product-placeholder"><i class="fas fa-couch"></i></div>`
                    }
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${Utils.truncateText(item.name, 40)}</div>
                    <div class="cart-item-price">${Utils.formatCurrency(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    },
    
    // Setup cart item interactions
    setupCartItemInteractions() {
        // Increase quantity
        $('.increase-btn').on('click', function() {
            const productId = $(this).data('id');
            const item = Cart.items.find(i => i.id === productId);
            if (item) {
                Cart.updateQuantity(productId, item.quantity + 1);
            }
        });
        
        // Decrease quantity
        $('.decrease-btn').on('click', function() {
            const productId = $(this).data('id');
            const item = Cart.items.find(i => i.id === productId);
            if (item) {
                Cart.updateQuantity(productId, item.quantity - 1);
            }
        });
        
        // Remove item
        $('.cart-item-remove').on('click', function() {
            const productId = $(this).data('id');
            Cart.removeItem(productId);
        });
    },
    
    // Update cart total
    updateCartTotal() {
        const total = this.getTotal();
        $('.total-amount').text(Utils.formatCurrency(total));
    },
    
    // Animate cart icon
    animateCartIcon() {
        $('#cartBtn').addClass('pulse');
        setTimeout(() => {
            $('#cartBtn').removeClass('pulse');
        }, 500);
    },
    
    // Save cart to localStorage
    saveToStorage() {
        Utils.storage.set(CONFIG.storage.cart, this.items);
    },
    
    // Load cart from localStorage
    loadFromStorage() {
        const savedCart = Utils.storage.get(CONFIG.storage.cart, []);
        this.items = savedCart;
    }
};

// Initialize cart on document ready
$(document).ready(function() {
    Cart.init();
});
