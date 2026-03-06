# 🖼️ Panduan Menggunakan Gambar

## Cara Cepat Menambahkan Gambar

### 1. Untuk Product Images

**Di file `js/config.js`**, update mockProducts:

```javascript
mockProducts: [
    {
        id: 1,
        name: 'Modern Sofa',
        category: 'living-room',
        price: 1299.99,
        image: 'assets/images/products/sofa-modern-01.jpg', // ← Tambahkan path gambar
        rating: 4.5,
        reviews: 128,
        badge: 'Sale'
    },
    // ... produk lainnya
]
```

### 2. Untuk Hero/Banner Images

**Di file `index.html`**, cari section `.hero-image` dan ganti:

```html
<!-- DARI: -->
<div class="hero-image-placeholder">
    <i class="fas fa-couch"></i>
</div>

<!-- MENJADI: -->
<img src="assets/images/hero/hero-banner-01.jpg" alt="Modern Furniture Collection">
```

### 3. Untuk Category Images

**Di file `js/products.js`**, update method `renderCategories()`:

```javascript
renderCategories(categories) {
    const categoriesHTML = categories.map(category => `
        <div class="category-card" data-category="${category.slug}">
            <img src="assets/images/categories/${category.slug}.jpg" 
                 alt="${category.name}">
            <div class="category-content">
                <h3>${category.name}</h3>
                <p>${category.count} Products</p>
            </div>
        </div>
    `).join('');
    
    $('#categoriesGrid').html(categoriesHTML);
}
```

### 4. Untuk About Section

**Di file `index.html`**, cari `.about-image-placeholder`:

```html
<!-- DARI: -->
<div class="about-image-placeholder">
    <i class="fas fa-home"></i>
</div>

<!-- MENJADI: -->
<img src="assets/images/about/about-banner.jpg" alt="About Our Company">
```

### 5. Untuk Testimonial Avatar

**Di file `index.html`**, update testimonial cards:

```html
<!-- DARI: -->
<div class="author-avatar">
    <i class="fas fa-user"></i>
</div>

<!-- MENJADI: -->
<div class="author-avatar">
    <img src="assets/images/testimonials/customer-01.jpg" alt="Sarah Johnson">
</div>
```

## Sumber Gambar Gratis

### Furniture & Interior
1. **Unsplash** - https://unsplash.com/s/photos/furniture
2. **Pexels** - https://www.pexels.com/search/furniture/
3. **Pixabay** - https://pixabay.com/images/search/furniture/
4. **Freepik** - https://www.freepik.com/search?query=furniture

### Cara Download & Optimize
1. Download gambar dengan ukuran yang sesuai
2. Rename file sesuai naming convention
3. Compress menggunakan:
   - TinyPNG: https://tinypng.com/
   - Squoosh: https://squoosh.app/
4. Simpan ke folder yang sesuai

## Checklist Gambar

### ✅ Products (12+ gambar)
```
assets/images/products/
├── sofa-modern-01.jpg
├── sofa-modern-02.jpg
├── bed-king-size-01.jpg
├── dining-table-01.jpg
├── office-desk-01.jpg
├── ... (lebih banyak produk)
```

### ✅ Categories (6 gambar)
```
assets/images/categories/
├── living-room.jpg
├── bedroom.jpg
├── dining.jpg
├── office.jpg
├── outdoor.jpg
└── storage.jpg
```

### ✅ Hero (1-3 gambar)
```
assets/images/hero/
├── hero-banner-01.jpg
└── hero-banner-02.jpg (optional)
```

### ✅ About (1-2 gambar)
```
assets/images/about/
└── about-banner.jpg
```

### ✅ Testimonials (3+ gambar)
```
assets/images/testimonials/
├── customer-01.jpg
├── customer-02.jpg
└── customer-03.jpg
```

## Tips Penting

1. **Gunakan format WebP** untuk ukuran lebih kecil (browser modern support)
2. **Lazy loading** - gambar di-load saat dibutuhkan (sudah otomatis di browser modern)
3. **Alt text** - selalu tambahkan untuk SEO dan accessibility
4. **Responsive images** - siapkan berbagai ukuran jika perlu
5. **Compress** - selalu compress gambar sebelum upload

## Troubleshooting

**Gambar tidak muncul?**
- ✓ Cek path sudah benar (case-sensitive)
- ✓ Cek file extension (.jpg bukan .JPG)
- ✓ Cek browser console untuk error
- ✓ Pastikan file ada di folder yang benar

**Gambar pecah/blur?**
- ✓ Upload gambar dengan resolusi lebih tinggi
- ✓ Gunakan ukuran minimal yang disarankan
- ✓ Jangan over-compress

**Loading lambat?**
- ✓ Compress gambar (target < 200KB untuk produk)
- ✓ Gunakan format WebP
- ✓ Enable caching (.htaccess sudah disediakan)
