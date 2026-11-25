"use server";

import { updateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { str } from "@/lib/admin/utils";
import { youtubeId } from "@/lib/format";
import { tags } from "@/lib/data";

export type SettingsState = { ok?: boolean; error?: string };

/** Simpan link video profil (YouTube). Kosongkan untuk menyembunyikan tombol video di Beranda. */
export async function saveProfileVideo(_prev: SettingsState, fd: FormData): Promise<SettingsState> {
  const { supabase } = await requireAdmin();
  const url = str(fd, "profile_video_url");
  if (url && !youtubeId(url)) return { error: "Link tidak dikenali. Gunakan link video YouTube (youtu.be/… atau youtube.com/watch?v=…)." };

  const { error } = await supabase.from("settings").upsert({ key: "profile_video_url", value: url });
  if (error) return { error: `Gagal menyimpan: ${error.message}` };

  updateTag(tags.settings);
  return { ok: true };
}
