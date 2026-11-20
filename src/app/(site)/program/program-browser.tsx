"use client";

import { useState } from "react";
import { ProgramCard } from "@/components/cards";
import { EmptyState, Pill } from "@/components/ui";
import type { Division, Program } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ProgramBrowser({ divisions, programs }: { divisions: Division[]; programs: Program[] }) {
  const [active, setActive] = useState(divisions[0]?.id ?? "");
  const division = divisions.find((d) => d.id === active);
  const list = programs.filter((p) => p.division_id === active);

  return (
    <div>
      <div role="tablist" aria-label="Pilih divisi" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {divisions.map((d) => (
          <button
            key={d.id}
            role="tab"
            type="button"
            aria-selected={d.id === active}
            aria-controls="program-panel"
            onClick={() => setActive(d.id)}
            className={cn(
              "shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              d.id === active ? "bg-brand-700 text-white shadow" : "bg-brand-50 text-brand-800 hover:bg-brand-100",
            )}
          >
            {d.name}
          </button>
        ))}
      </div>

      {division && (
        <div id="program-panel" role="tabpanel" className="mt-8">
          <div className="rounded-[var(--radius-card)] bg-canvas p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold text-brand-800">{division.name}</h2>
            <p className="mt-2 max-w-3xl text-muted">{division.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Core values:</span>
              {division.core_values.map((v) => (
                <Pill key={v}>{v}</Pill>
              ))}
            </div>
          </div>

          {list.length ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <li key={p.id}>
                  <ProgramCard program={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8">
              <EmptyState title="Belum ada program kerja" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
