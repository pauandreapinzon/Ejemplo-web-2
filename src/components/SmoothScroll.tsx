import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

/** Scroll suave premium con Lenis. Se desactiva si el usuario prefiere menos movimiento. */
const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: { offset: -80 },
    });
    setLenis(lenis);

    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

export default SmoothScroll;
