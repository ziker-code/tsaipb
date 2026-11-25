import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import { SettingsForm } from "./settings-form";

export const metadata = { title: "Pengaturan" };

export default async function AdminSettingsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("settings").select("value").eq("key", "profile_video_url").maybeSingle();
  const videoUrl = typeof data?.value === "string" ? data.value : "";

  return (
    <>
      <AdminPageHeader title="Pengaturan" description="Pengaturan umum website." />
      <SettingsForm videoUrl={videoUrl} />
    </>
  );
}

export const instant = false;
