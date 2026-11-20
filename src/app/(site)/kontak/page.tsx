import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { InstagramIcon, LineIcon, LinkedinIcon } from "@/components/social-icons";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi TSA IPB untuk kolaborasi, sponsorship, dan media partner.",
};

const channels = [
  { name: "Instagram", ...site.socials.instagram, Icon: InstagramIcon },
  { name: "LinkedIn", ...site.socials.linkedin, Icon: LinkedinIcon },
  { name: "LINE Official", ...site.socials.line, Icon: LineIcon },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Kontak & Sosial Media" subtitle="Mari terhubung dan berkolaborasi" />
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[22rem_1fr]">
          <div>
            <SectionHeading eyebrow="Temukan Kami" title="Kanal Resmi" />
            <ul className="mt-6 grid gap-3">
              {channels.map(({ name, label, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-[var(--radius-card)] bg-white p-4 ring-1 ring-brand-100 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-700 text-white">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted">{name}</span>
                      <span className="font-semibold text-brand-800">{label}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 rounded-[var(--radius-card)] bg-canvas p-4">
                <span className="grid size-11 place-items-center rounded-xl bg-gold-500 text-white">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Alamat</span>
                  <span className="font-semibold text-brand-800">{site.address}</span>
                </span>
              </li>
            </ul>
          </div>

          <div id="form" className="scroll-mt-28 rounded-[var(--radius-card)] bg-white p-6 shadow-lg shadow-brand-950/5 ring-1 ring-brand-100 sm:p-10">
            <SectionHeading eyebrow="Hubungi Kami" title="Kirim Pesan" description="Untuk kolaborasi, sponsorship, media partner, atau pertanyaan lain. Kami akan membalas melalui email." />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
