# Project Aku-Fullstack

## Deskripsi
Project ini adalah aplikasi fullstack sederhana menggunakan Analog.js dan Angular, dengan sistem autentikasi username dan password tanpa JWT. Data disimpan di memory (DEV ONLY). Project ini mendukung operasi CRUD sederhana pada item.

---

## Struktur Folder
```
src/
 ├─ app/
 │   ├─ pages/
 │   │   ├─ index.page.ts      # Halaman utama
 │   │   └─ auth.page.ts       # Halaman login
 │   ├─ midware.ts            # Middleware untuk autentikasi
 │   └─ routes.ts             # Routing aplikasi
 ├─ server/
 │   └─ routes/
 │       └─ api/
 │           └─ v1/
 │               └─ das.ts    # API endpoint contoh
 .env                         # Environment variables
```

---

## Environment Variables (.env)
```
VITE_ADMIN_USERNAME=ADMIN_Username
VITE_ADMIN_PASSWORD=hashed_password_here
```
> **Catatan:** Ganti `hashed_password_here` dengan password yang sudah di-hash sesuai kebutuhan.

---

## Cara Install dan Jalankan
1. Clone repository:
```bash
git clone <repo-url>
cd aku-fullstack
```
2. Install dependencies:
```bash
npm install
```
3. Jalankan development server:
```bash
npm run dev
```
4. Buka browser:
```
http://localhost:5173
```

---

## Cara Login
1. Buka halaman login (`/auth`).
2. Masukkan username dan password sesuai environment variables:
   - Username: `zeeAdmin`
   - Password: `jax4ad5in*&^51`
3. Tekan tombol **Login**.
4. Jika berhasil, akan diarahkan ke halaman utama (`/`).
5. Untuk logout, tekan tombol **Logout** pada halaman utama.

---

## API Endpoint (Contoh)
- GET `/api/v1/das?action=list` : Mendapatkan list item
- POST `/api/v1/das?action=add` : Menambahkan item
  ```json
  {
    "name": "ItemName",
    "price": 100,
    "stock": 10
  }
  ```
- POST `/api/v1/das?action=delete` : Menghapus item
  ```json
  {
    "id": 1
  }
  ```
> **Catatan:** Semua operasi memerlukan header `x-user` untuk autentikasi tapi gak perlu di test di postman karena udah otomatis

---

## catatan dari developer
kalian bebas mau di intergrasi databse boleh pake mongoDB atau prosge bebas ya atau mau nambah fitur apa bebas yang penting jangan 

ubah 

├── app.config.server.ts   ✅ JANGAN DIUBAH
├── app.config.ts          ✅ JANGAN DIUBAH
├── app.spec.ts            ✅ JANGAN DIUBAH
└── app.ts                 ✅ JANGAN DIUBAH

karena itu semua default dari analog js kecuali mau nambah pake ssr
