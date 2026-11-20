# PRD — Website Profil Tanoto Scholars Association IPB (TSA IPB)

| | |
|---|---|
| Versi | 1.1 (scope dipangkas untuk rilis cepat) |
| Tanggal | 20 November 2026 |
| Pemilik | Developer tunggal (TSA IPB) |
| Deadline | **Sabtu, 21 November 2026 ± 21.00 WIB, live di Vercel** (lihat §10) |
| Referensi | Figma "WEB TSA IPB", PPT Benchmarking TSA IPB, Drive "Kaleidoskop TSA IPB 2026 + Web" |

---

## 1. Latar Belakang

TSA IPB adalah organisasi penerima beasiswa Tanoto Foundation di IPB University dengan 42 pengurus aktif. Tagline-nya "Berdaya, Berkarya, Digdaya". Sampai sekarang belum ada kanal resmi yang memuat identitas, struktur, program kerja, dan dokumentasi organisasi di satu tempat. Website ini menjadi alat **branding** dan **pintu kolaborasi eksternal** untuk TSA IPB.

## 2. Tujuan & Non-Tujuan

### Tujuan
1. Menampilkan identitas TSA IPB secara konsisten sesuai brand guideline: visi, misi, nilai, dan budaya organisasi.
2. Menampilkan struktur organisasi dan program kerja tiap divisi beserta dokumentasinya.
3. Menyediakan kanal berita/blog dan galeri yang **bisa diperbarui pengurus lewat admin panel** tanpa coding.
4. Menyediakan form "Hubungi Kami" yang kirimannya diteruskan ke email organisasi.

### Non-Tujuan (di luar scope v1)
- Arsip kepengurusan per periode. Website hanya menampilkan **kepengurusan aktif**.
- Foto profil pengurus. Untuk sementara pengurus hanya ditampilkan dengan **nama + jabatan**.
- Hall of Fame / Best Staff of the Month. Gambar postingan IG dipakai sebagai referensi gaya visual saja.
- Versi bahasa Inggris (multi-bahasa).
- Hosting video sendiri. Video diambil dari YouTube (embed atau redirect).
- Domain kustom. Untuk sementara website memakai subdomain `*.vercel.app`.

## 3. Target Pengguna

| Persona | Kebutuhan |
|---|---|
| Calon mitra / sponsor / instansi eksternal | Memahami siapa TSA IPB, melihat dampak programnya, lalu menghubungi untuk kolaborasi |
| Tanoto Foundation & IPB | Melihat portofolio kegiatan dan kiprah organisasi |
| Mahasiswa / calon scholar (TELADAN) | Mengenal budaya, struktur, dan kegiatan TSA IPB |
| Pengurus TSA IPB (admin) | Memperbarui berita, program kerja, galeri, struktur, dan testimoni dengan mudah |

## 4. Sitemap

```
/                      Beranda
/tentang               Tentang Kami
/struktur              Struktur Organisasi
/program               Program Kerja (daftar per divisi)
/program/[slug]        Detail Program Kerja
/berita                Berita & Blog (termasuk Cerita Inspirasi)
/berita/[slug]         Detail artikel
/galeri                Galeri Dokumentasi
/kontak                Kontak & Sosial Media + form Hubungi Kami
/admin/*               Admin panel (terproteksi login)
```

Navbar: Beranda · Tentang Kami · Struktur Organisasi · Program Kerja · Berita & Blog · Galeri · Kontak · **[Hubungi Kami]** (tombol CTA, mengarah ke `/kontak#form`).

## 5. Spesifikasi Halaman Publik

### 5.1 Beranda (`/`)
Urutan section mengikuti Figma:
1. **Hero**: judul "Berkarya, Berdaya, DIGDAYA!", subjudul "TSA IPB 2026", deskripsi singkat, 2 tombol: *Kenali Kami Lebih Jauh* → `/tentang` dan *Program Kami* → `/program`.
2. **Statistik**: 4 kartu angka, misalnya 42 Pengurus, 5 Divisi, 20+ Program, dan jumlah kegiatan. Angka bisa diubah di admin (Pengaturan).
3. **Lebih dekat dengan TSA IPB**: thumbnail video profil (klik → buka YouTube di tab baru) dan teks perkenalan.
4. **Lokasi**: peta Indonesia dengan penanda di **Bogor, Jawa Barat**. Peta ini statis/ilustratif, dengan judul "Program & Kegiatan Terbaru".
5. **Program Unggulan**: 3 kartu proker unggulan. Ini mengisi grid 3 kartu di Figma; proker ditandai `featured` di admin.
6. **Apa kata mereka tentang TSA?**: carousel testimoni (kutipan, nama, peran).
7. **Berita Terbaru / Cerita Inspirasi**: carousel 4 artikel terbaru dan tombol "Lihat semua".
8. **CTA**: "Mari Berkolaborasi untuk negeri!" → form Hubungi Kami.
9. **Footer**: logo, deskripsi singkat, tautan LinkedIn (Tanoto Scholars Association IPB), Instagram (@tsaipb), LINE (@ogh5044d), dan copyright.

