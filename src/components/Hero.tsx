import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useT } from "@/i18n/LanguageContext";
import { scrollToId } from "@/lib/scroll";
import { introDelay } from "@/lib/intro";

const CREDS = ["hero.cred.phd", "hero.cred.iso", "hero.cred.uni", "hero.cred.book"] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Palabras del titular con entrada cinematográfica: blur que se enfoca. */
const CinematicWord = ({ word, delay, className, reduce }: { word: string; delay: number; className?: string; reduce: boolean }) => (
  <motion.span
    className={`inline-block ${className ?? ""}`}
    initial={reduce ? undefined : { opacity: 0, y: 34, filter: "blur(14px)" }}
    animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 1.0, delay, ease: EASE }}
  >
    {word}
  </motion.span>
);

const Hero = () => {
  const { t } = useT();
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const base = introDelay();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <header
      ref={ref}
      role="banner"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Video de fondo con parallax + Ken Burns */}
      <motion.div aria-hidden="true" className="absolute inset-0 z-0" style={reduce ? undefined : { y: bgY }}>
        {reduce ? (
          <img src="/media/hero-poster.webp" alt="" className="h-[120%] w-full object-cover" />
        ) : (
          <video
            className="kenburns h-[120%] w-full object-cover"
            src="/media/hero-loop.mp4"
            poster="/media/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </motion.div>

      {/* Viñeta cinematográfica para legibilidad */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, hsl(224 52% 6% / 0.5), hsl(224 52% 6% / 0.62) 55%, hsl(var(--background)) 98%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(75% 60% at 50% 42%, transparent 40%, hsl(224 52% 5% / 0.55) 100%)",
        }}
      />

      <motion.div
        className="container mx-auto px-4 z-10 text-center pt-28 pb-24"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          {...enter(base + 0.05)}
          className="text-sm md:text-base font-medium tracking-wide text-secondary text-glow-cyan mb-5"
        >
          {t("hero.title.role")}
        </motion.p>

        <h1
          id="hero-title"
          className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.75rem,8.5vw,6rem)] mb-7 text-foreground"
        >
          <span className="block">
            <CinematicWord word="Paula" delay={base + 0.2} reduce={reduce} />{" "}
            <CinematicWord word="Andrea" delay={base + 0.34} reduce={reduce} />
          </span>
          <span className="block">
            <CinematicWord word="Pinzón" delay={base + 0.5} className="text-primary text-glow" reduce={reduce} />
          </span>
        </h1>

        <motion.p
          {...enter(base + 0.7)}
          data-speakable="true"
          className="text-lg md:text-2xl mb-9 text-foreground/90 max-w-3xl mx-auto leading-relaxed"
        >
          {t("hero.lead")}
        </motion.p>

        <motion.div {...enter(base + 0.85)} className="flex gap-4 justify-center flex-wrap mb-12">
          <Button
            size="lg"
            className="btn-primary-glow bg-primary hover:bg-primary text-primary-foreground font-semibold rounded-full px-8 text-base"
            aria-label={t("hero.cta.primary.aria")}
            onClick={() => scrollToId("contact")}
          >
            {t("hero.cta.primary")} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 text-base bg-transparent border-foreground/25 text-foreground hover:bg-foreground/10 hover:text-foreground hover:border-foreground/40 transition-colors"
            aria-label={t("hero.cta.secondary.aria")}
            onClick={() => navigate("/conferencias")}
          >
            {t("hero.cta.secondary")}
          </Button>
        </motion.div>

        <motion.ul {...enter(base + 1.0)} className="flex flex-wrap justify-center gap-x-3 gap-y-2 max-w-3xl mx-auto list-none">
          {CREDS.map((key) => (
            <li
              key={key}
              className="text-xs md:text-sm font-medium text-muted-foreground border border-border/80 bg-card/40 backdrop-blur-sm rounded-full px-4 py-1.5"
            >
              {t(key)}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label={t("hero.cta.secondary.aria")}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: base + 1.6, duration: 0.8 }}
      >
        <motion.span
          className="block"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </motion.button>
    </header>
  );
};

export default Hero;
