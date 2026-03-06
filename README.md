# Furniture Landing Page

Modern and responsive furniture e-commerce landing page built with HTML5, CSS3, and jQuery.

## 🎨 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean and intuitive interface with smooth animations
- **Product Catalog**: Dynamic product loading from API with filtering
- **Shopping Cart**: Functional shopping cart with localStorage persistence
- **Search Functionality**: Real-time product search
- **Category Browsing**: Easy navigation through product categories
- **Smooth Animations**: CSS animations and jQuery effects throughout
- **API Integration**: Connect with external APIs for product data

## 📁 Project Structure

```
Furniture/
├── index.html              # Main HTML file
├── css/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # CSS custom properties
│   ├── typography.css     # Typography styles
│   ├── layout.css         # Layout and structure
│   ├── components.css     # UI components
│   ├── animations.css     # Animations and transitions
│   └── responsive.css     # Responsive breakpoints
├── js/
│   ├── config.js          # Configuration and constants
│   ├── api.js             # API service layer
│   ├── utils.js           # Utility functions
│   ├── animations.js      # Animation handlers
│   ├── navigation.js      # Navigation functionality
│   ├── products.js        # Product management
│   ├── cart.js            # Shopping cart
│   ├── slider.js          # Carousel/slider
│   ├── search.js          # Search functionality
│   └── main.js            # Main application
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for best experience)

### Installation

1. Clone or download the project files
2. Open `index.html` in your web browser

**Recommended**: Use a local web server to avoid CORS issues:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 🎯 Usage

### Basic Navigation

- Click on navigation links to scroll to different sections
- Use the hamburger menu on mobile devices
- Search for products using the search icon in the header
- Add products to cart by clicking the "Add to Cart" button
- View your cart by clicking the shopping cart icon

### Customization

#### Changing Colors

Edit `css/variables.css` to customize the color scheme:

```css
:root {
    --primary-color: #D4AF37;
    --secondary-color: #2C3E50;
    --accent-color: #E67E22;
}
```

#### API Configuration

Edit `js/config.js` to configure API settings:

```javascript
const CONFIG = {
    api: {
        baseUrl: 'https://your-api.com',
        endpoints: {
            products: '/api/products',
            categories: '/api/categories'
        }
    }
};
```

#### Using Custom Product Data

To use your own furniture API:

1. Update the API configuration in `js/config.js`
2. Modify the `transformProductData` method in `js/api.js` to match your API response format
3. Update product card rendering in `js/products.js` if needed

## 📱 Responsive Breakpoints

- **Extra Small**: < 576px (Mobile portrait)
- **Small**: 576px - 767px (Mobile landscape)
- **Medium**: 768px - 991px (Tablets)
- **Large**: 992px - 1199px (Desktop)
- **Extra Large**: ≥ 1200px (Large desktop)

## ✨ Key Features Explained

### Product Filtering

Products can be filtered by category using the filter buttons. The filtering happens instantly without page reload.

### Shopping Cart

- Add/remove products
- Update quantities
- Persistent cart (saved in localStorage)
- Real-time total calculation

### Search

- Real-time search as you type
- Searches through product names, descriptions, and categories
- Displays results in a modal overlay

### Animations

- Scroll-triggered animations using Intersection Observer
- Smooth transitions on hover effects
- Counter animations for statistics
- Parallax effects (can be disabled in config)

## 🔧 Configuration Options

All configuration options are in `js/config.js`:

```javascript
{
    itemsPerPage: 12,           // Products per page
    loadMoreIncrement: 6,       // Load more count
    animationDuration: 300,     // Animation speed (ms)
    debounceDelay: 300,         // Search debounce (ms)
    carouselAutoplayInterval: 5000  // Slider autoplay (ms)
}
```

## 🎨 CSS Architecture

The CSS is organized following a modular approach:

1. **reset.css**: Normalizes browser defaults
2. **variables.css**: CSS custom properties for easy theming
3. **typography.css**: Text styles and font settings
4. **layout.css**: Page structure and grid systems
5. **components.css**: Reusable UI components
6. **animations.css**: Animation definitions
7. **responsive.css**: Media queries for responsive design

## 📦 Dependencies

- **jQuery 3.7.0**: DOM manipulation and AJAX
- **Font Awesome 6.4.0**: Icons
- **Google Fonts**: Poppins and Playfair Display

All dependencies are loaded via CDN, no installation required.

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 🐛 Troubleshooting

### Products not loading

1. Check browser console for errors
2. Verify API endpoint is accessible
3. Try enabling mock data in config: `CONFIG.api.useMockData = true`

### Animations not working

1. Ensure `CONFIG.features.enableAnimations = true`
2. Check if browser supports Intersection Observer
3. Disable "Reduce Motion" in OS accessibility settings

### Cart not persisting

1. Check if localStorage is enabled in browser
2. Clear browser cache and try again
3. Check for localStorage quota errors in console

## 📄 License

This project is provided as-is for educational and commercial use.

## 👤 Author

Created for Sekawan Furniture Project - 2026

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📞 Support

For issues or questions, please check the browser console for error messages.

---

**Note**: This project uses Fake Store API as a placeholder. For production use, replace with your actual furniture product API.
