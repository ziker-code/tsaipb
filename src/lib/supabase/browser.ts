"use client";
import { createBrowserClient } from "@supabase/ssr";

/** Klien browser untuk admin (upload gambar, login). */
export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
