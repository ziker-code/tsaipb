# Rencana Frontend Interaktif & Motion — TSA IPB

| | |
|---|---|
| Status | **Dikerjakan & dirilis (lihat docs/updates/2026-11-21-v2-frontend.md)** |
| Tanggal | 21 November 2026 |
| Dasar | Desain UI/UX tim (`logo/Beranda — TSA IPB 2026.png`), logo di `logo/`, Filosofi Logo, referensi motion (screenshot FAQ dari Pinterest) |
| Website saat ini | https://tsaipb.vercel.app (v1, sudah live) |

---

## 1. Tujuan

1. Menyamakan tampilan website dengan desain UI/UX tim: struktur Beranda, warna, tipografi, dan logo resmi.
2. Menambahkan **interaksi dan animasi** supaya website terasa hidup dan premium, tanpa mengorbankan kecepatan dan aksesibilitas.
3. Menampilkan identitas setiap divisi lewat logo dan warna masing-masing.
4. Mendokumentasikan setiap update dalam Markdown (§8).

## 2. Aset yang diterima

| File | Isi | Rencana pemakaian |
|---|---|---|
| `Logo TSA IPB.png` (4168×4167) | Logo utama: daun gradasi hijau-emas + wordmark | Navbar, footer, login admin, favicon, OG image |
| `Copy of Tanoto logo-green.png` | Logo Tanoto Foundation | Footer / section "Didukung oleh" |
| `Copy of 1TELADAN - WHITE.png` | Logo TELADAN (putih) | Footer / hero di atas latar hijau |
| `EB.png` `TI.png` `TE.png` `BE.png` `MD.png` `SP.png` (1280×720, latar putih) | Logo 6 divisi | Halaman Struktur, Program Kerja (tab), kartu proker, detail proker |
| `Beranda — TSA IPB 2026.png` | Desain Beranda terbaru | Acuan layout (§4) |
| Filosofi Logo (gambar di chat) | 4 makna elemen logo | Section interaktif di Tentang Kami (§5) |

**Pemrosesan aset:** logo divisi akan dipotong otomatis (trim) dan latar putihnya dihapus dengan `sharp` (sudah tersedia), lalu disimpan sebagai WebP transparan di `public/brand/`. EB, TE, dan TI punya bayangan abu-abu, sehingga hasil hapus latar bisa menyisakan sedikit halo. Hasil terbaik didapat kalau tim bisa memberikan **PNG transparan atau SVG** (lihat §9).

## 3. Design tokens

### Warna inti (dari desain tim + logo)

| Token | Nilai (perkiraan dari desain) | Pemakaian |
|---|---|---|
| `brand-700` | `#00663D` | Latar hero, footer, section peta |
| `brand-600` | `#0E8A57` | Hover, aksen hijau terang (gradasi logo) |
| `gold-500` | `#B5A66C` | "TSA IPB 2026", kartu testimoni, wordmark "IPB UNIVERSITY" |
| `gray-200` | `#D9D9D9` | Kartu statistik, placeholder |
| `ink` | `#0F2A1E` | Teks utama |
| putih | `#FFFFFF` | Latar konten |

Nilai hex final diambil dari Figma (Inspect) begitu tersedia. Token yang sudah ada di `globals.css` cukup disesuaikan, tidak perlu ditulis ulang.

### Warna aksen divisi (dari logo)

| Divisi | Warna | Hex (perkiraan) |
|---|---|---|
| Executive Board (EB) | Magenta | `#B0185E` |
| Talent Improvement (TI) | Biru | `#2C6FE8` |
| Talent Engagement (TE) | Ungu | `#B45CE0` |
| Branding & External (BE) | Oranye-kuning | `#F59E0B` |
| Media & Design (MD) | Merah | `#E0141B` |
| Social Project (SP) | Tosca | `#3FBFA8` |

Warna divisi **hanya dipakai sebagai aksen** (garis, chip, glow di belakang logo, warna tab aktif). Warna utama website tetap hijau dan emas supaya tetap satu identitas.

### Tipografi
- Desain tim memakai sans-serif geometris tebal untuk judul dan sans-serif bersih untuk isi. **Nama font pastinya perlu dicek di Figma** (§9).
- Sampai dikonfirmasi, website tetap memakai Montserrat (judul) + Inter (isi), yang bentuknya paling dekat.

### Bentuk
- Hero berakhir dengan **lengkung gelombang** (bukan garis lurus), dan kartu statistik menumpang di lengkungan itu.
- Kartu radius ±16px. Tombol outline putih di atas hijau dan tombol putih solid.