### 5.2 Tentang Kami (`/tentang`)
- **Sejarah Singkat**: teks + gambar.
- **Profil**: 42 pengurus aktif; posisi leader diisi angkatan 2025, mayoritas pengurus berasal dari TELADAN 2026. Fokusnya kepemimpinan yang merata: setiap anggota menjadi penanggung jawab kegiatan. Budaya kekeluargaan yang disertai profesionalitas.
- **Visi**: "Menjadikan TSA IPB sebagai ruang yang menyenangkan untuk tumbuh dan berekspresi, yang memberikan dampak positif bagi individu maupun masyarakat, melalui perpaduan antara kehangatan keluarga dan profesionalisme."
- **Misi** (4 poin):
  1. Membangun lingkungan yang inklusif dan suportif bagi seluruh anggota agar merasa dihargai dan termotivasi untuk berkembang.
  2. Menciptakan suasana penuh rasa hormat, kepercayaan, dan komunikasi yang terbuka.
  3. Memfasilitasi pertumbuhan dengan menyediakan kesempatan untuk belajar, memimpin, dan berkembang, baik sebagai individu maupun tim.
  4. Menetapkan identitas organisasi yang kuat melalui branding yang konsisten dan kemitraan yang bermakna.
- **8 Nilai TELADAN**: grid nilai *(isi menunggu materi dari tim)*.
- **Filosofi Logo**: penjelasan elemen logo *(isi menunggu materi dari brand guideline)*.

### 5.3 Struktur Organisasi (`/struktur`)
- **Bagan**:
  - Executive Board: President, Vice President, Secretary 1 & 2, Treasurer 1 & 2.
  - Di bawahnya 5 divisi: Media & Design, Branding & External, Social Project, Talent Improvement, Talent Engagement.
  - Setiap divisi terdiri dari Director, Secretary, Treasurer, dan Staff.
- **Daftar pengurus per divisi**: kartu nama + jabatan, tanpa foto (v1). Data berasal dari tabel `members` di admin.
- **Alur Koordinasi** (diagram sederhana): Project/Proker → EB → Director & Sekretaris-Bendahara → PIC → Lead divisi → Member.
- *(Opsional)* Alur Evaluasi: Staff dievaluasi oleh Support Agent, Leads oleh Steering Committee, berujung pada EB Evaluation / Surat Peringatan. Bagian ini bisa disembunyikan jika dianggap terlalu internal.

### 5.4 Program Kerja (`/program`, `/program/[slug]`)
- **Halaman daftar**: tab/filter per divisi. Setiap divisi menampilkan deskripsi divisi, *core values*, dan kartu proker.
- **Detail proker**: judul, divisi, deskripsi lengkap, tujuan/latar belakang, waktu pelaksanaan, galeri foto proker, dan tautan video YouTube (opsional).
- **Data awal** (dari PPT; deskripsi lengkap diambil dari folder Drive "Deskripsi Program Kerja"):

| Divisi | Deskripsi | Core Values | Program Kerja |
|---|---|---|---|
| Executive Board | Badan pengurus harian yang mengoordinasikan dan mengawasi jalannya organisasi | Integrity, Driven, Empower Others | New Gen Onboarding, EB Hearing, Meet TSA, Monthly Tracking Report & Evaluation, Handover, Leads Meeting/Month, Steering Committee |
| Talent Improvement | Memetakan kemampuan anggota dan menyediakan wadah untuk upgrade diri | Continuous Learning, Empower Others | Monthly Tracking Report & Evaluation, Quarter Evaluation, Support Agent, Best Staff of The Year, Best of The Month, Best of The Quarter, Best of Division, Upgrading Connection |
| Talent Engagement | Membangun internalisasi, kehangatan, dan rasa saling memiliki melalui apresiasi dan kepedulian | Care for Others, Empower Others | New Gen Onboarding, TOAST, TSA Chill, TSA Study, T-Celebrate, T-Appreciate, Handover, T-Graduate, TSAgustusan, TSA Journey |
| Branding & External | Meningkatkan visibilitas dan citra positif TSA IPB serta memperkuat hubungan eksternal | Continuous Learning, Empower Others, Entrepreneurial Spirits | Press Release & Live Report, Sosmed Specialist, Stealing Attention, TSA-DAY, Sosialisasi x RA, Seeking Future, Upgrading Connection |
| Media & Design | Membangun identitas organisasi, mengolah visual, dan menyampaikan cerita kegiatan | Integrity, Empower Others, Entrepreneurial Spirits | MD Assist (COPM), Portrait of Leadership, Company Profile, MD Skills Upgrade, Kaleidoskop, MD Bond |
| Social Project | Mendorong pengembangan masyarakat yang sistematis dan berkelanjutan | Care for Others, Empower Others | Signature Project, SDG's of The Month, Micro Project #1: Lingkungan, Micro Project #2: Sosial, Pay it Forward x Lead Others |

