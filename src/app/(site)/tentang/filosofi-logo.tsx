"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/** Isi dari materi "Filosofi Logo" TSA IPB. `spot` = titik sorot pada mark logo (persen). */
const parts = [
  {
    title: "Tunas yang tumbuh dari benih",
    body: "Terinspirasi dari tanaman kecil yang tumbuh dari benih: TSA IPB sebagai tempat bertumbuh bagi para anggotanya. Proses pertumbuhan juga melambangkan tradisi dan keberlanjutan — berakar pada nilai yang ada, sambil terus memastikan perkembangan yang berkelanjutan bagi seluruh komunitas.",
    spot: { x: "52%", y: "38%" },
  },
  {
    title: "Figur manusia & garis pelindung",
    body: "Figur manusia dan sebuah garis yang dimaknai sebagai perlindungan, kepedulian, dan dukungan — komitmen TSA IPB untuk peduli dan memberdayakan setiap individu, menciptakan lingkungan tempat setiap orang dapat berkembang dan mencapai potensi maksimalnya.",
    spot: { x: "76%", y: "62%" },
  },
  {
    title: "Daun & butiran benih",
    body: "Daun dan butiran benih di atasnya memperkuat identitas TSA IPB yang berada di lingkungan kampus pertanian, sekaligus mencerminkan nilai pertumbuhan, kehidupan, dan keberlanjutan yang menjadi ciri khas bidang pertanian.",
    spot: { x: "48%", y: "14%" },
  },
  {
    title: "Garis-garis paralel",
    body: "Susunan garis paralel menghadirkan keseimbangan, kerapian, dan harmoni visual — melambangkan keselarasan dan kerja sama, serta nilai kebersamaan dan keharmonisan di dalam organisasi.",
    spot: { x: "38%", y: "58%" },
  },
];

export function FilosofiLogo() {
  const [active, setActive] = useState<number | null>(null);
  const spot = active === null ? null : parts[active].spot;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_18rem_1fr] lg:gap-8">
      {/* Mark logo dengan sorotan */}
      <div className="relative mx-auto h-72 w-40 sm:h-96 sm:w-52 lg:order-2 lg:h-[26rem] lg:w-56" aria-hidden="true">
        <Image src="/brand/logo-mark.webp" alt="" fill sizes="224px" className={cn("object-contain transition-[opacity,filter] duration-700", spot ? "opacity-25 grayscale" : "opacity-100")} />
        {/* Sorotan: variabel --mx/--my/--r didaftarkan via @property (globals.css) sehingga bisa di-transisi CSS */}
        <div
          className="spotlight absolute inset-0"
          style={
            {
              "--mx": spot?.x ?? "50%",
              "--my": spot?.y ?? "50%",
              "--r": spot ? "22%" : "0%",
              opacity: spot ? 1 : 0,
            } as React.CSSProperties
          }
        >
          <Image src="/brand/logo-mark.webp" alt="" fill sizes="224px" className="object-contain" />
        </div>
      </div>

      {[0, 2].map((col) => (
        <ul key={col} className={cn("grid gap-4", col === 0 ? "lg:order-1" : "lg:order-3")}>
          {parts.slice(col, col + 2).map((p, j) => {
            const i = col + j;
            const on = active === i;
            return (
              <li key={p.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={cn(
                    "w-full rounded-[var(--radius-card)] p-6 text-left ring-1 transition-all duration-500 ease-[var(--ease-out-soft)]",
                    on ? "bg-brand-700 text-white ring-brand-700" : "bg-white ring-line hover:ring-brand-700/30",
                  )}
                >
                  <span className={cn("text-xs tabular-nums tracking-[0.2em]", on ? "text-gold-300" : "text-gold-600")}>0{i + 1}</span>
                  <span className={cn("mt-2 block text-lg font-medium", on ? "text-white" : "text-brand-900")}>{p.title}</span>
                  <span className={cn("mt-2 block text-sm leading-relaxed", on ? "text-white/75" : "text-muted")}>{p.body}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}
