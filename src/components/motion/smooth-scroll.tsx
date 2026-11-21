"use client";
import "lenis/dist/lenis.css";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Smooth scroll (Lenis) untuk halaman publik — memberi rasa "premium" seperti referensi.
 * Dimatikan otomatis bila pengguna memilih "kurangi gerakan" atau memakai perangkat sentuh
 * (scroll native HP sudah halus dan lebih aksesibel).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -96 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
