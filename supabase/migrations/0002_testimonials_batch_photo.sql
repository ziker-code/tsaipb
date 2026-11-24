-- TSA IPB — testimoni: angkatan (mis. "TLD 27") dan foto opsional
-- Jalankan di Supabase Dashboard → SQL Editor. Aman dijalankan ulang.

alter table public.testimonials add column if not exists batch text not null default '';
alter table public.testimonials add column if not exists photo_url text;
