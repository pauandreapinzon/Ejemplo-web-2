import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Sparkles, Brain, Hand } from "lucide-react";
import { useT } from "@/i18n/LanguageContext";
import NeuralNetwork from "@/components/NeuralNetwork";
import Reveal from "@/components/Reveal";

const WORDS_ES = ["Creatividad", "Intuición", "Estrategia", "Gobernanza", "Kintsugi", "Centauro", "Arte", "Ética", "Criterio", "Humanidad", "Visión", "IA"];
const WORDS_EN = ["Creativity", "Intuition", "Strategy", "Governance", "Kintsugi", "Centaur", "Art", "Ethics", "Judgment", "Humanity", "Vision", "AI"];

const Centauro = () => {
  const { t, lang } = useT();
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const es = lang !== "en";

  // Scrollytelling: instinto humano y velocidad de máquina convergen al hacer scroll
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start 0.95", "center 0.45"],
  });
  const xL = useTransform(scrollYProgress, [0, 1], [-110, 0]);
  const xR = useTransform(scrollYProgress, [0, 1], [110, 0]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const mergeOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const mergeScale = useTransform(scrollYProgress, [0.55, 1], [0.5, 1]);

  return (
    <section
      id="centauro"
      className="relative py-24 md:py-28 overflow-hidden"
      aria-labelledby="centauro-heading"
      itemScope
      itemType="https://schema.org/Article"
    >
      <link itemProp="mainEntityOfPage" href="https://www.paulaandreapinzon.com/#centauro" />
      <meta itemProp="author" content="Paula Andrea Pinzón" />

      {/* Red neuronal interactiva: cada clic añade una idea al grafo */}
      <NeuralNetwork
        words={es ? WORDS_ES : WORDS_EN}
        className="absolute inset-0 h-full w-full cursor-crosshair"
      />

      <div className="relative z-10 pointer-events-none container mx-auto px-4 max-w-4xl">
        <Reveal className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 pointer-events-auto">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>{t("centauro.badge")}</span>
          </div>
          <h2
            id="centauro-heading"
            className="font-display font-bold tracking-tight text-3xl md:text-4xl mb-3"
            itemProp="headline"
          >
            {t("centauro.title")}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto" itemProp="description">
            {t("centauro.lead")}
          </p>
          <p className="text-xs text-muted-foreground/80 mt-3">
            {es
              ? "Toca la red: cada clic suma una idea al grafo de conocimiento."
              : "Tap the network: every click adds an idea to the knowledge graph."}
          </p>
        </Reveal>

        {/* Escena de convergencia */}
        <div ref={sceneRef} className="py-10 md:py-14">
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            <motion.div
              style={reduce ? undefined : { x: xL, opacity: sideOpacity }}
              className="pointer-events-auto flex items-center gap-3 rounded-[2rem] border border-primary/35 bg-primary/10 px-5 py-3.5"
            >
              <Hand className="h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <p className="font-display font-semibold text-sm md:text-base text-foreground">{t("centauro.pillar1.title")}</p>
                <p className="text-xs text-muted-foreground">{t("centauro.pillar1.desc")}</p>
              </div>
            </motion.div>

            <motion.div
              style={reduce ? undefined : { opacity: mergeOpacity, scale: mergeScale }}
              className="pointer-events-auto text-center px-2"
            >
              <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 border border-primary/50 flex items-center justify-center glow-violet-strong">
                <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="font-display font-semibold text-sm mt-3 text-primary">{t("centauro.pillar3.title")}</p>
              <p className="text-xs text-muted-foreground">{t("centauro.pillar3.desc")}</p>
            </motion.div>

            <motion.div
              style={reduce ? undefined : { x: xR, opacity: sideOpacity }}
              className="pointer-events-auto flex items-center gap-3 rounded-lg border border-secondary/35 bg-secondary/10 px-5 py-3.5"
            >
              <Brain className="h-5 w-5 text-secondary" aria-hidden="true" />
              <div>
                <p className="font-display font-semibold text-sm md:text-base text-foreground">{t("centauro.pillar2.title")}</p>
                <p className="text-xs text-muted-foreground">{t("centauro.pillar2.desc")}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <blockquote
          data-speakable="true"
          className="pointer-events-auto relative bg-card/90 backdrop-blur-sm border border-primary/25 rounded-2xl p-7 md:p-10 text-foreground/90 leading-relaxed glow-violet"
          itemProp="abstract"
        >
          <span aria-hidden="true" className="absolute -top-5 left-8 font-display text-6xl text-primary/60 select-none">"</span>
          <p className="text-lg md:text-xl italic">{t("centauro.quote")}</p>
          <p className="text-sm text-muted-foreground mt-4">— {t("centauro.quote.source")}</p>
        </blockquote>
      </div>
    </section>
  );
};

export default Centauro;
