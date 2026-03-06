# Dekoor — Furniture Landing Page

Responsive furniture e-commerce landing page built with HTML5, CSS3, and jQuery. Product data is fetched from a live REST API using MockAPI.io.

## 🚀 How to Start Project

### Cara 1 — Buka langsung (tanpa server)

1. Download atau clone repository ini
2. Buka file `index.html` langsung di browser

> **Catatan:** Beberapa browser memblokir request API saat membuka file HTML secara lokal (`file://`). Gunakan Cara 2 untuk hasil terbaik.

### Cara 2 — Jalankan local server (direkomendasikan)

**Menggunakan Python:**
```bash
# Python 3
python -m http.server 8000
```

**Menggunakan Node.js:**
```bash
npx http-server
```

**Menggunakan PHP:**
```bash
php -S localhost:8000
```

Kemudian buka browser dan akses: `http://localhost:8000`

### Cara 3 — Live Server (VS Code)

Install ekstensi **Live Server** di VS Code, klik kanan pada `index.html` → **Open with Live Server**.

---

## 🌐 Demo

> Link akan tersedia setelah deploy ke hosting

## 📁 Struktur Project

```
Furniture/
├── index.html
├── css/
│   ├── reset.css          # CSS reset & normalize
│   ├── variables.css      # CSS custom properties (warna, spacing, dll)
│   ├── typography.css     # Tipografi
│   ├── layout.css         # Layout, navbar, hero, section
│   ├── components.css     # Komponen UI (card, button, modal, dll)
│   ├── animations.css     # Animasi & transisi
│   └── responsive.css     # Media queries (mobile, tablet, desktop)
├── js/
│   ├── config.js          # Konfigurasi app & API endpoint
│   ├── api.js             # Service layer untuk HTTP request ke MockAPI
│   ├── utils.js           # Fungsi utilitas (debounce, throttle, format, dll)
│   ├── animations.js      # Handler animasi scroll & UI
│   ├── navigation.js      # Navbar, hamburger, sticky header, smooth scroll
│   ├── products.js        # Manajemen produk & filter
│   ├── cart.js            # Shopping cart (localStorage)
│   ├── slider.js          # Hero slider/carousel
│   ├── search.js          # Fungsi pencarian produk
│   └── main.js            # Entry point — inisialisasi semua modul
└── assets/
    └── images/            # Gambar, ikon, SVG
```

---

## 🔌 API

Project ini menggunakan **MockAPI.io** sebagai sumber data produk.

| Endpoint | Method | Keterangan |
|---|---|---|
| `/api/v1/products` | GET | Ambil daftar produk furniture |
| `/api/v1/products?limit=8` | GET | Ambil 8 produk untuk carousel |

**Konfigurasi endpoint** ada di `js/config.js`:
```js
api: {
    baseUrl: 'https://69ab28e1e051e9456fa3759f.mockapi.io/api/v1',
    endpoints: {
        products: '/products'
    }
}
```

**Schema produk (MockAPI):**
```json
{
  "id": "1",
  "name": "Modern Sofa",
  "price": "899.99",
  "image": "https://picsum.photos/400/300"
}
```

---

## ✨ Fitur

- **Responsive Design** — Mobile, tablet, dan desktop
- **Product Carousel** — Data dari MockAPI, dengan skeleton loading
- **Category Preview** — Gambar preview berubah dinamis saat kategori dipilih, menggunakan data dari cache API
- **Navbar Dropdown** — Menu Furniture dengan submenu kategori
- **Smooth Scroll** — Navigasi antar section dengan animasi
- **Hamburger Menu** — Mobile navigation dengan overlay
- **Shopping Cart** — Sidebar cart dengan localStorage
- **Search Modal** — Pencarian produk real-time
- **Sticky Header** — Navbar hide/show saat scroll
- **Scroll Animations** — Fade-in elemen saat masuk viewport

---

## 📱 Responsive Breakpoints

| Breakpoint | Range | Keterangan |
|---|---|---|
| Mobile S | < 576px | Portrait mobile |
| Mobile L | 576px – 767px | Landscape mobile |
| Tablet | 768px – 991px | Tablet |
| Desktop | 992px – 1199px | Desktop |
| Large Desktop | ≥ 1200px | Wide screen |

---

## 📦 Dependencies (CDN — tidak perlu install)

| Library | Versi | Kegunaan |
|---|---|---|
| jQuery | 3.7.0 | DOM manipulation, AJAX, animasi |
| Font Awesome | 6.4.0 | Ikon |
| Google Fonts (Inter) | — | Tipografi |

---

