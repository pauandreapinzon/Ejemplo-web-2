// Control de la intro de entrada: se muestra una sola vez por sesión.
export const INTRO_KEY = "pa-intro-seen";

/** Retraso base que deben esperar las animaciones de entrada (hero/navbar)
 *  cuando la intro va a reproducirse en esta carga. */
export const introDelay = (): number => {
  if (typeof window === "undefined") return 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  return window.sessionStorage.getItem(INTRO_KEY) ? 0 : 1.9;
};
