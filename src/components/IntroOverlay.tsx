import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { INTRO_KEY } from "@/lib/intro";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Intro cinematográfica de entrada: nombre que se materializa, línea de luz
 *  y cortina que se levanta. Una vez por sesión. */
const IntroOverlay = () => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.sessionStorage.getItem(INTRO_KEY);
  });

  useEffect(() => {
    if (!show || reduce) return;
    window.sessionStorage.setItem(INTRO_KEY, "1");
    document.documentElement.style.overflow = "hidden";
    const tm = window.setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 1950);
    return () => {
      window.clearTimeout(tm);
      document.documentElement.style.overflow = "";
    };
  }, [show, reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] bg-background flex items-center justify-center overflow-hidden"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          {/* Atmósfera */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(55% 45% at 50% 50%, hsl(var(--violet-glow) / 0.16), transparent 70%)",
            }}
          />

          <div className="relative text-center px-6">
            <motion.p
              className="font-display font-bold text-[clamp(1.9rem,6vw,3.5rem)] leading-tight text-foreground"
              initial={{ opacity: 0, y: 26, filter: "blur(16px)", letterSpacing: "0.3em" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.02em" }}
              transition={{ duration: 1.05, delay: 0.15, ease: EASE }}
            >
              Paula Andrea <span className="text-primary text-glow">Pinzón</span>
            </motion.p>

            <motion.div
              className="mx-auto my-5 h-px w-full max-w-md"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              style={{
                background:
                  "linear-gradient(to right, transparent, hsl(var(--violet-glow)), hsl(var(--cyan-glow)), transparent)",
                boxShadow: "0 0 18px hsl(var(--violet-glow) / 0.6)",
              }}
            />

            <motion.p
              className="text-[0.7rem] md:text-xs font-medium tracking-[0.35em] uppercase text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.95, ease: "easeOut" }}
            >
              Inteligencia Artificial · Arte · Estrategia
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
