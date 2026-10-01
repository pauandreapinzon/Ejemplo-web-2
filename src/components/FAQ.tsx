import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useT } from "@/i18n/LanguageContext";

const FAQ = () => {
  const { lang, t } = useT();
  const faqs = [
    { qEs: "¿Tus conferencias son técnicas, inspiracionales o estratégicas?", qEn: "Are your talks technical, inspirational or strategic?", aEs: "Mi enfoque es híbrido y adaptable. Como auditora ISO 42001, tengo el rigor técnico para hablar con CLOs y CTOs; pero como artista y humanista, tengo la narrativa para inspirar a equipos creativos y de ventas.", aEn: "My approach is hybrid and adaptable. As an ISO 42001 auditor, I have the technical rigor to speak with CLOs and CTOs; but as an artist and humanist, I have the narrative to inspire creative and sales teams." },
    { qEs: "¿Cómo garantizas que la charla no sea 'más de lo mismo' sobre IA?", qEn: "How do you guarantee the talk is not 'more of the same' about AI?", aEs: "Huyo de los lugares comunes. Mientras la mayoría habla de 'prompts mágicos', yo hablo de Gobernanza, Estrategia y Creatividad Aumentada. Mis conferencias incluyen casos de uso reales y demostraciones en vivo.", aEn: "I avoid cliches. While most talk about 'magic prompts', I speak about Governance, Strategy and Augmented Creativity. My talks include real use cases and live demos." },
    { qEs: "¿La conferencia se adapta a mi industria (BPO, Educación, Marketing)?", qEn: "Does the talk adapt to my industry (BPO, Education, Marketing)?", aEs: "Absolutamente. No creo en las charlas 'enlatadas'. Antes del evento, realizo una sesión de alineación estratégica para entender los dolores de tu sector.", aEn: "Absolutely. I don't believe in canned talks. Before the event, I run a strategic alignment session to understand your sector's pain points." },
    { qEs: "Mi equipo tiene miedo de que la IA los reemplace. ¿Cómo abordas esto?", qEn: "My team fears AI will replace them. How do you handle this?", aEs: "Es uno de mis temas centrales. Mi enfoque es Humanista-Tecnológico: no hablo de reemplazo, sino de potenciación. Transformamos el miedo en curiosidad productiva.", aEn: "This is one of my core topics. My approach is Humanist-Technological: I don't talk about replacement, but empowerment. We turn fear into productive curiosity." },
    { qEs: "¿Hablas sobre ética y riesgos legales de la IA?", qEn: "Do you cover AI ethics and legal risks?", aEs: "Sí, y es un diferenciador clave. Al estar certificada en ISO/IEC 42001, abordo la IA desde la responsabilidad. Enseño a los líderes a innovar sin comprometer la seguridad de datos ni la reputación corporativa.", aEn: "Yes, and it's a key differentiator. Being ISO/IEC 42001 certified, I approach AI from a responsibility lens. I teach leaders to innovate without compromising data security or corporate reputation." },
    { qEs: "¿Qué formatos ofreces además de la Keynote tradicional?", qEn: "What formats do you offer beyond the traditional Keynote?", aEs: "Ofrezco tres formatos: Keynote Magistral (45-60 min), Workshops Inmersivos (taller práctico) y Paneles y Moderación.", aEn: "I offer three formats: Master Keynote (45-60 min), Immersive Workshops (hands-on training) and Panels and Moderation." },
    { qEs: "¿Qué necesito técnicamente para tus demostraciones en vivo?", qEn: "What do I need technically for your live demos?", aEs: "Simplifico la logística al máximo. Llevo mi propio hardware optimizado. Solo requiero internet estable y salida de audio/video estándar.", aEn: "I keep logistics as simple as possible. I bring my own optimized hardware. I only need stable internet and standard audio/video output." },
    { qEs: "¿Realizas conferencias en inglés o para audiencias internacionales?", qEn: "Do you give talks in English or for international audiences?", aEs: "Sí. Cuento con experiencia internacional capacitando a estudiantes de más de 15 países. Imparto sesiones en español e inglés.", aEn: "Yes. I have international experience training students from over 15 countries. I deliver sessions in Spanish and English." },
    { qEs: "¿Entregas algún material post-evento?", qEn: "Do you deliver post-event materials?", aEs: "Dependiendo del contrato, entrego Guías de Implementación, acceso a bibliotecas de Prompts exclusivas o una hoja de ruta resumida.", aEn: "Depending on the contract, I deliver Implementation Guides, access to exclusive prompt libraries or a summary roadmap." },
    { qEs: "¿Por qué Paula Pinzón y no otro experto en tecnología?", qEn: "Why Paula Pinzon and not another tech expert?", aEs: "Porque la IA ya no es solo código; es cultura. Soy una de las pocas voces en Latinoamérica que une la certificación técnica de alto nivel (ISO) con la sensibilidad de una pianista y artista.", aEn: "Because AI is no longer just code; it's culture. I'm one of the few voices in Latin America bridging high-level technical certification (ISO) with the sensitivity of a pianist and artist." },
  ];
  return (
    <section id="faq" className="py-24 md:py-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold tracking-tight text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] mb-5">{t("faq.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("faq.lead")}</p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-xl px-6 transition-colors hover:border-primary/40 data-[state=open]:border-primary/40">
              <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors">
                {lang === "en" ? faq.qEn : faq.qEs}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground whitespace-pre-line">
                {lang === "en" ? faq.aEn : faq.aEs}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
