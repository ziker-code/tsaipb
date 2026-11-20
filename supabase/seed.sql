-- TSA IPB — data awal dari PPT Benchmarking
-- Jalankan setelah 0001_init.sql. Aman dijalankan ulang (upsert by slug/key).

-- Divisi --------------------------------------------------------------------
insert into public.divisions (slug, name, short_name, description, core_values, sort_order) values
  ('executive-board', 'Executive Board', 'EB',
   'Badan pengurus harian yang bertugas mengoordinasikan dan mengawasi jalannya organisasi.',
   array['Integrity','Driven','Empower Others'], 1),
  ('talent-improvement', 'Talent Improvement', 'TI',
   'Memetakan kemampuan dari member TSA IPB serta menyediakan wadah untuk upgrade diri.',
   array['Continuous Learning','Empower Others'], 2),
  ('talent-engagement', 'Talent Engagement', 'TE',
   'Membangun internalisasi, kehangatan, dan rasa saling memiliki antar anggota TSA IPB melalui apresiasi serta kepedulian.',
   array['Care for Others','Empower Others'], 3),
  ('branding-external', 'Branding & External', 'BE',
   'Meningkatkan visibilitas dan citra positif TSA IPB serta memperkuat hubungan eksternal.',
   array['Continuous Learning','Empower Others','Entrepreneurial Spirits'], 4),
  ('media-design', 'Media & Design', 'MD',
   'Membangun identitas organisasi, mengolah visual, dan menyampaikan cerita kegiatan.',
   array['Integrity','Empower Others','Entrepreneurial Spirits'], 5),
  ('social-project', 'Social Project', 'Sospro',
   'Mendorong pengembangan masyarakat yang sistematis dan berkelanjutan.',
   array['Care for Others','Empower Others'], 6)
on conflict (slug) do update set
  name = excluded.name, short_name = excluded.short_name, description = excluded.description,
  core_values = excluded.core_values, sort_order = excluded.sort_order;

-- Program kerja (judul dari PPT; deskripsi lengkap diisi lewat admin dari Drive)
with p(division_slug, slug, title, summary, is_featured, sort_order) as (values
  ('executive-board', 'new-gen-onboarding-eb', 'New Gen On Boarding', '', false, 1),
  ('executive-board', 'eb-hearing', 'EB Hearing', '', false, 2),
  ('executive-board', 'meet-tsa', 'Meet TSA', '', false, 3),
  ('executive-board', 'monthly-tracking-eb', 'Monthly Tracking, Report, & Evaluation', '', false, 4),
  ('executive-board', 'handover-eb', 'Handover', '', false, 5),
  ('executive-board', 'leads-meeting', 'Leads Meeting / Month', '', false, 6),
  ('executive-board', 'steering-committee', 'Steering Committee', '', false, 7),

  ('talent-improvement', 'monthly-tracking-ti', 'Monthly Tracking, Report, & Evaluation', '', false, 1),
  ('talent-improvement', 'quarter-evaluation', 'Quarter Evaluation', '', false, 2),
  ('talent-improvement', 'support-agent', 'Support Agent', '', false, 3),
  ('talent-improvement', 'best-staff-of-the-year', 'Best Staff of The Year', '', false, 4),
  ('talent-improvement', 'best-of-the-month', 'Best of The Month', '', false, 5),
  ('talent-improvement', 'best-of-the-quarter', 'Best of The Quarter', '', false, 6),
  ('talent-improvement', 'best-of-division', 'Best of Division', '', false, 7),
  ('talent-improvement', 'upgrading-connection', 'Upgrading Connection',
   'The Executive Blueprint: personal branding, strategic networking, dan resiliensi untuk menyiapkan anggota menghadapi dunia profesional.', true, 8),

  ('talent-engagement', 'new-gen-onboarding-te', 'New Gen On Boarding', '', false, 1),
  ('talent-engagement', 'toast', 'TOAST', '', false, 2),
  ('talent-engagement', 'tsa-chill', 'TSA Chill', '', false, 3),
  ('talent-engagement', 'tsa-study', 'TSA Study', '', false, 4),
  ('talent-engagement', 't-celebrate', 'T-Celebrate', '', false, 5),
  ('talent-engagement', 't-appreciate', 'T-Appreciate', '', false, 6),
  ('talent-engagement', 'handover-te', 'Handover', '', false, 7),
  ('talent-engagement', 't-graduate', 'T-Graduate', '', false, 8),
  ('talent-engagement', 'tsagustusan', 'TSAgustusan', '', false, 9),
  ('talent-engagement', 'tsa-journey', 'TSA Journey', '', false, 10),

  ('branding-external', 'press-release-live-report', 'Press Release & Live Report', '', false, 1),
  ('branding-external', 'sosmed-specialist', 'Sosmed Specialist', '', false, 2),
  ('branding-external', 'stealing-attention', 'Stealing Attention', '', false, 3),
  ('branding-external', 'tsa-day', 'TSA-DAY', '', false, 4),
  ('branding-external', 'sosialisasi-x-ra', 'Sosialisasi x RA', '', false, 5),
  ('branding-external', 'seeking-future', 'Seeking Future', '', false, 6),

  ('media-design', 'md-assist', 'MD Assist (COPM)', '', false, 1),
  ('media-design', 'portrait-of-leadership', 'Portrait of Leadership', '', false, 2),
  ('media-design', 'company-profile', 'Company Profile', '', false, 3),
  ('media-design', 'md-skills-upgrade', 'MD Skills Upgrade', '', false, 4),
  ('media-design', 'kaleidoskop', 'Kaleidoskop', '', false, 5),
  ('media-design', 'md-bond', 'MD Bond', '', false, 6),

  ('social-project', 'signature-project', 'Signature Project', '', false, 1),
  ('social-project', 'sdgs-of-the-month', 'SDG''s of The Month', '', false, 2),
  ('social-project', 'micro-project-lingkungan', 'Micro Project #1: Lingkungan',
   'Edukasi pengelolaan sampah dengan sistem yang menyenangkan: bermain ular tangga!', true, 3),
  ('social-project', 'micro-project-sosial', 'Micro Project #2: Sosial',
   'Peduli kesehatan mental melalui games seru: jenga!', true, 4),
  ('social-project', 'pay-it-forward', 'Pay it Forward x Lead Others', '', false, 5)
)
insert into public.programs (slug, title, division_id, summary, is_featured, sort_order)
select p.slug, p.title, d.id, p.summary, p.is_featured, p.sort_order
from p join public.divisions d on d.slug = p.division_slug
on conflict (slug) do update set
  title = excluded.title, division_id = excluded.division_id,
  sort_order = excluded.sort_order;

-- Pengaturan ----------------------------------------------------------------
insert into public.settings (key, value) values
  ('stats', '[
     {"value": "42", "label": "Pengurus Aktif"},
     {"value": "5", "label": "Divisi"},
     {"value": "40+", "label": "Program Kerja"},
     {"value": "1", "label": "Keluarga"}
   ]'::jsonb),
  ('profile_video_url', '""'::jsonb),
  ('contact_email', '""'::jsonb),
  ('socials', '{
     "instagram": "https://www.instagram.com/tsaipb",
     "linkedin": "https://www.linkedin.com/company/tanoto-scholars-association-ipb",
     "line": "https://line.me/R/ti/p/@ogh5044d"
   }'::jsonb)
on conflict (key) do nothing;
