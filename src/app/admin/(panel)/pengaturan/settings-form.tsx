"use client";

import { useActionState } from "react";
import { Field, FormError, inputCls, SubmitButton, useKeepValuesSubmit } from "@/components/admin/form";
import { Icon } from "@/components/icon";
import { saveProfileVideo, type SettingsState } from "./actions";

export function SettingsForm({ videoUrl }: { videoUrl: string }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(saveProfileVideo, {});
  const onSubmit = useKeepValuesSubmit(action);

  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-5 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
          <Icon name="logo-youtube" className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold text-brand-900">Video profil</h2>
          <p className="text-sm text-muted">Tampil di section &ldquo;Kenali Lebih Dekat&rdquo; di Beranda. Diklik akan membuka YouTube.</p>
        </div>
      </div>
      <Field label="Link YouTube" hint={'Contoh: https://youtu.be/abc123. Kosongkan untuk menampilkan "Video profil segera hadir".'}>
        <input name="profile_video_url" type="url" defaultValue={videoUrl} placeholder="https://youtu.be/…" className={inputCls} />
      </Field>
      <FormError message={state.error} />
      {state.ok && (
        <p role="status" className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Tersimpan. Beranda sudah memakai video ini.
        </p>
      )}
      <SubmitButton pending={pending} className="justify-self-start">
        Simpan
      </SubmitButton>
    </form>
  );
}
