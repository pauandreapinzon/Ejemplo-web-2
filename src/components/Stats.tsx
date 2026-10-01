import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useT } from "@/i18n/LanguageContext";
import Reveal from "@/components/Reveal";

const Counter = ({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
};

const UNIVERSITIES = ["SENA", "Politécnico Grancolombiano", "INCCA", "IEP Madrid", "EADIC", "EGCI"];
const INSTITUTIONS = ["MinTIC", "Colombia 4.0", "Tribu IA Colombia", "Women in Tech", "CCB Tech Day"];

const Stats = () => {
  const { t } = useT();
  return (
    <section className="py-24 md:py-28 atmosphere-dual border-y border-border/60">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-10 md:gap-8 text-center mb-20">
          <Reveal>
            <div className="font-display font-bold text-5xl md:text-6xl text-primary text-glow mb-3">
              <Counter to={50} prefix="+" />
            </div>
            <p className="text-muted-foreground text-base md:text-lg">{t("stats.s1")}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="font-display font-bold text-5xl md:text-6xl text-secondary text-glow-cyan mb-3">
              <Counter to={80} suffix="%" />
            </div>
            <p className="text-muted-foreground text-base md:text-lg">{t("stats.s2")}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="font-display font-bold text-5xl md:text-6xl text-primary text-glow mb-3">Top Voice</div>
            <p className="text-muted-foreground text-base md:text-lg">{t("stats.s3")}</p>
          </Reveal>
        </div>

        <Reveal>
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">{t("stats.unis.title")}</p>
          <div className="marquee mb-12">
            <div className="marquee-track gap-x-14 pr-14">
              {[...UNIVERSITIES, ...UNIVERSITIES].map((u, i) => (
                <span
                  key={`${u}-${i}`}
                  aria-hidden={i >= UNIVERSITIES.length}
                  className="font-display font-semibold text-lg md:text-xl text-foreground/45 whitespace-nowrap"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">{t("stats.trust.title")}</p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 list-none">
            {INSTITUTIONS.map((n) => (
              <li
                key={n}
                className="text-sm md:text-base font-medium text-foreground/40 hover:text-foreground/80 transition-colors duration-300 cursor-default"
              >
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default Stats;
