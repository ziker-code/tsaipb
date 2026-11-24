# Rencana — Beranda bagian bawah (setelah peta) + fitur "Bagikan Cerita"

| | |
|---|---|
| Status | **Dikerjakan (v2.2). Form publik dibatalkan: cerita ditambahkan lewat admin.** |
| Tanggal | 24 November 2026 |
| Dasar | Screenshot layout referensi dari user (Cerita Mereka → Program → Kisah Inspiratif → Kabar Terbaru) |
| Kondisi saat ini | v2.1 live (lihat `docs/updates/2026-11-21-v2.1-foto-scroll.md`) |
| Cakupan | Hanya section **di bawah "TSA IPB Berdampak" (peta)**. Hero, statistik, Kenali Lebih Dekat, pita sorotan, dan peta tidak diubah. |

Bahasa visual tetap mengikuti sistem website yang sudah ada (Sora, hijau tua + emas, sudut membulat, motion v2.1). Komponen yang dibangun baru: carousel testimoni berfokus-tengah, form "Bagikan Cerita", dan moderasi cerita di admin.

---

## 1. Urutan section (mengikuti referensi)

| # | Section | Status sekarang | Setelah diubah |
|---|---|---|---|
| 1 | **Cerita Mereka tentang TSA IPB** | Disembunyikan bila belum ada testimoni | **Selalu tampil.** Carousel kartu emas dengan kartu tengah terfokus, ditambah tombol & form **Bagikan Cerita** |
| 2 | **Program TSA IPB** | 3 kartu potret | 3 kartu tinggi dengan **bilah judul di bagian bawah kartu**; kartu yang di-hover/fokus mendapat garis tepi tegas |
| 3 | **Kisah Inspiratif** | Carousel dengan panah | Kartu bergradasi hijau dari atas (judul + tanggal di atas); tombol **Lihat Semua** + panah ←/→ sejajar judul |
| 4 | **Kabar Terbaru** | 1 besar + 3 daftar | 1 kartu besar dengan **judul & tanggal di atas gambar** (kiri) + 3 baris (thumbnail kecil + judul + tanggal) di kanan |
| 5 | FAQ | Ada | Tetap, di bawah Kabar Terbaru *(lihat §6 no. 4)* |
| 6 | CTA "Mari Berkolaborasi" | Ada | Tetap |

Judul section memakai pola referensi: judul tebal-sedang + satu kalimat deskripsi di bawahnya, rata kiri. Label kecil di atas judul (eyebrow) dihapus di section-section ini supaya sama dengan referensi.

## 2. Detail per section

### 2.1 Cerita Mereka tentang TSA IPB
- **Layout**: kartu emas (`gold-500`) lebar ±560px di tengah. Kartu kiri & kanan **terpotong di tepi layar** (mengintip), sedikit lebih kecil dan redup.
- **Isi kartu**: kutipan (maks. ±280 karakter), lalu di pojok kiri bawah **avatar bulat** (inisial nama bila tanpa foto) yang menumpang keluar tepi kartu, dengan **label nama** (bilah gelap) dan **angkatan** ("TLD 27") di bawahnya — persis seperti referensi.
- **Interaksi**: geser/drag (HP & trackpad), panah ←/→, dan otomatis berganti tiap ±6 detik (berhenti saat di-hover/fokus, mati bila reduced-motion). Kartu tengah membesar halus saat bergeser.
- **Bila belum ada testimoni yang disetujui**: kartu tengah berisi ajakan *"Bagikan pengalaman Anda belajar, bertumbuh, dan berkontribusi bersama TSA IPB. Testimoni asli akan ditampilkan setelah mendapat persetujuan narasumber."* — teks ini **ajakan**, bukan testimoni palsu. Kartu samping tidak diisi kutipan rekaan.
- **Tombol "Bagikan Cerita"** di bawah carousel → membuka form (§3).

### 2.2 Program TSA IPB
- 3 kartu tinggi (rasio ±3:4), latar gambar cover/warna divisi + logo divisi (seperti sekarang, dengan parallax).
- **Bilah bawah** di dalam kartu (putih semi-transparan, blur): nama program + nama divisi. Saat hover/fokus, bilah berubah jadi hijau tua, kartu terangkat, dan **garis tepi 2px** muncul (meniru kartu tengah biru di referensi, tapi memakai warna brand).
- Tombol "Semua program" tetap di kanan judul.

### 2.3 Kisah Inspiratif
- Kartu 4:3, **gradasi hijau tua dari atas ke transparan** di atas foto (judul + tanggal di bagian atas kartu), seperti referensi.
- Header: judul + deskripsi di kiri; **"Lihat Semua"** (tombol hijau pill) + **panah ←/→** di kanan.
- 4 kartu terlihat di desktop, kartu ke-5 mengintip; geser di HP.
- Sumber: artikel berkategori "Cerita Inspirasi". Bila kosong, section disembunyikan (tidak ada konten rekaan).

