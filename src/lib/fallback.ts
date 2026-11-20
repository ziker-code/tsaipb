import type { Division, Program } from "./types";

/**
 * Data cadangan (sama dengan supabase/seed.sql) dipakai saat Supabase belum dikonfigurasi,
 * supaya halaman publik tetap bisa dikembangkan & dipratinjau.
 */
const d = (slug: string, name: string, short_name: string, description: string, core_values: string[], sort_order: number): Division => ({
  id: slug,
  slug,
  name,
  short_name,
  description,
  core_values,
  sort_order,
});

export const fallbackDivisions: Division[] = [
  d("executive-board", "Executive Board", "EB", "Badan pengurus harian yang bertugas mengoordinasikan dan mengawasi jalannya organisasi.", ["Integrity", "Driven", "Empower Others"], 1),
  d("talent-improvement", "Talent Improvement", "TI", "Memetakan kemampuan dari member TSA IPB serta menyediakan wadah untuk upgrade diri.", ["Continuous Learning", "Empower Others"], 2),
  d("talent-engagement", "Talent Engagement", "TE", "Membangun internalisasi, kehangatan, dan rasa saling memiliki antar anggota TSA IPB melalui apresiasi serta kepedulian.", ["Care for Others", "Empower Others"], 3),
  d("branding-external", "Branding & External", "BE", "Meningkatkan visibilitas dan citra positif TSA IPB serta memperkuat hubungan eksternal.", ["Continuous Learning", "Empower Others", "Entrepreneurial Spirits"], 4),
  d("media-design", "Media & Design", "MD", "Membangun identitas organisasi, mengolah visual, dan menyampaikan cerita kegiatan.", ["Integrity", "Empower Others", "Entrepreneurial Spirits"], 5),
  d("social-project", "Social Project", "Sospro", "Mendorong pengembangan masyarakat yang sistematis dan berkelanjutan.", ["Care for Others", "Empower Others"], 6),
];

const raw: [string, string, string, string?, boolean?][] = [
  ["executive-board", "new-gen-onboarding-eb", "New Gen On Boarding"],
  ["executive-board", "eb-hearing", "EB Hearing"],
  ["executive-board", "meet-tsa", "Meet TSA"],
  ["executive-board", "monthly-tracking-eb", "Monthly Tracking, Report, & Evaluation"],
  ["executive-board", "handover-eb", "Handover"],
  ["executive-board", "leads-meeting", "Leads Meeting / Month"],
  ["executive-board", "steering-committee", "Steering Committee"],
  ["talent-improvement", "monthly-tracking-ti", "Monthly Tracking, Report, & Evaluation"],
  ["talent-improvement", "quarter-evaluation", "Quarter Evaluation"],
  ["talent-improvement", "support-agent", "Support Agent"],
  ["talent-improvement", "best-staff-of-the-year", "Best Staff of The Year"],
  ["talent-improvement", "best-of-the-month", "Best of The Month"],
  ["talent-improvement", "best-of-the-quarter", "Best of The Quarter"],
  ["talent-improvement", "best-of-division", "Best of Division"],
  ["talent-improvement", "upgrading-connection", "Upgrading Connection", "The Executive Blueprint: personal branding, strategic networking, dan resiliensi untuk menyiapkan anggota menghadapi dunia profesional.", true],
  ["talent-engagement", "new-gen-onboarding-te", "New Gen On Boarding"],
  ["talent-engagement", "toast", "TOAST"],
  ["talent-engagement", "tsa-chill", "TSA Chill"],
  ["talent-engagement", "tsa-study", "TSA Study"],
  ["talent-engagement", "t-celebrate", "T-Celebrate"],
  ["talent-engagement", "t-appreciate", "T-Appreciate"],
  ["talent-engagement", "handover-te", "Handover"],
  ["talent-engagement", "t-graduate", "T-Graduate"],
  ["talent-engagement", "tsagustusan", "TSAgustusan"],
  ["talent-engagement", "tsa-journey", "TSA Journey"],
  ["branding-external", "press-release-live-report", "Press Release & Live Report"],
  ["branding-external", "sosmed-specialist", "Sosmed Specialist"],
  ["branding-external", "stealing-attention", "Stealing Attention"],
  ["branding-external", "tsa-day", "TSA-DAY"],
  ["branding-external", "sosialisasi-x-ra", "Sosialisasi x RA"],
  ["branding-external", "seeking-future", "Seeking Future"],
  ["media-design", "md-assist", "MD Assist (COPM)"],
  ["media-design", "portrait-of-leadership", "Portrait of Leadership"],
  ["media-design", "company-profile", "Company Profile"],
  ["media-design", "md-skills-upgrade", "MD Skills Upgrade"],
  ["media-design", "kaleidoskop", "Kaleidoskop"],
  ["media-design", "md-bond", "MD Bond"],
  ["social-project", "signature-project", "Signature Project"],
  ["social-project", "sdgs-of-the-month", "SDG's of The Month"],
  ["social-project", "micro-project-lingkungan", "Micro Project #1: Lingkungan", "Edukasi pengelolaan sampah dengan sistem yang menyenangkan: bermain ular tangga!", true],
  ["social-project", "micro-project-sosial", "Micro Project #2: Sosial", "Peduli kesehatan mental melalui games seru: jenga!", true],
  ["social-project", "pay-it-forward", "Pay it Forward x Lead Others"],
];

export const fallbackPrograms: Program[] = raw.map(([division_id, slug, title, summary = "", is_featured = false], i) => ({
  id: slug,
  slug,
  title,
  division_id,
  summary,
  content: "",
  period: null,
  youtube_url: null,
  cover_url: null,
  is_featured,
  is_published: true,
  sort_order: i,
}));