## 4. Struktur Beranda baru (mengikuti desain tim)

| # | Section | Perubahan dari v1 | Motion |
|---|---|---|---|
| 1 | **Hero** "Berkarya, Berdaya, DIGDAYA!" | Tambah lengkung bawah; logo daun besar dekoratif | Judul muncul per baris (masking reveal); logo daun "tumbuh" (scale + rotate halus) dan butiran benih melayang pelan |
| 2 | **Statistik** (4 kartu) | Kartu di atas lengkung hero | **Count-up** angka saat terlihat |
| 3 | **Kenali Lebih Dekat TSA IPB** | Video kiri + paragraf kanan; kata kunci ditebalkan hijau | Paragraf muncul per kata (highlight mengikuti scroll) |
| 4 | **Pita Galeri** + tombol "Jelajahi Galeri" | **Baru**: strip foto lebar penuh | **Marquee** foto bergerak otomatis (berhenti saat di-hover); parallax ringan |
| 5 | **TSA IPB Berdampak** (peta) | Judul berubah; peta lebih besar | Peta muncul dengan fade+scale, penanda Bogor berdenyut, provinsi menyala saat di-hover |
| 6 | **Cerita Mereka tentang TSA IPB** | Kartu emas, foto bulat, nama + angkatan ("TLD 27") | Carousel bisa digeser (drag/swipe), kartu tengah membesar |
| 7 | **Program TSA IPB** (3 kartu tinggi) | Kartu potret dengan label di bawah | Kartu muncul berurutan (stagger); hover: kartu terangkat, gambar zoom, logo divisi muncul |
| 8 | **Kisah Inspiratif** | **Baru, terpisah dari berita**: artikel kategori "Cerita Inspirasi" + tombol ←/→ dan "Lihat Semua" | Carousel horizontal dengan tombol panah dan drag |
| 9 | **Kabar Terbaru** | **Baru**: 1 berita besar + 3 berita daftar (kategori "Berita") | Fade-up berurutan; hover gambar zoom |
| 10 | **FAQ** *(opsional, gaya referensi)* | **Baru**: dua kolom seperti screenshot referensi | Accordion: tinggi animasi halus, ikon + berputar jadi − |
| 11 | **CTA "Mari Berkolaborasi untuk Negeri!"** | Tetap | Latar gradasi bergerak pelan, tombol magnetis |
| 12 | **Footer** | Kolom Organisasi / Program / Informasi + ikon IG, LinkedIn, **TikTok**, LINE | — |

## 5. Halaman lain

| Halaman | Peningkatan |
|---|---|
| **Tentang Kami** | Section **Filosofi Logo interaktif**: logo di tengah, 4 kartu makna. Hover/tap salah satu kartu menyorot bagian logo yang dimaksud (tunas, figur manusia, daun & benih, garis paralel), sementara bagian lain meredup. Di mobile berubah jadi stepper geser. Visi-misi muncul berurutan saat scroll. |
| **Struktur Organisasi** | Bagan dengan **logo divisi**; klik divisi membuka panel anggota dengan warna aksen divisi. Garis penghubung bagan "tergambar" saat scroll. |
| **Program Kerja** | Tab divisi memakai logo + warna divisi, dan tab aktif punya indikator yang bergeser halus (shared layout). Kartu proker berganti dengan animasi saat tab diganti. |
| **Detail Proker** | Header memakai warna aksen dan logo divisi; galeri dokumentasi memakai lightbox yang sama. |
| **Berita / Galeri / Kontak** | Animasi reveal seragam; galeri dengan transisi lightbox zoom dari thumbnail. |
| **Global** | Navbar mengecil dan memburam saat scroll; transisi halaman halus; tombol "kembali ke atas"; loading skeleton konsisten. |

## 6. Sistem motion

