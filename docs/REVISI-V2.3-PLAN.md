# Rencana Revisi v2.3 — Beranda & identitas

| | |
|---|---|
| Status | **Dikerjakan & dirilis (v2.3)** |
| Tanggal | 25 November 2026 |
| Dasar | 5 gambar dari user: screenshot hero live, layout referensi Program/Kisah/Kabar, section "Kenali lebih dekat", section "Cerita Mereka", referensi carousel KOMNEWS (HIMALKOM IPB) |
| Kondisi saat ini | v2.2 live (lihat `docs/updates/2026-11-24-v2.2-beranda-bawah.md`) |

## 1. Daftar revisi → perubahan

| # | Permintaan | Perubahan yang akan dibuat | File |
|---|---|---|---|
| 1 | Hapus tulisan kecil "Tanoto Scholars Association · IPB University" di atas judul hero (terlihat AI slop) | Pill/label itu dihapus. Hero hanya: judul, satu paragraf, dua tombol. | `src/app/(site)/page.tsx` |
| 2 | Slogan yang benar **"Berdaya, Berkarya, Digdaya!"** | Hero: baris 1 **"Berdaya, Berkarya,"**, baris 2 **"DIGDAYA!"** (emas). Diperbaiki juga di footer (`Berkarya, Berdaya, DIGDAYA!` → `Berdaya, Berkarya, Digdaya!`), judul tab browser, dan subjudul default hero halaman dalam. | `page.tsx`, `site-footer.tsx`, `lib/site.ts`, `components/ui.tsx` |
| 3 | Seluruh web memakai **Poppins** | Ganti Sora → Poppins (`next/font/google`, bobot 300/400/500/600/700) untuk seluruh situs termasuk admin. Bobot judul disesuaikan karena Poppins lebih lebar: judul besar 300–400, judul section 600 (seperti referensi). | `src/app/layout.tsx`, `globals.css` |
| 4 | Hapus menu **"Kontak"** di navbar (sudah sama dengan tombol "Hubungi Kami") | Item "Kontak" dihapus dari navbar desktop & mobile. Tombol "Hubungi Kami" tetap → `/kontak`. Footer tetap punya tautan Kontak. | `src/lib/site.ts` |
| 5 | Efek kaca navbar diberi **warna hijau** | Navbar menjadi kaca hijau: latar hijau tua semi-transparan (±55% di atas hero, ±80% saat di-scroll) + blur + garis tepi hijau muda tipis. Tidak lagi abu/putih transparan. | `src/components/site-header.tsx` |
| 6 | Layout **Program / Kisah Inspiratif / Kabar Terbaru** sama persis dengan gambar referensi | (a) **Judul section** dibuat seperti referensi: kecil-sedang (±22–24px), tebal 600, deskripsi 14px di bawahnya, jarak antar-section lebih rapat. (b) **Program**: 3 kartu tinggi abu-abu dengan bilah judul putih membulat di bawah kartu (sudah ada, disesuaikan proporsi & warna dengan referensi). (c) **Kisah Inspiratif**: kartu dengan gradasi hijau di atas, tombol "Lihat Semua" + ← → di kanan judul, 4 kartu + 1 mengintip. (d) **Kabar Terbaru**: 1 kartu besar kiri + 3 baris kanan. (e) **Ketiga section selalu tampil** — saat ini Kisah & Kabar tersembunyi karena belum ada artikel (lihat §3 no. 1). | `page.tsx`, `components/cards.tsx`, `components/ui.tsx` |
| 7 | Section **"Kenali lebih dekat"**: video terlalu kecil, kiri-kanan kosong, terlalu ke tengah | Section dibuat **lebar penuh**: kotak video **menempel ke tepi kiri layar** (sudut membulat hanya di kanan), lebar ±58% layar, rasio 16:9. Teks perkenalan di kanan dengan lebar baca nyaman. Label kecil "Kenali lebih dekat" diganti judul section biasa (tanpa eyebrow). Di HP: video selebar layar, teks di bawahnya. | `page.tsx` |
| 8 | Section **"Cerita Mereka"** terlalu kecil, diperbesar **seperti referensi KOMNEWS** | Carousel kartu **lebar** (±80% layar, maks ±1100px): **teks cerita besar di kiri** (kutipan, nama, angkatan, peran), **foto narasumber besar di kanan** (rasio ±4:3, sudut membulat). Kartu sebelum/sesudah mengintip di kiri & kanan. Navigasi di bawah: tombol ← , **titik indikator** (posisi cerita), tombol →, seperti referensi. Kartu ajakan (saat belum ada cerita) juga diperbesar ke ukuran yang sama. Warna tetap identitas TSA (emas/hijau), bukan biru referensi. | `components/home/testimonial-carousel.tsx` |
| 10 | **Navbar persis seperti gambar desain** (tambahan) | Navbar dipecah jadi dua bagian terpisah: (a) **logo di kiri sebagai "tab" putih yang menggantung dari tepi atas layar** — kotak putih tegak, sudut bawah membulat, berisi logo TSA IPB lengkap (daun + tulisan TANOTO SCHOLARS ASSOCIATION IPB UNIVERSITY); (b) **pill navigasi di kanan** berwarna kaca hijau dengan garis tepi tipis, berisi menu + tombol **"Hubungi Kami" bergaya garis (outline)** di ujung kanan, bukan tombol emas. Saat di-scroll, tab logo mengecil sedikit dan pill tetap kaca hijau. Di HP: tab logo kiri + tombol menu kanan. | `src/components/site-header.tsx`, `src/components/logo.tsx` |
| 9 | Hapus sementara **kolom angka** (42 Pengurus, 5 Divisi, 40+ Program, 1 Keluarga) | Section statistik dihapus dari Beranda. Data angka di tabel `settings` tidak dihapus (bisa dipakai lagi nanti). | `page.tsx` |

## 2. Urutan Beranda setelah revisi
1. Hero (foto bersama + overlay, judul "Berdaya, Berkarya, DIGDAYA!", tanpa label kecil)
2. Kenali lebih dekat (video besar menempel kiri + teks)
3. Pita sorotan (2 baris bergerak)
4. TSA IPB Berdampak (peta)
5. Cerita Mereka tentang TSA IPB (carousel besar ala referensi)
6. Program TSA IPB
7. Kisah Inspiratif
8. Kabar Terbaru
9. FAQ
10. CTA → Footer

## 3. Perlu konfirmasi
1. **Kisah Inspiratif & Kabar Terbaru saat belum ada artikel** — supaya layout tetap terlihat seperti referensi, usul saya: tampilkan kerangka kartu abu-abu yang sama persis dengan referensi + satu kalimat "Kisah pertama segera hadir" / "Kabar pertama segera hadir" (tanpa judul/tanggal palsu). Begitu artikel terbit, kerangka otomatis berganti isi asli. Setuju, atau tetap disembunyikan?
2. **Foto di kartu Cerita** — kartu besar butuh foto di kanan. Bila narasumber tidak punya foto, usul: pakai potongan foto bersama TSA (yang dipakai di hero) dengan overlay hijau. Setuju?
3. **Titik indikator** di bawah carousel Cerita (seperti referensi) — dipakai?
4. **Menu "Kontak"** — gambar navbar masih memuat "Kontak", padahal sebelumnya diminta dihapus. Usul: tetap dihapus (ikuti permintaan terakhir), sisanya persis seperti gambar. Setuju?

## 4. Yang tidak berubah
Hero foto + efek scroll, peta, pita sorotan, FAQ, CTA, admin, data Supabase.
