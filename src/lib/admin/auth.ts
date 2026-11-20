import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createSessionClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Wajib dipanggil di awal setiap halaman & Server Action admin.
 * Proxy hanya cek optimistik; di sini sesi divalidasi ke Supabase dan keanggotaan tabel `admins` dicek.
 */
export async function requireAdmin() {
  // Selalu per-request (jangan pernah diprerender), apa pun kondisi env saat build.
  await connection();
  if (!isSupabaseConfigured) redirect("/admin/login?error=config");

  const supabase = await createSessionClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");

  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", auth.user.id).maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }

  return { supabase, user: auth.user };
}