### Prinsip
1. **Bermakna, bukan hiasan.** Animasi menuntun mata ke konten, bukan mengalihkannya.
2. **Cepat.** Durasi 200–600 ms, easing `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out halus). Tidak ada animasi yang menahan pengguna lebih dari 1 detik.
3. **Hormati preferensi pengguna.** Bila `prefers-reduced-motion` aktif, semua animasi gerak diganti fade sederhana atau dimatikan.
4. **Hanya `transform` dan `opacity`**, supaya animasi tetap 60 fps dan tidak memicu layout ulang (CLS tetap 0).

### Teknologi

| Kebutuhan | Pilihan | Alasan |
|---|---|---|
| Animasi komponen, scroll reveal, carousel drag, shared layout (tab) | **Motion** (`motion/react`, v14) | Standar React, mendukung reduced-motion, bisa di-import per fitur supaya bundle kecil |
| Marquee, denyut peta, gradasi bergerak | **CSS murni** (`@keyframes`) | Tanpa JavaScript, paling ringan |
| Smooth scroll | **Tidak dipakai** di v2 | Mengganggu aksesibilitas dan scroll di HP; bisa ditambahkan nanti bila diminta |

Seluruh animasi dibungkus komponen kecil yang bisa dipakai ulang (`<Reveal>`, `<Stagger>`, `<CountUp>`, `<Marquee>`, `<Carousel>`, `<Accordion>`, `<Magnetic>`) di `src/components/motion/`. Section tetap Server Component; hanya pembungkus animasinya yang Client Component.

### Target terukur (dicek setiap rilis)

| Metrik | Target (HP 4G, p75) |
|---|---|
| LCP | < 2,5 dtk |
| INP | < 200 ms |
| CLS | < 0,1 |
| JavaScript tambahan untuk motion | ≤ 45 KB gzip per halaman |
| Lighthouse Performance / Accessibility | ≥ 90 / ≥ 95 |

## 7. Tahapan

| Fase | Isi | Hasil |
|---|---|---|
| **F0. Fondasi** | Proses logo → `public/brand/`; pasang logo resmi di navbar/footer/favicon; token warna & font final; pasang Motion; komponen motion dasar | Logo asli tampil, motion siap dipakai |
| **F1. Beranda** | Susun ulang 12 section sesuai desain tim + semua motion di §4 | Beranda baru |
| **F2. Tentang & Struktur** | Filosofi Logo interaktif, bagan dengan logo divisi | — |
| **F3. Program, Berita, Galeri** | Tab divisi bertema warna, kartu dan lightbox beranimasi | — |
| **F4. Global polish** | Navbar scroll, transisi halaman, tombol ke atas, cek reduced-motion | — |
| **F5. QA & rilis** | Uji HP/desktop, Lighthouse, cek target §6, deploy | Rilis v2 |

Setiap fase di-deploy terpisah, jadi website live selalu dalam keadaan utuh.

**Data baru yang dibutuhkan:**
- Testimoni perlu kolom angkatan ("TLD 27") dan foto (opsional): **migrasi kecil** di tabel `testimonials`.
- Footer perlu link TikTok.
- FAQ: bisa disimpan statis di kode untuk v2.

## 8. Dokumentasi setiap update

Setiap kali ada update, saya menambahkan satu file Markdown:

```
docs/
  PRD.md                 ← kebutuhan produk (sudah ada)
  FRONTEND-PLAN.md       ← dokumen ini
  CHANGELOG.md           ← indeks semua update, terbaru di atas
  updates/
    2026-11-21-frontend-plan.md
    2026-11-2x-f0-fondasi.md
    ...
```

Isi setiap file update:
1. **Ringkasan** — apa yang berubah dan kenapa.
2. **File yang diubah** — daftar file + penjelasan singkat.
3. **Keputusan** — pilihan yang diambil dan alasannya.
4. **Cara cek** — URL/halaman yang bisa dibuka untuk melihat hasil.
5. **Belum selesai / catatan** — apa yang masih tertunda.
6. **Commit & deploy** — hash commit dan URL deploy.

Sebelum mengerjakan update berikutnya, saya membaca `CHANGELOG.md` dan file update terakhir dulu, supaya pekerjaan tetap mengikuti kondisi terbaru.

## 9. Keputusan (sudah dijawab 21 Nov)

Font **Sora** · logo divisi dihapus latarnya otomatis · referensi motion dari rekaman layar · FAQ dipakai (lorem ipsum dulu) · warna divisi sebagai aksen disetujui · deadline malam ini · ikon wajib **Famicons** · gaya elegan & minimalis.

<details><summary>Pertanyaan awal</summary>


1. **Font**: nama font judul dan isi di Figma desain tim (lihat panel Inspect / Text di Figma).
2. **Logo divisi transparan**: apakah tim bisa memberikan PNG transparan atau SVG? Kalau tidak, saya hapus latar putihnya otomatis (dengan risiko sedikit halo pada EB, TE, TI).
3. **Referensi Pinterest**: pin-nya butuh login sehingga tidak bisa saya buka. Kirim screenshot atau rekaman layar animasinya, atau sebutkan efek yang paling disukai. Saat ini acuannya screenshot FAQ (layout dua kolom, accordion bersih).
4. **Section FAQ**: dipakai atau tidak? Kalau ya, apa saja pertanyaannya?
5. **Warna divisi sebagai aksen**: setuju dipakai seperti §3?
6. **Deadline v2.**

</details>
