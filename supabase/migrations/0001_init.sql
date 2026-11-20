-- TSA IPB — skema awal
-- Jalankan di Supabase Dashboard → SQL Editor (atau `supabase db push`).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helper: updated_at otomatis
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- Admin: daftar user yang boleh mengelola konten
-- ---------------------------------------------------------------------------
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Konten
-- ---------------------------------------------------------------------------
create table public.divisions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_name text not null,
  description text not null default '',
  core_values text[] not null default '{}',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  division_id uuid not null references public.divisions (id) on delete cascade,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  division_id uuid not null references public.divisions (id) on delete restrict,
  summary text not null default '',
  content text not null default '',
  period text,
  youtube_url text,
  cover_url text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'Berita',
  cover_url text,
  excerpt text not null default '',
  content text not null default '',
  author text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  alt text not null default '',
  division_id uuid references public.divisions (id) on delete set null,
  program_id uuid references public.programs (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null default '',
  is_visible boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  organization text check (char_length(organization) <= 200),
  purpose text not null default 'Lainnya',
  body text not null check (char_length(body) between 1 and 5000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Indexes
create index on public.members (division_id, sort_order);
create index on public.programs (division_id, sort_order);
create index on public.programs (is_featured) where is_featured;
create index on public.posts (status, published_at desc);
create index on public.gallery (division_id);
create index on public.gallery (program_id);
create index on public.messages (is_read, created_at desc);

-- Triggers updated_at
create trigger trg_divisions_updated before update on public.divisions for each row execute function public.set_updated_at();
create trigger trg_members_updated   before update on public.members   for each row execute function public.set_updated_at();
create trigger trg_programs_updated  before update on public.programs  for each row execute function public.set_updated_at();
create trigger trg_posts_updated     before update on public.posts     for each row execute function public.set_updated_at();
create trigger trg_settings_updated  before update on public.settings  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.admins       enable row level security;
alter table public.divisions    enable row level security;
alter table public.members      enable row level security;
alter table public.programs     enable row level security;
alter table public.posts        enable row level security;
alter table public.gallery      enable row level security;
alter table public.testimonials enable row level security;
alter table public.messages     enable row level security;
alter table public.settings     enable row level security;

-- admins: user hanya bisa melihat barisnya sendiri (untuk cek status admin)
create policy "admins read self" on public.admins for select using (user_id = auth.uid());

-- Publik: baca konten
create policy "public read divisions"    on public.divisions    for select using (true);
create policy "public read members"      on public.members      for select using (true);
create policy "public read programs"     on public.programs     for select using (is_published or public.is_admin());
create policy "public read posts"        on public.posts        for select using (status = 'published' or public.is_admin());
create policy "public read gallery"      on public.gallery      for select using (true);
create policy "public read testimonials" on public.testimonials for select using (is_visible or public.is_admin());
create policy "public read settings"     on public.settings     for select using (true);

-- Admin: tulis semua konten
create policy "admin write divisions"    on public.divisions    for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write members"      on public.members      for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write programs"     on public.programs     for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write posts"        on public.posts        for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write gallery"      on public.gallery      for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write settings"     on public.settings     for all using (public.is_admin()) with check (public.is_admin());

-- messages: publik boleh kirim (insert), hanya admin yang baca/ubah/hapus
create policy "public insert messages" on public.messages for insert with check (is_read = false);
create policy "admin read messages"    on public.messages for select using (public.is_admin());
create policy "admin update messages"  on public.messages for update using (public.is_admin()) with check (public.is_admin());
create policy "admin delete messages"  on public.messages for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket untuk gambar
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media"  on storage.objects for select using (bucket_id = 'media');
create policy "admin insert media" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "admin update media" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "admin delete media" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());
