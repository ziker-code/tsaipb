import type { SVGProps } from "react";
import { icons, type IconName } from "./icons.generated";
import { cn } from "@/lib/cn";

export type { IconName };

type Props = Omit<SVGProps<SVGSVGElement>, "dangerouslySetInnerHTML" | "children" | "name"> & {
  name: IconName;
  /** Isi bila ikon berdiri sendiri tanpa teks (jadi role="img"). */
  label?: string;
};

/**
 * Ikon Famicons (Iconify). Daftar ikon dikelola di scripts/gen-icons.mjs.
 * Dekoratif secara default (aria-hidden).
 */
export function Icon({ name, className, label, ...rest }: Props) {
  const icon = icons[name];
  const ariaLabel = label ?? (rest["aria-label"] as string | undefined);
  return (
    <svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      fill="currentColor"
      {...rest}
      className={cn("inline-block size-[1em] shrink-0", className)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      // Sumber: paket @iconify-json/famicons (tepercaya, dibangkitkan saat build)
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
