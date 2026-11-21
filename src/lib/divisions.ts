/** Identitas visual tiap divisi: logo (public/brand) dan warna aksen dari logonya. */
export const divisionBrand: Record<string, { code: string; logo: string; color: string; soft: string }> = {
  "executive-board": { code: "EB", logo: "/brand/div-eb.webp", color: "#B0185E", soft: "#FBEAF2" },
  "talent-improvement": { code: "TI", logo: "/brand/div-ti.webp", color: "#2C6FE8", soft: "#EAF1FD" },
  "talent-engagement": { code: "TE", logo: "/brand/div-te.webp", color: "#A04BD1", soft: "#F5ECFB" },
  "branding-external": { code: "BE", logo: "/brand/div-be.webp", color: "#E08A00", soft: "#FDF3E1" },
  "media-design": { code: "MD", logo: "/brand/div-md.webp", color: "#D9141B", soft: "#FCEAEA" },
  "social-project": { code: "SP", logo: "/brand/div-sp.webp", color: "#22A28A", soft: "#E6F6F2" },
};

const fallback = { code: "", logo: "/brand/logo-mark.webp", color: "#00663D", soft: "#EAF3EE" };

export function brandOf(slug: string | undefined) {
  return (slug && divisionBrand[slug]) || fallback;
}
