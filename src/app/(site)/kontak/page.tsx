import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/icon";
import { LineIcon } from "@/components/social-icons";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi TSA IPB untuk kolaborasi, sponsorship, dan media partner.",
};

export default function ContactPage() {
  const channels: { name: string; label: string; href: string; icon: ReactNode }[] = [
    { name: "Instagram", ...site.socials.instagram, icon: <Icon name="logo-instagram" className="size-5" /> },
    { name: "LinkedIn", ...site.socials.linkedin, icon: <Icon name="logo-linkedin" className="size-5" /> },
    ...(site.socials.tiktok ? [{ name: "TikTok", ...site.socials.tiktok, icon: <Icon name="logo-tiktok" className="size-5" /> }] : []),
    { name: "LINE Official", ...site.socials.line, icon: <LineIcon className="size-5" /> },
  ];

  return (
    <>
      <PageHero title="Mari terhubung." subtitle="Kontak & Sosial Media" />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[22rem_1fr]">
          <div>
            <SectionHeading eyebrow="Kanal Resmi" title="Temukan kami" />
            <Stagger as="ul" className="mt-8 grid gap-3">
              {channels.map((c) => (
                <StaggerItem as="li" key={c.name}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl p-3 ring-1 ring-line transition-colors duration-300 hover:bg-brand-700 hover:ring-brand-700"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-white/10 group-hover:text-white">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted group-hover:text-white/60">{c.name}</span>
                      <span className="block truncate text-sm text-brand-900 group-hover:text-white">{c.label}</span>
                    </span>
                    <Icon name="open-outline" className="ml-auto size-4 text-muted opacity-0 transition-opacity group-hover:text-white group-hover:opacity-100" />
                  </a>
                </StaggerItem>
              ))}
              <StaggerItem as="li" className="flex items-center gap-4 rounded-2xl bg-canvas p-3">
                <span className="grid size-11 place-items-center rounded-xl bg-gold-100 text-gold-600">
                  <Icon name="location-outline" className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Alamat</span>
                  <span className="text-sm text-brand-900">{site.address}</span>
                </span>
              </StaggerItem>
            </Stagger>
          </div>

          <Reveal>
            <div id="form" className="scroll-mt-28 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10">
              <SectionHeading eyebrow="Hubungi Kami" title="Kirim pesan" description="Untuk kolaborasi, sponsorship, media partner, atau pertanyaan lain. Kami membalas melalui email." />
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
