"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/components/icon";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/cn";

export const inputCls =
  "mt-1.5 w-full rounded-xl border border-brand-100 bg-white px-4 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block text-sm font-semibold text-ink", className)}>
      {label}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-muted">{hint}</span>}
    </label>
  );
}

/**
 * React 19 mereset field form setelah `<form action>` selesai — termasuk saat validasi gagal,
 * sehingga isian admin hilang. Hook ini mengirim lewat onSubmit + transition supaya form tidak direset.
 */
export function useKeepValuesSubmit(action: (fd: FormData) => void) {
  const [, startTransition] = useTransition();
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };
}

export function SubmitButton({ children, className, pending: pendingProp }: { children: ReactNode; className?: string; pending?: boolean }) {
  const { pending: formPending } = useFormStatus();
  const pending = pendingProp ?? formPending;
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn("inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60", className)}
    >
      {pending && <Icon name="sync" className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  );
}

/** Textarea Markdown dengan tab Tulis / Pratinjau. */
export function MarkdownEditor({ name, defaultValue = "", rows = 16 }: { name: string; defaultValue?: string; rows?: number }) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<"write" | "preview">("write");
  return (
    <div className="mt-1.5 overflow-hidden rounded-xl border border-brand-100">
      <div className="flex items-center justify-between border-b border-brand-100 bg-canvas px-2">
        <div className="flex">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn("px-3 py-2 text-xs font-semibold", tab === t ? "border-b-2 border-brand-600 text-brand-800" : "text-muted")}
            >
              {t === "write" ? "Tulis" : "Pratinjau"}
            </button>
          ))}
        </div>
        <span className="hidden text-[11px] font-normal text-muted sm:block">Markdown: **tebal**, *miring*, ## Judul, - daftar, [tautan](url), ![gambar](url)</span>
      </div>
      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={rows}
        className={cn("block w-full resize-y px-4 py-3 font-mono text-sm font-normal outline-none", tab !== "write" && "hidden")}
      />
      {tab === "preview" && (
        <div className="min-h-64 bg-white px-5 py-4 text-sm font-normal">
          {value.trim() ? <Markdown>{value}</Markdown> : <p className="text-muted">Belum ada isi.</p>}
        </div>
      )}
    </div>
  );
}
