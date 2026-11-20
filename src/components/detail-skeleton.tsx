import { Container } from "./ui";

/** Fallback saat halaman detail (proker/berita) sedang dimuat. */
export function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat">
      <section className="bg-brand-700 pb-16 pt-32 sm:pt-36">
        <Container>
          <div className="h-4 w-28 animate-pulse rounded bg-white/20" />
          <div className="mt-8 h-10 w-3/4 max-w-xl animate-pulse rounded-lg bg-white/20" />
          <div className="mt-4 h-5 w-1/2 max-w-md animate-pulse rounded bg-white/15" />
        </Container>
      </section>
      <Container className="space-y-3 py-16">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-brand-50" style={{ width: `${90 - i * 10}%` }} />
        ))}
      </Container>
    </div>
  );
}
