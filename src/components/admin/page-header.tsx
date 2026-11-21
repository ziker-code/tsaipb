import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";

export function AdminPageHeader({ title, description, back, actions }: { title: string; description?: string; back?: { href: string; label: string }; actions?: ReactNode }) {
  return (
    <div className="mb-6">
      {back && (
        <Link href={back.href} className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-brand-700">
          <Icon name="arrow-back" className="size-4" aria-hidden="true" /> {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-brand-800">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        {actions}
      </div>
    </div>
  );
}
