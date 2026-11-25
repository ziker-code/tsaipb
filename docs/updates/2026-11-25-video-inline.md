# Video profil diputar langsung di website + thumbnail HD

**Tanggal:** 2026-11-25

## Masalah
1. Thumbnail video di "Kenali Lebih Dekat" buram. Penyebabnya adalah gambar `hqdefault.jpg` dari YouTube (480×360, rasio 4:3 dengan bilah hitam) yang ditarik ke lebar ±830px.
2. Video tidak bisa diputar di website. Mengklik thumbnail membuka YouTube di tab baru.

## Perubahan
- **Komponen baru `src/components/video-embed.tsx`** (pemutar YouTube "ringan"):
  - Awalnya hanya menampilkan thumbnail HD `maxresdefault.jpg` (1280×720). Jika gambar itu tidak tersedia, otomatis turun ke `sddefault.jpg`.
  - Saat tombol play diklik, iframe `youtube-nocookie.com` baru dimuat dan langsung diputar di tempat (autoplay, fullscreen, picture-in-picture).
  - Halaman tetap ringan karena skrip YouTube tidak dimuat sebelum ada klik. Domain nocookie tidak memasang cookie pelacak sebelum video diputar.
  - Aksesibel: berupa `<button>` dengan label "Putar video: …", punya ring fokus, dan animasi hover mati bila pengguna memilih reduced motion.
- **Beranda**: section "Kenali Lebih Dekat" memakai `VideoEmbed`. Jika link video kosong, tetap tampil "Video profil segera hadir".
- **Detail program** (`/program/[slug]`): video program kini tampil besar di kolom utama, di atas deskripsi, dan diputar di halaman. Tautan "Tonton di YouTube" di sidebar dihapus.
- **Admin → Pengaturan**: teks keterangan diganti menjadi "Diputar langsung di website."
- Lint kecil: ikon panah diberi `motion-reduce:transition-none`, dan label "Divisi" di detail program diubah menjadi sentence case.

## Cara pakai (admin)
Admin → Pengaturan → isi Link YouTube → Simpan. Format `youtu.be/…`, `youtube.com/watch?v=…`, dan `shorts/…` semuanya diterima.

## Verifikasi
- Lokal: thumbnail dimuat dari `maxresdefault` (tajam). Setelah diklik, iframe nocookie muncul berukuran 16:9 dan video langsung diputar.
- `npm run lint` dan `npm run build` bersih.
