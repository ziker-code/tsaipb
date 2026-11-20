"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { sendContact, type ContactState } from "./actions";
import { cn } from "@/lib/cn";

const initial: ContactState = { status: "idle" };
const inputCls =
  "mt-1.5 w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 aria-[invalid=true]:border-red-500";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] bg-brand-50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-brand-600" aria-hidden="true" />
        <p className="mt-4 font-display text-xl font-bold text-brand-800">Pesan terkirim</p>
        <p className="mt-2 text-muted">{state.message ?? "Terima kasih telah menghubungi kami."}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5">
      {/* honeypot */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">
          Nama lengkap <span className="text-red-600">*</span>
          <input name="name" defaultValue={v.name} required maxLength={120} autoComplete="name" aria-invalid={!!err.name} aria-describedby="err-name" className={inputCls} />
          {err.name && <span id="err-name" className="mt-1 block text-xs font-normal text-red-600">{err.name}</span>}
        </label>
        <label className="block text-sm font-semibold text-ink">
          Email <span className="text-red-600">*</span>
          <input name="email" defaultValue={v.email} type="email" required maxLength={200} autoComplete="email" aria-invalid={!!err.email} aria-describedby="err-email" className={inputCls} />
          {err.email && <span id="err-email" className="mt-1 block text-xs font-normal text-red-600">{err.email}</span>}
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">
          Instansi / Organisasi <span className="font-normal text-muted">(opsional)</span>
          <input name="organization" defaultValue={v.organization} maxLength={200} autoComplete="organization" className={inputCls} />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Keperluan <span className="text-red-600">*</span>
          <select name="purpose" key={v.purpose} defaultValue={v.purpose ?? "Kolaborasi"} aria-invalid={!!err.purpose} className={inputCls}>
            <option>Kolaborasi</option>
            <option>Sponsorship</option>
            <option>Media Partner</option>
            <option>Lainnya</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-ink">
        Pesan <span className="text-red-600">*</span>
        <textarea name="body" defaultValue={v.body} required rows={6} maxLength={5000} aria-invalid={!!err.body} aria-describedby="err-body" className={cn(inputCls, "resize-y")} />
        {err.body && <span id="err-body" className="mt-1 block text-xs font-normal text-red-600">{err.body}</span>}
      </label>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 justify-self-start rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
      >
        <Send className="size-4" aria-hidden="true" />
        {pending ? "Mengirim…" : "Kirim Pesan"}
      </button>
    </form>
  );
}
