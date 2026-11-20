import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { Contours } from "@/components/ui";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Masuk Admin", robots: { index: false } };

const errors: Record<string, string> = {
  forbidden: "Akun ini tidak memiliki akses admin.",
  config: "Supabase belum dikonfigurasi. Isi .env.local terlebih dahulu.",
};

async function Notice({ searchParams }: { searchParams: PageProps<"/admin/login">["searchParams"] }) {
  const sp = await searchParams;
  const key = typeof sp.error === "string" ? sp.error : "";
  const next = typeof sp.next === "string" ? sp.next : "/admin";
  return (
    <>
      {errors[key] && (
        <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors[key]}
        </p>
      )}
      <LoginForm next={next} />
    </>
  );
}

export default function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-brand-700 px-4 py-12">
      <Contours className="text-white" />
      <div className="relative w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-[var(--radius-card)] bg-white p-7 shadow-2xl">
          <h1 className="font-display text-xl font-extrabold text-brand-800">Masuk Admin</h1>
          <p className="mb-6 mt-1 text-sm text-muted">Kelola berita, program kerja, dan galeri TSA IPB.</p>
          <Suspense fallback={<LoginForm next="/admin" />}>
            <Notice searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
