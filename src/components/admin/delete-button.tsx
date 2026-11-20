"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";

/** Tombol hapus dengan konfirmasi browser. `action` adalah Server Action yang menerima FormData berisi `id`. */
export function DeleteButton({ action, id, label, confirmText, className }: { action: (fd: FormData) => Promise<void>; id: string; label?: string; confirmText: string; className?: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" aria-label={label ?? "Hapus"} className={cn("inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50", className)}>
        <Trash2 className="size-4" aria-hidden="true" />
        {label && <span>{label}</span>}
      </button>
    </form>
  );
}
