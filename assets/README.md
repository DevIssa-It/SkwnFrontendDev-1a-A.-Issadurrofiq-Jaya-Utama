# Assets Directory

Folder ini berisi semua gambar dan aset untuk Furniture Landing Page.

## 📁 Struktur Folder

```
assets/
├── images/
│   ├── products/        # Gambar produk furniture
│   ├── categories/      # Gambar untuk kategori (Living Room, Bedroom, dll)
│   ├── hero/           # Gambar untuk hero section/banner
│   ├── about/          # Gambar untuk about section
│   ├── testimonials/   # Foto customer untuk testimonials
│   └── icons/          # Icon custom (jika ada)
└── fonts/              # Custom fonts (jika tidak menggunakan CDN)
```

## 🖼️ Format Gambar yang Disarankan

### Products
- **Format**: JPG, PNG, atau WebP
- **Ukuran**: 600x600px minimum (square/ratio 1:1)
- **Resolusi**: 72-150 DPI
- **Ukuran file**: < 200KB (optimized)
- **Naming**: `product-name-01.jpg`, `product-name-02.jpg`, dll

### Categories
- **Format**: JPG atau WebP
- **Ukuran**: 800x600px minimum (ratio 4:3)
- **Ukuran file**: < 300KB
- **Naming**: `living-room.jpg`, `bedroom.jpg`, `dining.jpg`, dll

### Hero/Banner
- **Format**: JPG atau WebP
- **Ukuran**: 1920x1080px (Full HD)
- **Ukuran file**: < 500KB
- **Naming**: `hero-01.jpg`, `hero-02.jpg`, dll

### About
- **Format**: JPG atau WebP
- **Ukuran**: 1200x800px
- **Ukuran file**: < 400KB
- **Naming**: `about-banner.jpg`, `about-team.jpg`, dll

### Testimonials
- **Format**: JPG atau PNG
- **Ukuran**: 150x150px (square/ratio 1:1)
- **Ukuran file**: < 50KB
- **Naming**: `customer-01.jpg`, `customer-02.jpg`, dll

## 🎨 Tips Optimasi

1. **Compress images** sebelum upload menggunakan:
   - TinyPNG (https://tinypng.com/)
   - Squoosh (https://squoosh.app/)
   - ImageOptim (Mac)
   - GIMP atau Photoshop

2. **Use WebP format** untuk browser modern (lebih kecil size-nya)

3. **Responsive images**: Siapkan multiple sizes untuk responsive design
   - Small (mobile): 480px
   - Medium (tablet): 768px
   - Large (desktop): 1200px

4. **Lazy loading**: Gambar akan di-load saat dibutuhkan

5. **Alt text**: Pastikan setiap gambar punya deskripsi untuk SEO

## 📝 Cara Menggunakan

### 1. Tambahkan gambar ke folder yang sesuai

```bash
# Contoh struktur:
assets/images/products/sofa-modern-01.jpg
assets/images/products/bed-king-size-01.jpg
assets/images/categories/living-room.jpg
assets/images/hero/hero-banner-01.jpg
```

### 2. Update kode untuk menggunakan gambar

Di `js/products.js` atau `js/config.js`, update image path:

```javascript
// Contoh di config.js
mockProducts: [
    {
        id: 1,
        name: 'Modern Sofa',
        image: 'assets/images/products/sofa-modern-01.jpg',
        // ... data lainnya
    }
]
```

### 3. Atau update langsung di HTML

```html
<!-- Hero section -->
<div class="hero-image">
    <img src="assets/images/hero/hero-banner-01.jpg" alt="Modern Furniture Collection">
</div>

<!-- Product card -->
<div class="product-image">
    <img src="assets/images/products/sofa-modern-01.jpg" alt="Modern Sofa">
</div>
```

## 🔄 Placeholder Images

Jika belum punya gambar asli, bisa gunakan placeholder dari:

1. **Unsplash** - https://unsplash.com/s/photos/furniture
2. **Pexels** - https://www.pexels.com/search/furniture/
3. **Freepik** - https://www.freepik.com/search?query=furniture
4. **Lorem Picsum** - https://picsum.photos/ (random placeholder)

## 📋 Checklist Gambar yang Dibutuhkan

### Hero Section (1-3 gambar)
- [ ] hero-banner-01.jpg
- [ ] hero-banner-02.jpg (optional)
- [ ] hero-banner-03.jpg (optional)

### Categories (6 gambar)
- [ ] living-room.jpg
- [ ] bedroom.jpg
- [ ] dining.jpg
- [ ] office.jpg
- [ ] outdoor.jpg
- [ ] storage.jpg

### Products (minimum 12 gambar)
- [ ] product-01.jpg hingga product-12.jpg
- [ ] Atau sesuai jumlah produk yang ingin ditampilkan

### About Section (1-2 gambar)
- [ ] about-banner.jpg
- [ ] about-team.jpg (optional)

### Testimonials (3+ gambar)
- [ ] customer-01.jpg
- [ ] customer-02.jpg
- [ ] customer-03.jpg

### Icons (optional)
- [ ] logo.png/svg
- [ ] favicon.ico

## 🌐 CDN Alternative

Jika tidak ingin host gambar sendiri, bisa gunakan CDN:
- Cloudinary
- imgix
- Cloudflare Images
- AWS S3 + CloudFront

---

**Note**: Pastikan semua gambar sudah di-optimasi untuk performa website yang lebih baik!
