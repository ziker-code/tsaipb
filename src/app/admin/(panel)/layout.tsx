import type { Metadata } from "next";
import { Suspense } from "react";
import { Icon } from "@/components/icon";
import { AdminNav } from "./admin-nav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin TSA IPB" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-[15rem_1fr]">
      <AdminNav />
      <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">
        <Suspense
          fallback={
            <div className="grid min-h-[50vh] place-items-center text-muted">
              <Icon name="sync" className="size-6 animate-spin" aria-label="Memuat" />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}