- **Proker unggulan** (kandidat `featured`):
  - Micro Project #1 Lingkungan: edukasi pengelolaan sampah lewat permainan ular tangga.
  - Micro Project #2 Sosial: kepedulian kesehatan mental lewat permainan jenga.
  - Upgrading Connection "The Executive Blueprint": personal branding, strategic networking, dan resiliensi.

### 5.5 Berita & Blog (`/berita`, `/berita/[slug]`)
- "Berita" dan "Cerita Inspirasi" adalah **satu tipe konten** (artikel), dengan kategori opsional.
- Halaman daftar: grid kartu (cover, judul, tanggal, ringkasan) dengan paginasi.
- Halaman detail: cover, judul, tanggal, penulis, isi rich text, dan tombol share (salin tautan, WhatsApp).
- SEO: meta title/description dan Open Graph image per artikel.

### 5.6 Galeri (`/galeri`)
- Grid foto masonry dengan filter per divisi atau per proker, plus lightbox saat foto diklik.
- Video ditampilkan sebagai kartu thumbnail YouTube yang membuka YouTube.

### 5.7 Kontak (`/kontak`)
- Info kontak: email organisasi, alamat (IPB Dramaga, Bogor), dan tautan LinkedIn, Instagram, serta LINE.
- **Form Hubungi Kami** (`#form`): nama, email, instansi (opsional), keperluan (Kolaborasi / Sponsorship / Media / Lainnya), dan pesan.
  - Saat dikirim: pesan disimpan ke database, **email diteruskan ke email organisasi**, dan pengirim melihat pesan sukses.
  - Proteksi spam: honeypot field + rate limit per IP + validasi server-side.

## 6. Spesifikasi Admin Panel (`/admin`)

**Akses**: login email + password (Supabase Auth). Tidak ada pendaftaran publik; akun admin dibuat manual oleh developer. Satu peran (`admin`) sudah cukup untuk v1.

**Rilis 21 Nov (v1) — admin inti:**

| Modul | Fitur |
|---|---|
| Berita | CRUD artikel: judul, slug otomatis, cover, kategori, ringkasan, isi, status Draft/Terbit, tanggal terbit. Editor isi memakai textarea Markdown + pratinjau (rich text editor ditunda) |
| Program Kerja | Edit proker: divisi, judul, ringkasan, detail, waktu, featured, link YouTube, cover. Tambah/hapus proker |
| Galeri | Upload banyak foto sekaligus, caption, tag divisi/proker, hapus. Gambar dikompres di browser sebelum upload (maks ~1600px, WebP) |

**Sementara via Supabase Table Editor** (dibuatkan modul admin setelah rilis, v1.1):

| Modul | Isi |
|---|---|
| Pengurus | nama, jabatan, divisi, urutan tampil |
| Divisi | deskripsi divisi dan core values |
| Testimoni | kutipan, nama, peran, tampil/sembunyikan |
| Pesan Masuk | pesan dari form (juga sudah terkirim ke email) |
| Pengaturan | angka statistik beranda, link video YouTube, email tujuan form |
| Dashboard | ditunda |

Perubahan dari admin langsung tampil di website lewat revalidasi on-demand (`revalidatePath`), tanpa perlu redeploy.

## 7. Model Data (Supabase / PostgreSQL)

```
divisions     (id, slug, name, short_name, description, core_values text[], order)
members       (id, name, position, division_id → divisions, order)
programs      (id, slug, title, division_id → divisions, summary, content, period,
               youtube_url, is_featured, cover_url, created_at, updated_at)
posts         (id, slug, title, category, cover_url, excerpt, content,
               status 'draft'|'published', published_at, author, created_at, updated_at)
gallery       (id, image_url, caption, division_id?, program_id?, created_at)
testimonials  (id, quote, name, role, is_visible, order)
messages      (id, name, email, organization, purpose, body, is_read, created_at)
settings      (key, value jsonb)   -- stats, youtube_url, socials, contact_email
```

- **RLS**: publik hanya boleh `SELECT` konten yang terbit, dan hanya boleh `INSERT` ke `messages` lewat server action. Admin yang terautentikasi boleh semua operasi.
- **Storage**: bucket `media` (publik baca, tulis hanya admin).

