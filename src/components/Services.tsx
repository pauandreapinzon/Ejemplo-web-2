import { Sparkles, Video, GraduationCap, Lightbulb } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useT } from "@/i18n/LanguageContext";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const SERVICES = [
  { icon: Sparkles, titleKey: "services.s1.title", descKey: "services.s1.desc", span: "lg:col-span-7", color: "text-primary", chip: "bg-primary/10", featured: true },
  { icon: GraduationCap, titleKey: "services.s3.title", descKey: "services.s3.desc", span: "lg:col-span-5", color: "text-secondary", chip: "bg-secondary/10", featured: false },
  { icon: Video, titleKey: "services.s2.title", descKey: "services.s2.desc", span: "lg:col-span-5", color: "text-secondary", chip: "bg-secondary/10", featured: false },
  { icon: Lightbulb, titleKey: "services.s4.title", descKey: "services.s4.desc", span: "lg:col-span-7", color: "text-primary", chip: "bg-primary/10", featured: false },
] as const;

const Services = () => {
  const { t, lang } = useT();
  const reduce = useReducedMotion() ?? false;
  return (
    <section id="services" className="py-24 md:py-28">
      <div className="container mx-auto px-4">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="font-display font-bold tracking-tight text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] mb-5">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("services.lead")}</p>
        </Reveal>

        {/* Pieza audiovisual: IA + SEO/GEO en acción */}
        <Reveal className="mb-12">
          <div className="relative rounded-2xl overflow-hidden border border-primary/30 glow-violet">
            <video
              className="w-full aspect-video object-cover"
              src="/media/seo-geo.mp4"
              poster="/media/seo-geo-poster.webp"
              autoPlay={!reduce}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={lang === "en" ? "AI and SEO-GEO consulting showcase video" : "Video muestra de consultoría en IA y SEO-GEO"}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, hsl(224 52% 6% / 0.45), transparent 40%)" }}
            />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-5 md:gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.titleKey} delay={i * 0.08} className={s.span}>
              <TiltCard className="h-full">
                <article
                  className={`card-lift h-full rounded-2xl border bg-card p-7 md:p-9 ${
                    s.featured ? "border-primary/35 glow-violet" : "border-border"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl ${s.chip} ${s.color} flex items-center justify-center mb-6`}>
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-xl md:text-2xl mb-3 text-foreground">
                    {t(s.titleKey as any)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{t(s.descKey as any)}</p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