### 2.4 Kabar Terbaru
- Kiri: **1 kartu besar** (±60% lebar), foto penuh, **judul + tanggal & jam di pojok kiri bawah** di atas gradasi gelap.
- Kanan: **3 baris** — thumbnail 4:3 (±120px) + judul (2 baris) + "28 September 2026 · 12:30".
- Sumber: artikel selain "Cerita Inspirasi". Format tanggal ditambah jam (WIB).

## 3. Fitur baru: "Bagikan Cerita"

### Alur
1. Pengunjung klik **Bagikan Cerita** → muncul **dialog** (modal) berisi form.
2. Isi: **Nama**\*, **Angkatan/TLD** (mis. "TLD 27")\*, **Peran** (opsional, mis. "Staff Social Project"), **Cerita**\* (30–500 karakter, ada penghitung), **Email** (opsional, hanya untuk dihubungi panitia, *tidak pernah ditampilkan*), centang **persetujuan ditampilkan**\*.
3. Kirim → pesan sukses: "Terima kasih! Ceritamu akan tampil setelah ditinjau pengurus."
4. Admin membuka **Admin → Cerita Masuk** → *Setujui* (langsung tampil di carousel) / *Tolak* / *Hapus*, bisa merapikan teks sebelum menyetujui.

### Data (migrasi baru `0002_stories.sql`)
- Tabel baru **`story_submissions`**: `id, name, batch, role, story, email, consent, status ('pending'|'approved'|'rejected'), created_at, reviewed_at`.
  - RLS: publik **hanya boleh INSERT** dengan `status='pending'` dan `consent=true`; hanya admin yang bisa membaca/mengubah (email aman, tidak pernah terbaca publik).
- Tabel `testimonials` ditambah kolom **`batch`** (angkatan) dan **`photo_url`** (opsional).
- Saat disetujui: data disalin ke `testimonials` (tanpa email) dan `status` jadi `approved`; carousel di-refresh lewat `updateTag`.

### Keamanan & anti-spam
Honeypot, batas 3 kiriman/10 menit/IP, validasi server, panjang teks dibatasi, teks dirender sebagai teks biasa (bukan HTML). Opsional: notifikasi email ke pengurus saat Resend sudah aktif.

## 4. Motion (konsisten dengan v2.1)
- Judul section: mask reveal (sudah ada).
- Carousel testimoni: transisi pegas halus antar kartu; kartu tengah skala 1, samping 0,92 + opacity 0,6.
- Kartu program: stagger naik saat masuk layar + parallax isi (sudah ada).
- Kabar Terbaru: kartu besar zoom-in pelan mengikuti scroll; daftar kanan muncul berurutan.
- Dialog form: fade + naik 16px; fokus otomatis ke input pertama; `Esc` menutup; fokus dikunci di dalam dialog.
- Semua efek gerak mati bila "kurangi gerakan" aktif.

## 5. File yang akan disentuh

| File | Perubahan |
|---|---|
| `src/app/(site)/page.tsx` | Susun ulang section 1–4 |
| `src/components/home/testimonial-carousel.tsx` | **Baru** — carousel fokus-tengah |
| `src/components/home/share-story.tsx` (+ `actions.ts`) | **Baru** — tombol, dialog, form, server action |
| `src/components/cards.tsx` | Varian kartu program (bilah bawah), kisah, kabar besar, baris kabar |
| `src/lib/data.ts`, `src/lib/types.ts`, `src/lib/format.ts` | Kolom `batch/photo_url`, format tanggal + jam |
| `supabase/migrations/0002_stories.sql` | **Baru** — tabel `story_submissions` + kolom testimoni |
| `src/app/admin/(panel)/cerita/*` + `admin-nav.tsx` | **Baru** — modul **Cerita Masuk** (daftar, setujui, tolak, edit) |
| `docs/updates/…`, `docs/CHANGELOG.md` | Dokumentasi |

Tidak ada route atau komponen yang dihapus.

## 6. Keputusan yang dibutuhkan
1. **Foto pengirim**: boleh upload foto saat berbagi cerita, atau cukup **inisial nama** (lebih aman, tanpa moderasi foto)? *(usul: inisial dulu; foto bisa ditambahkan admin saat menyetujui)*
2. **Siapa yang boleh berbagi**: semua pengunjung (anggota, alumni, mitra), atau hanya anggota/alumni TSA? *(usul: semua, karena tetap dimoderasi)*
3. **Notifikasi**: perlu email ke pengurus setiap ada cerita baru? (butuh Resend aktif)
4. **FAQ**: tetap di bawah Kabar Terbaru, atau dihapus karena tidak ada di referensi?
5. **Eyebrow**: setuju label kecil di atas judul section dihapus di bagian ini agar sama dengan referensi?
