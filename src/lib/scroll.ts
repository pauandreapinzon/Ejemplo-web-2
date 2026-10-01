// Punto único de acceso a la instancia de Lenis para scroll suave programático.
import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/** Scroll suave a una sección por id, con offset para la navbar fija. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
