import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/LanguageContext";
import { scrollToId } from "@/lib/scroll";
import Reveal from "@/components/Reveal";

const WAITLIST_URL = "https://forms.gle/i9j7r7MQYFVkpDaf9";

const Book = () => {
  const { t } = useT();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // El libro rota en 3D a medida que la sección atraviesa el viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [22, -4, -18]);
  const coverY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="libro"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="book-heading"
      itemScope
      itemType="https://schema.org/Book"
    >
      <img
        src="/media/bg-waves-1.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover bg-drift opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(224 52% 6% / 0.78) 30%, hsl(224 52% 6% / 0.78) 70%, hsl(var(--background)) 100%)",
        }}
      />
      <meta itemProp="name" content="IA para Creativos: Producción, Marketing y Estrategia en la Era Generativa" />
      <meta itemProp="author" content="Paula Andrea Pinzón" />
      <meta itemProp="inLanguage" content="es" />
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Portada del libro con rotación 3D ligada al scroll */}
          <Reveal className="order-1">
            <div className="mx-auto w-[260px] sm:w-[300px]" style={{ perspective: "1400px" }}>
              <motion.div
                style={reduce ? undefined : { rotateY, y: coverY, transformStyle: "preserve-3d" }}
                whileHover={reduce ? undefined : { scale: 1.04 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[10/14] rounded-r-2xl rounded-l-md overflow-hidden glow-violet-strong"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(150deg, hsl(263 65% 26%) 0%, hsl(224 55% 11%) 52%, hsl(197 75% 16%) 100%)",
                    boxShadow:
                      "0 30px 60px -20px hsl(224 52% 3% / 0.8), 0 0 70px -15px hsl(var(--violet-glow) / 0.45)",
                  }}
                />
                <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3.5 bg-black/40" />
                <div aria-hidden="true" className="absolute inset-y-0 left-3.5 w-px bg-white/15" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(80% 50% at 70% 0%, hsl(var(--violet-glow) / 0.25), transparent 60%)",
                  }}
                />
                <div className="relative h-full flex flex-col justify-between p-7 pl-9">
                  <div>
                    <p className="text-[0.65rem] tracking-[0.25em] uppercase text-foreground/60 mb-6">
                      {t("book.badge")}
                    </p>
                    <p className="font-display font-bold text-[2rem] leading-[1.05] text-foreground">
                      IA para
                      <br />
                      <span className="text-primary text-glow">Creativos</span>
                    </p>
                    <p className="text-xs text-foreground/70 mt-4 leading-relaxed">{t("book.subtitle")}</p>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/85">
                    <BookOpen className="h-4 w-4 text-secondary" aria-hidden="true" />
                    <span className="text-xs font-semibold">Paula Andrea Pinzón</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <div className="order-2">
            <Reveal>
              <span className="inline-block rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold tracking-wide px-4 py-1.5 mb-6">
                {t("book.badge")}
              </span>
              <h2
                id="book-heading"
                className="font-display font-bold tracking-tight text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] mb-4"
              >
                {t("book.title")}
              </h2>
              <p className="text-lg md:text-xl text-secondary mb-6">{t("book.subtitle")}</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl" itemProp="abstract">
                {t("book.desc")}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-sm font-medium text-muted-foreground mb-3">{t("book.concepts")}</p>
              <ul className="flex flex-wrap gap-2.5 mb-9 list-none">
                {(["book.c1", "book.c2", "book.c3"] as const).map((k) => (
                  <li
                    key={k}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/85"
                  >
                    {t(k)}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="btn-primary-glow bg-primary hover:bg-primary text-primary-foreground font-semibold rounded-full px-8"
                >
                  <a href={WAITLIST_URL} target="_blank" rel="noopener noreferrer" aria-label={t("book.cta.aria")}>
                    {t("book.cta")} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <button
                  type="button"
                  onClick={() => scrollToId("stories")}
                  className="link-underline text-sm font-semibold text-secondary"
                >
                  {t("book.secondary")}
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">{t("book.note")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
