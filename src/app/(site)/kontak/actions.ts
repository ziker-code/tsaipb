"use server";

import { headers } from "next/headers";
import { createPublicClient } from "@/lib/supabase/public";

export type ContactState = { status: "idle" | "success" | "error"; message?: string; fieldErrors?: Partial<Record<Field, string>>; values?: Partial<Record<Field | "organization", string>> };
type Field = "name" | "email" | "purpose" | "body";

const PURPOSES = ["Kolaborasi", "Sponsorship", "Media Partner", "Lainnya"];

// Rate limit sederhana per instance (best-effort di serverless): 5 pesan / 10 menit / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bot mengisi field tersembunyi → pura-pura sukses.
  if (String(formData.get("website") ?? "").trim()) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const purpose = String(formData.get("purpose") ?? "Lainnya");
  const body = String(formData.get("body") ?? "").trim();

  // Dikembalikan saat gagal agar isian tidak hilang (React mereset form setelah action).
  const values = { name, email, organization, purpose, body };
  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!name || name.length > 120) fieldErrors.name = "Nama wajib diisi (maks. 120 karakter).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) fieldErrors.email = "Masukkan alamat email yang valid.";
  if (!PURPOSES.includes(purpose)) fieldErrors.purpose = "Pilih keperluan.";
  if (body.length < 10 || body.length > 5000) fieldErrors.body = "Pesan minimal 10 karakter (maks. 5000).";
  if (Object.keys(fieldErrors).length) return { status: "error", message: "Periksa kembali isian Anda.", fieldErrors, values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return { status: "error", message: "Terlalu banyak pesan. Coba lagi beberapa menit lagi.", values };

  let stored = false;
  let mailed = false;

  const supabase = createPublicClient();
  if (supabase) {
    const { error } = await supabase.from("messages").insert({ name, email, organization: organization || null, purpose, body });
    stored = !error;
    if (error) console.error("[contact] insert failed:", error.message);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (apiKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "TSA IPB Website <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `[Website TSA IPB] ${purpose} — ${name}`,
        html: `<h2>Pesan baru dari website TSA IPB</h2>
<p><b>Nama:</b> ${esc(name)}<br/><b>Email:</b> ${esc(email)}<br/><b>Instansi:</b> ${esc(organization || "-")}<br/><b>Keperluan:</b> ${esc(purpose)}</p>
<p style="white-space:pre-wrap">${esc(body)}</p>`,
      }),
    });
    mailed = res.ok;
    if (!res.ok) console.error("[contact] resend failed:", res.status, await res.text());
  }

  if (!stored && !mailed) {
    return { status: "error", message: "Maaf, pesan gagal terkirim. Silakan hubungi kami lewat Instagram atau LINE.", values };
  }
  return { status: "success", message: "Terima kasih! Pesan Anda sudah kami terima dan akan segera kami balas melalui email." };
}
