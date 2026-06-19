# Portofolio Prompt

Aplikasi galeri digital untuk menyimpan, mengelola, dan memamerkan koleksi prompt AI beserta gambar yang dihasilkan.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC)

## ✨ Fitur

- 📸 **Galeri Visual** - Tampilan grid untuk semua prompt dengan perbandingan gambar
- 📋 **Salin Prompt** - Satu klik untuk menyalin teks prompt ke clipboard
- ➕ **Tambah Prompt** - Form untuk menambahkan prompt baru dengan upload gambar
- 🔍 **Pencarian** - Cari prompt berdasarkan judul, teks, atau tag
- 📱 **Responsif** - Tampilan optimal di desktop dan mobile
- 🎨 **Tema Google** - Desain clean dan modern

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js 18+ 
- npm atau yarn

### Instalasi

1. **Masuk ke direktori proyek**
   ```bash
   cd prompt-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   
   Akses [http://localhost:3000](http://localhost:3000)

## 📁 Struktur Proyek

```
prompt-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Layout utama
│   │   ├── page.tsx          # Halaman galeri
│   │   ├── globals.css       # Styling global
│   │   ├── tambah/
│   │   │   └── page.tsx      # Halaman tambah prompt
│   │   └── prompts/
│   │       └── [id]/
│   │           └── page.tsx  # Halaman detail
│   ├── components/
│   │   ├── header.tsx        # Header navigasi
│   │   ├── prompt-card.tsx   # Kartu prompt
│   │   ├── prompt-gallery.tsx # Grid galeri
│   │   └── new-prompt-form.tsx # Form tambah
│   └── lib/
│       ├── storage.ts        # Local storage CRUD
│       ├── types.ts          # TypeScript types
│       └── utils.ts          # Utility functions
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 💾 Penyimpanan Data

Aplikasi menggunakan **Local Storage** untuk menyimpan data prompt. Data akan tetap tersimpan di browser Anda.

## 🎨 Tema

Aplikasi menggunakan tema yang terinspirasi dari Google:
- **Warna utama**: Biru Google (#4285F4)
- **Background**: Putih bersih
- **Font**: Inter
- **Shadow**: Subtle shadows untuk depth

## 📝 Penggunaan

1. **Melihat Galeri** - Buka halaman utama untuk melihat semua prompt
2. **Menambah Prompt** - Klik "Tambah Prompt Baru" atau gunakan menu header
3. **Menyalin Prompt** - Hover pada kartu dan klik ikon salin
4. **Melihat Detail** - Klik kartu untuk melihat detail lengkap
5. **Mencari** - Gunakan search bar di header
6. **Menghapus** - Buka detail prompt dan klik tombol hapus

## 📄 Lisensi

MIT License - Bebas digunakan dan dimodifikasi.

---

Dibuat dengan ❤️ untuk kreator AI.
