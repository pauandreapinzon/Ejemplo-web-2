import { Mic, Briefcase, GraduationCap, BookOpen } from "lucide-react";
import { useT } from "@/i18n/LanguageContext";
import Reveal from "@/components/Reveal";
import PortraitDepth from "@/components/PortraitDepth";

const CREDENTIALS = [
  { icon: Mic, titleKey: "about.b1.title", descKey: "about.b1.desc", color: "text-primary", chip: "bg-primary/10" },
  { icon: Briefcase, titleKey: "about.b2.title", descKey: "about.b2.desc", color: "text-secondary", chip: "bg-secondary/10" },
  { icon: GraduationCap, titleKey: "about.b3.title", descKey: "about.b3.desc", color: "text-primary", chip: "bg-primary/10" },
  { icon: BookOpen, titleKey: "about.b4.title", descKey: "about.b4.desc", color: "text-secondary", chip: "bg-secondary/10" },
] as const;

const About = () => {
  const { t } = useT();
  return (
    <section
      id="about"
      className="py-24 md:py-32 atmosphere-violet"
      itemScope
      itemType="https://schema.org/Person"
      aria-labelledby="about-heading"
    >
      <link itemProp="url" href="https://www.paulaandreapinzon.com/" />
      <meta itemProp="name" content="Paula Andrea Pinzón" />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
          <Reveal className="relative">
            <div className="relative max-w-md mx-auto">
              <PortraitDepth alt={t("about.portrait.alt")} />
            </div>
            <meta itemProp="image" content="/media/paula-focus.webp" />
          </Reveal>

          <div>
            <Reveal>
              <h2
                id="about-heading"
                className="font-display font-bold tracking-tight text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] mb-6"
              >
                {t("about.title")}
              </h2>
              <p
                data-speakable="true"
                className="text-lg text-foreground/90 leading-relaxed mb-10 max-w-2xl"
                itemProp="description"
              >
                {t("about.lead")}
              </p>
            </Reveal>

            <div className="divide-y divide-border/70">
              {CREDENTIALS.map((c, i) => (
                <Reveal key={c.titleKey} delay={i * 0.08}>
                  <article className="flex gap-5 py-6 group">
                    <div
                      className={`shrink-0 h-11 w-11 rounded-xl ${c.chip} ${c.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <c.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className={`font-display font-semibold text-lg md:text-xl mb-1.5 ${c.color}`}>
                        {t(c.titleKey as any)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{t(c.descKey as any)}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
