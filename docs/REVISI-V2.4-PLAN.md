# Rencana Revisi v2.4 — Margin kiri-kanan lebih rapat

| | |
|---|---|
| Status | **Dikerjakan & dirilis (v2.4)** |
| Tanggal | 25 November 2026 |
| Dasar | Screenshot halaman Partners tanotofoundation.org + desain UI/UX tim (Beranda) |
| Kondisi saat ini | v2.3 live |

## 1. Pengukuran

| Sumber | Lebar layar | Ruang kosong kiri/kanan | Lebar isi |
|---|---|---|---|
| **Website sekarang** | 1440px | **±144px** per sisi (wadah `max-w-6xl` = 1152px, padding 32px) | ±1088px (±76%) |
| Desain tim (Figma) | 1440px | **±54–90px** per sisi (kartu statistik mulai ±54px dari tepi, judul ±90px) | ±1300px (±90%) |
| tanotofoundation.org | 1838px | ±185px per sisi | ±1475px (±80%) |

**Temuan:** secara persentase, margin Tanoto mirip dengan website kita. Yang membuat Tanoto **terasa** lebih penuh adalah **isinya memenuhi lebar wadah**: paragraf pembuka membentang hampir selebar konten, dan grid partner terisi 5 kolom. Di website kita banyak paragraf & judul dibatasi lebar sempit (`max-w-xl` ±576px, `max-w-lg` ±512px), sehingga sisi kanan setiap section terlihat kosong. Desain tim bahkan lebih rapat dari Tanoto.

## 2. Perubahan yang diusulkan

| # | Perubahan | Detail | File |
|---|---|---|---|
| 1 | **Wadah konten lebih lebar** | `Container`: `max-w-6xl` (1152px) → **`max-w-[88rem]` (1408px)**, padding `px-5 → sm:px-8 → lg:px-12`. Hasil di layar 1440px: margin **±64px** per sisi, isi **±1312px** (sesuai desain tim). Di layar lebih besar (1920px) margin ikut membesar, isi tetap maks. 1312px agar baris tidak terlalu panjang. | `src/components/ui.tsx` |
| 2 | **Navbar & footer selebar wadah baru** | Tab logo sejajar tepi kiri konten, pill menu sejajar tepi kanan konten. | `site-header.tsx`, `site-footer.tsx` |
| 3 | **Teks memenuhi lebar** (pola Tanoto) | Paragraf pembuka hero, deskripsi section, paragraf "Kenali Lebih Dekat", visi/misi di Tentang dilebarkan (`max-w-lg/xl` → ±`max-w-3xl/4xl`, atau penuh untuk kalimat pembuka besar seperti Tanoto). Judul hero dibiarkan maks. 2 baris. | `page.tsx`, `ui.tsx`, `tentang/page.tsx`, `program-browser.tsx` |
| 4 | **Grid ikut melebar** | Kartu Program 3 kolom, Kisah Inspiratif (kartu lebih lebar, 4 terlihat penuh), Kabar Terbaru, pita sorotan, peta — otomatis lebih besar karena wadah melebar. Kartu Cerita: `min(70rem, 86vw)` → **`min(82rem, 90vw)`**. | `page.tsx`, `testimonial-carousel.tsx` |
| 5 | **Section "Kenali Lebih Dekat"** | Video tetap menempel tepi kiri layar; kolom teks kanan diselaraskan dengan tepi kanan wadah baru (tidak menyisakan ruang kosong di kanan). | `page.tsx` |
| 6 | **Halaman lain** | Tentang, Struktur, Program, Berita, Galeri, Kontak otomatis ikut karena memakai `Container` yang sama. Halaman baca artikel (detail berita) **tetap sempit** (±768px) supaya nyaman dibaca. | — |
| 7 | **Mobile** | Tetap 20px kiri-kanan (sudah rapat). | — |

## 3. Yang tidak berubah
Warna, font, navbar desain, animasi, isi, admin.

## 4. Perlu konfirmasi
1. **Seberapa rapat?** Usul: margin **±64px** di layar 1440px (sesuai desain tim). Alternatif lebih rapat: ±40px (isi ±1360px).
2. **Paragraf pembuka besar ala Tanoto** — mau ditambahkan satu kalimat pembuka besar yang membentang selebar konten (seperti "At Tanoto Foundation, we believe…") misalnya di atas section Program atau di halaman Tentang? Atau cukup melebarkan teks yang sudah ada?
