"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard tidak tersedia */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-muted">Bagikan:</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-100"
      >
        <Icon name="logo-whatsapp" className="size-4" aria-hidden="true" /> WhatsApp
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-100"
      >
        {copied ? <Icon name="checkmark" className="size-4" aria-hidden="true" /> : <Icon name="link-outline" className="size-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Tautan disalin" : "Salin tautan"}</span>
      </button>
    </div>
  );
}