## 8. Arsitektur & Stack

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSG/ISR bagus untuk SEO dan halaman publik cepat; admin dan API cukup di satu repo |
| Styling | **Tailwind CSS** + shadcn/ui (untuk admin) | Cepat untuk developer tunggal, mudah mengikuti token warna brand |
| Database, Auth, Storage | **Supabase** (free tier) | Postgres + Auth + Storage dalam satu layanan, gratis, tanpa server terpisah |
| Email form | **Resend** (free tier, 3.000 email/bulan) | API sederhana dari server action |
| Rich text | Tiptap | Editor artikel yang ringan |
| Hosting | **Vercel** (Hobby) | Gratis, deploy otomatis dari GitHub; domain kustom bisa ditambahkan nanti |

Biaya bulanan: **Rp0** (semua free tier). Biaya yang direncanakan hanya domain di kemudian hari.

**Alternatif lebih cepat** (jika deadline terlalu mepet): Payload CMS atau Sanity Studio, yang menyediakan admin panel jadi. Ditolak untuk v1 karena Anda ingin admin panel sendiri; opsi ini tetap menjadi cadangan.

## 9. Kebutuhan Non-Fungsional

| Aspek | Target |
|---|---|
| Performa (mobile, 4G) | LCP < 2,5 dtk · INP < 200 ms · CLS < 0,1 · Lighthouse Performance ≥ 90 |
| SEO | Lighthouse SEO ≥ 95, sitemap.xml, robots.txt, meta + OG per halaman |
| Aksesibilitas | Lighthouse a11y ≥ 90, kontras teks sesuai WCAG AA, navigasi keyboard, alt text gambar wajib di admin |
| Responsif | 360px (mobile) hingga 1440px (desktop); navbar menjadi menu hamburger di mobile |
| Ketersediaan | Mengikuti SLA Vercel/Supabase (~99,9%) |
| Keamanan | Route `/admin` dilindungi middleware, RLS aktif, secret hanya di env Vercel, form dengan honeypot + rate limit |
| Bahasa | Bahasa Indonesia |

**Desain**: mengikuti Figma dan brand guideline TSA IPB. Palet: hijau tua (utama), emas/khaki (aksen), sage, abu-abu muda, dan putih. Gaya visual mengikuti postingan IG TSA IPB: kartu putih membulat, ornamen kontur, dan aksen emas.

## 10. Rencana Kerja (rilis Sabtu 21 Nov, ± 21.00)

| Waktu | Fokus | Hasil | Pelaku |
|---|---|---|---|
| ✅ Jumat malam | Setup | Next.js + Tailwind, SQL skema/RLS/seed, data layer, token warna, navbar + footer | Claude |
| Sabtu pagi (paralel) | Infrastruktur | Proyek Supabase (jalankan SQL), `.env.local`, akun admin, repo GitHub + Vercel, akun Resend; kumpulkan konten (logo, nama pengurus, deskripsi proker, foto terpilih) | **Anda** |
| 08.00–12.00 | Halaman publik I | Beranda lengkap, Tentang Kami, Struktur Organisasi, Program Kerja (daftar + detail) | Claude |
| 12.00–15.00 | Halaman publik II | Berita (daftar + detail), Galeri + lightbox, Kontak + form → email (Resend) | Claude |
| 15.00–18.00 | Admin inti | Login, CRUD Berita, edit Program Kerja, upload Galeri | Claude |
| 18.00–20.00 | Konten | Input konten lewat admin & Table Editor, kompres foto | Anda + Claude |
| 20.00–21.00 | QA & rilis | Cek HP/desktop, Lighthouse, sitemap/robots, deploy produksi | Claude |

**Prioritas jika waktu kurang** (dipotong dari bawah): filter galeri → pratinjau Markdown → admin Galeri (upload sementara via Supabase Storage) → admin Program Kerja (edit via Table Editor). Halaman publik dan form kontak **tidak** dipotong.

## 11. Kriteria Selesai (Definition of Done)
- Semua 8 halaman publik tampil dan responsif di mobile dan desktop.
- Admin bisa login, lalu menambah, mengubah, dan menghapus artikel, proker, dan foto galeri; perubahan tampil di website ≤ 1 menit. Pengurus, testimoni, divisi, dan pengaturan bisa diubah lewat Supabase Table Editor dan tampil di website.
- Form Hubungi Kami mengirim email ke alamat organisasi.
- Target Lighthouse di §9 tercapai di halaman Beranda.
- Website live di URL Vercel.

## 12. Hal Terbuka (TBD)
- [ ] Isi 8 Nilai TELADAN dan Filosofi Logo.
- [ ] Teks Sejarah Singkat TSA IPB.
- [ ] Email organisasi tujuan form.
- [ ] Link video profil YouTube.
- [ ] Daftar nama 42 pengurus beserta jabatan.
- [ ] Isi testimoni (siapa saja yang dikutip).
- [ ] Desain halaman selain Beranda masih kerangka di Figma; akan mengikuti pola komponen Beranda.
