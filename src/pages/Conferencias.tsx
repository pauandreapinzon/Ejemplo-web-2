import { useEffect } from "react";
import { ArrowRight, ExternalLink, Brain, Clapperboard, Radar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { useT } from "@/i18n/LanguageContext";
import { getLenis } from "@/lib/scroll";

const SESSIONIZE_URL = "https://sessionize.com/paula-andrea-pinzon/";

type Conf = {
  id: string;
  icon: typeof Brain;
  titleEs: string; titleEn: string;
  subEs: string; subEn: string;
  descEs: string; descEn: string;
  focusEs: string; focusEn: string;
  impactEs: string; impactEn: string;
  temario: { tEs: string; tEn: string; dEs: string; dEn: string }[];
};

const CONFS: Conf[] = [
  {
    id: "mentes-en-beta",
    icon: Brain,
    titleEs: "Mentes en Beta", titleEn: "Minds in Beta",
    subEs: "El arte de rediseñar la organización", subEn: "The art of redesigning the organization",
    descEs: "La base de toda estrategia futura. Antes de implementar herramientas, hay que actualizar el \"sistema operativo\" de las personas: cultura y mentalidad.",
    descEn: "The foundation of any future strategy. Before implementing tools, you must update people's \"operating system\": culture and mindset.",
    focusEs: "La transformación digital como un desafío humano y cultural, no solo técnico. La reconfiguración del mindset para la adopción tecnológica.",
    focusEn: "Digital transformation as a human and cultural challenge, not just a technical one. Reconfiguring the mindset for technology adoption.",
    impactEs: "Reducción de la resistencia al cambio y creación de una cultura organizacional flexible y curiosa.",
    impactEn: "Reduced resistance to change and a flexible, curious organizational culture.",
    temario: [
      { tEs: "Resiliencia Radical", tEn: "Radical Resilience", dEs: "Cómo construir equipos que se fortalecen ante el cambio en lugar de romperse.", dEn: "How to build teams that grow stronger through change instead of breaking." },
      { tEs: "Humanidad Aumentada", tEn: "Augmented Humanity", dEs: "Superar el miedo al reemplazo mediante una cultura de colaboración humano-máquina.", dEn: "Overcoming the fear of replacement through a human-machine collaboration culture." },
      { tEs: "Liderazgo Elástico", tEn: "Elastic Leadership", dEs: "Gestión de equipos que deben operar en \"modo beta\" constante.", dEn: "Managing teams that must operate in constant \"beta mode\"." },
    ],
  },
  {
    id: "del-guion-al-algoritmo",
    icon: Clapperboard,
    titleEs: "Del Guion al Algoritmo", titleEn: "From Script to Algorithm",
    subEs: "La IA como pincel aumentado", subEn: "AI as an augmented brush",
    descEs: "Diseñada para equipos creativos, de marketing y directivos que necesitan entender cómo escala la producción de contenido con IA Generativa.",
    descEn: "Designed for creative teams, marketing teams and executives who need to understand how content production scales with Generative AI.",
    focusEs: "La eficiencia estética y la profesionalización del uso de IA dentro de la empresa.",
    focusEn: "Aesthetic efficiency and professionalizing the use of AI inside the company.",
    impactEs: "Reducción de tiempos de producción hasta en un 40% y una hoja de ruta clara para integrar al experto en IA en sus flujos de trabajo.",
    impactEn: "Production time reduced by up to 40% and a clear roadmap to integrate the AI expert into your workflows.",
    temario: [
      { tEs: "El Rol del AI Expert", tEn: "The AI Expert Role", dEs: "Por qué su empresa necesita un perfil estratégico que domine la narrativa artística y la ingeniería de prompts para garantizar calidad, coherencia y ética.", dEn: "Why your company needs a strategic profile mastering artistic narrative and prompt engineering to guarantee quality, coherence and ethics." },
      { tEs: "Narrativas Sintéticas", tEn: "Synthetic Narratives", dEs: "Optimización de flujos de trabajo en pre y postproducción.", dEn: "Workflow optimization in pre and post-production." },
      { tEs: "Identidad de Marca", tEn: "Brand Identity", dEs: "Definir dónde termina la máquina y dónde empieza el artista para mantener la esencia corporativa.", dEn: "Defining where the machine ends and the artist begins to preserve the corporate essence." },
    ],
  },
  {
    id: "invisible-o-indispensable",
    icon: Radar,
    titleEs: "Invisible o Indispensable", titleEn: "Invisible or Indispensable",
    subEs: "Dominando los motores de respuesta", subEn: "Mastering the answer engines",
    descEs: "Una conferencia estratégica para directivos que entienden que el SEO tradicional ya no es suficiente en un mundo de respuestas generativas.",
    descEn: "A strategic keynote for executives who understand that traditional SEO is no longer enough in a world of generative answers.",
    focusEs: "Estrategias para que su marca sea la \"respuesta elegida\" en el nuevo ecosistema de búsqueda inteligente.",
    focusEn: "Strategies to make your brand the \"chosen answer\" in the new intelligent search ecosystem.",
    impactEs: "Posicionamiento estratégico en las fuentes de información que sus clientes consultarán en el futuro cercano.",
    impactEn: "Strategic positioning in the information sources your clients will consult in the near future.",
    temario: [
      { tEs: "GEO (Generative Engine Optimization)", tEn: "GEO (Generative Engine Optimization)", dEs: "Cómo ser citado y recomendado por la IA generativa.", dEn: "How to be cited and recommended by generative AI." },
      { tEs: "AEO (Answer Engine Optimization)", tEn: "AEO (Answer Engine Optimization)", dEs: "La transición del \"clic en un enlace\" a la \"respuesta directa\".", dEn: "The transition from \"clicking a link\" to the \"direct answer\"." },
      { tEs: "Adaptabilidad Técnica", tEn: "Technical Adaptability", dEs: "Preparar sus activos digitales para modelos como Perplexity, Gemini y ChatGPT.", dEn: "Preparing your digital assets for models like Perplexity, Gemini and ChatGPT." },
    ],
  },
];

const Conferencias = () => {
  const { lang } = useT();
  const navigate = useNavigate();
  const es = lang !== "en";

  useEffect(() => {
    const CANONICAL = "https://www.paulaandreapinzon.com/conferencias/";
    const title = es
      ? "Conferencias de IA 2026 | Paula Andrea Pinzón — Mentes en Beta, Del Guion al Algoritmo, Invisible o Indispensable"
      : "AI Keynotes 2026 | Paula Andrea Pinzón";
    const description = es
      ? "Conferencias de IA para empresas y equipos creativos: Mentes en Beta, Del Guion al Algoritmo e Invisible o Indispensable. Charlas de Paula Andrea Pinzón sobre cómo integrar IA Generativa en flujos creativos, marca y estrategia empresarial."
      : "AI keynotes for companies and creative teams: Minds in Beta, From Script to Algorithm and Invisible or Indispensable. Paula Andrea Pinzón on integrating Generative AI into creative workflows, brand and business strategy.";

    // Sincroniza <title>, <meta> y <link rel="canonical"> con la ruta actual.
    // Solo afecta a la navegación SPA en cliente: los crawlers ya reciben estos
    // valores en el HTML pre-renderizado (dist/conferencias/index.html).
    // Se restaura el estado previo al desmontar (p. ej. al volver a la home).
    const restorers: Array<() => void> = [];

    const prevTitle = document.title;
    document.title = title;
    restorers.push(() => { document.title = prevTitle; });

    const upsertMeta = (
      selector: string,
      attr: "name" | "property",
      key: string,
      value: string,
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      const existed = !!el;
      const prevVal = el?.getAttribute("content") ?? null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
      restorers.push(() => {
        if (!existed) el?.remove();
        else if (prevVal !== null) el?.setAttribute("content", prevVal);
      });
    };

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", CANONICAL);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonExisted = !!canonical;
    const prevHref = canonical?.getAttribute("href") ?? null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", CANONICAL);
    restorers.push(() => {
      if (!canonExisted) canonical?.remove();
      else if (prevHref !== null) canonical?.setAttribute("href", prevHref);
    });

    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });

    return () => { restorers.reverse().forEach((fn) => fn()); };
  }, [es]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Conferencias de Paula Andrea Pinzón 2026",
    itemListElement: CONFS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: c.titleEs,
        alternateName: c.subEs,
        description: c.descEs,
        author: { "@type": "Person", name: "Paula Andrea Pinzón", url: "https://www.paulaandreapinzon.com/" },
        url: `https://www.paulaandreapinzon.com/conferencias#${c.id}`,
      },
    })),
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* Cabecera */}
      <header className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden" aria-labelledby="confs-title">
        <img src="/media/bg-waves-2.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover bg-drift opacity-70" />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(224 52% 6% / 0.55), hsl(224 52% 6% / 0.75) 60%, hsl(var(--background)) 100%)" }} />
        <div className="relative container mx-auto px-4 text-center max-w-4xl">
          <Reveal>
            <p className="text-sm md:text-base font-medium tracking-wide text-secondary text-glow-cyan mb-5">
              {es ? "Roadmap de conferencias 2026" : "2026 keynote roadmap"}
            </p>
            <h1 id="confs-title" className="font-display font-bold tracking-tight leading-[1.0] text-[clamp(2.5rem,7vw,4.75rem)] mb-6">
              {es ? "Conferencias que convierten la incertidumbre en " : "Keynotes that turn uncertainty into "}
              <span className="text-primary text-glow">{es ? "ventaja competitiva" : "competitive advantage"}</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-2xl mx-auto mb-8">
              {es
                ? "Estrategias de adaptabilidad, mentalidad y tecnología para la nueva era digital. Tres keynotes diseñados como un camino: cultura, producción y visibilidad."
                : "Adaptability, mindset and technology strategies for the new digital era. Three keynotes designed as a path: culture, production and visibility."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-primary-glow bg-primary hover:bg-primary text-primary-foreground font-semibold rounded-full px-8">
                <a href={SESSIONIZE_URL} target="_blank" rel="noopener noreferrer">
                  {es ? "Ver perfil en Sessionize" : "View Sessionize profile"} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-foreground/25 text-foreground hover:bg-foreground/10 hover:text-foreground hover:border-foreground/40 transition-colors"
                onClick={() => navigate("/#contact")}
              >
                {es ? "Agendar conferencia" : "Book a keynote"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-7">
              {es
                ? "Formatos: Keynote magistral (45–60 min) · Workshop inmersivo · Paneles y moderación · Español e inglés"
                : "Formats: Master keynote (45–60 min) · Immersive workshop · Panels & moderation · Spanish and English"}
            </p>
          </Reveal>
        </div>
      </header>

      {/* Conferencias: secuencia real 01-03 */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-20 md:space-y-28">
          {CONFS.map((c, i) => (
            <article key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-28">
              <div className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-start ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <Reveal>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-display font-bold text-5xl md:text-6xl text-primary/30 leading-none select-none">
                        0{i + 1}
                      </span>
                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${i % 2 === 1 ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>
                        <c.icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                    </div>
                    <h2 id={`${c.id}-title`} className="font-display font-bold tracking-tight text-3xl md:text-4xl leading-[1.05] mb-2">
                      {es ? c.titleEs : c.titleEn}
                    </h2>
                    <p className={`text-lg font-medium mb-5 ${i % 2 === 1 ? "text-secondary" : "text-primary"}`}>
                      {es ? c.subEs : c.subEn}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">{es ? c.descEs : c.descEn}</p>
                    <p className="text-sm font-semibold text-foreground mb-1.5">{es ? "Enfoque" : "Focus"}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">{es ? c.focusEs : c.focusEn}</p>
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 glow-violet">
                      <p className="text-xs font-semibold tracking-wide text-primary mb-1.5">{es ? "IMPACTO" : "IMPACT"}</p>
                      <p className="text-foreground/95 leading-relaxed">{es ? c.impactEs : c.impactEn}</p>
                    </div>
                  </Reveal>
                </div>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <Reveal delay={0.12}>
                    <p className="text-sm font-medium text-muted-foreground mb-4">{es ? "Temario" : "Agenda"}</p>
                    <div className="grid sm:grid-cols-1 gap-4">
                      {c.temario.map((tem) => (
                        <TiltCard key={tem.tEs} max={4}>
                          <div className="card-lift rounded-2xl border border-border bg-card p-6">
                            <h3 className="font-display font-semibold text-lg mb-1.5">{es ? tem.tEs : tem.tEn}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{es ? tem.dEs : tem.dEn}</p>
                          </div>
                        </TiltCard>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Gobernanza ISO 42001 */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal>
            <div className="relative rounded-2xl border border-primary/25 overflow-hidden p-8 md:p-10 text-center glow-violet">
              <img src="/media/bg-waves-1.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover bg-drift" />
              <div aria-hidden="true" className="absolute inset-0 bg-background/85" />
              <div className="relative">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-4" aria-hidden="true" />
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                  {es ? "Gobernanza y ética: el estándar ISO/IEC 42001" : "Governance and ethics: the ISO/IEC 42001 standard"}
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {es
                    ? "Toda implementación se acompaña con un enfoque seguro y auditable. La innovación sin gobernanza es un riesgo; con gobernanza, es una estrategia sostenible."
                    : "Every implementation comes with a safe, auditable approach. Innovation without governance is a risk; with governance, it is a sustainable strategy."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 md:py-24 atmosphere-violet">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <blockquote className="font-display font-semibold text-2xl md:text-3xl leading-snug mb-8">
              {es
                ? "\"La tecnología evoluciona cada semana; la mentalidad debe evolucionar cada día. ¿Comenzamos?\""
                : "\"Technology evolves every week; mindset must evolve every day. Shall we begin?\""}
            </blockquote>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="btn-primary-glow bg-primary hover:bg-primary text-primary-foreground font-semibold rounded-full px-8"
                onClick={() => navigate("/#contact")}
              >
                {es ? "Agendar conferencia" : "Book a keynote"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-transparent border-foreground/25 text-foreground hover:bg-foreground/10 hover:text-foreground hover:border-foreground/40 transition-colors">
                <a href={SESSIONIZE_URL} target="_blank" rel="noopener noreferrer">
                  Sessionize <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Conferencias;
