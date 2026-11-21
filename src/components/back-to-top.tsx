"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useState } from "react";
import { Icon } from "./icon";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          aria-label="Kembali ke atas"
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-brand-900/90 text-white shadow-lg backdrop-blur transition-colors hover:bg-gold-500 hover:text-brand-950"
        >
          <Icon name="arrow-up" className="size-5" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
