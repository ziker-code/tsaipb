import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { IMAGEKIT_URL_ENDPOINT } from "@/lib/imagekit-config";

/**
 * Tanda tangan upload ImageKit — HANYA untuk admin yang login.
 * Kunci privat tetap di server; browser hanya menerima token sekali pakai yang kedaluwarsa cepat.
 */
export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  if (!privateKey || !publicKey || !IMAGEKIT_URL_ENDPOINT) {
    return NextResponse.json({ error: "ImageKit belum dikonfigurasi (.env.local / Vercel env)." }, { status: 503 });
  }
  if (!isSupabaseConfigured) return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });

  const supabase = await createSessionClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Harus login sebagai admin." }, { status: 401 });
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", auth.user.id).maybeSingle();
  if (!admin) return NextResponse.json({ error: "Akun ini bukan admin." }, { status: 403 });

  const { token, expire, signature } = getUploadAuthParams({ privateKey, publicKey, expire: Math.floor(Date.now() / 1000) + 10 * 60 });
  return NextResponse.json({ token, expire, signature, publicKey }, { headers: { "Cache-Control": "no-store" } });
}
