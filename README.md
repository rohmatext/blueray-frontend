# Frontend Order Shipping & Tracking API

*Antarmuka pengguna untuk sistem pengiriman dan pelacakan paket. Dibuat menggunakan Vue.js dan Vite untuk melengkapi API backend Laravel. Aplikasi ini memungkinkan pengguna untuk mengakses fitur-fitur seperti login, pengelolaan alamat, pembuatan pengiriman, pelacakan paket, dan dashboard statistik.*

Untuk repository backend  
[Klik di sini](https://github.com/rohmatext/blueray-backend-api)

---

## 🚀 Fitur Utama

- Autentikasi pengguna (login, registrasi)
- Manajemen alamat pengiriman
- Pembuatan dan pelacakan pengiriman
- Dashboard statistik
- Pengelolaan pengguna untuk admin
- Komunikasi penuh dengan API Laravel backend

---

## ⚙️ Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/rohmatext/blueray-frontend.git
   cd blueray-frontend
   ```

2. **Install dependensi**

   ```bash
   npm install
   ```

3. **Copy file environment**

   ```bash
   cp .env.example .env
   ```

4. **Atur environment**

   Buat file `.env` dan sesuaikan variabel berikut:

   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

   > Pastikan URL sesuai dengan domain backend yang kamu gunakan.

5. **Jalankan proyek**

   ```bash
   npm run dev
   ```

   Akses aplikasi melalui: `http://localhost:5173`

---

## 📚 Struktur Proyek

```
├── src
│   ├── assets
│   ├── components
│   ├── composables
│   ├── layouts
│   ├── lib
│   ├── pages
│   ├── router
│   ├── stores
│   └── types
├── public
└── .env
```

---

## 🔐 Autentikasi

- Autentikasi menggunakan token Bearer dari backend Laravel (Sanctum).
- Token disimpan di localStorage dan state management.

---

## 📦 Komunikasi API

Frontend ini sepenuhnya terintegrasi dengan [Blueray API](https://github.com/rohmatext/blueray-backend-api).

---

## 🛠️ Teknologi

- Vue 3 + Composition API
- Vite
- Vue Router
- Axios
- Shadcn UI
- Tailwind CSS
- Pinia

---

## 📄 Dokumentasi Tambahan

Gunakan file Postman dari repo backend untuk memahami endpoint:  
📁 `blueray-api.postman_collection.json`

---

## 👨‍💻 Pengembang

- [Muhammad Rohmat](https://github.com/rohmatext)
