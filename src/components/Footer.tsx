import { Linkedin, Youtube, Instagram, GraduationCap, ExternalLink, Mic } from "lucide-react";
import { useT } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useT();
  const year = new Date().getFullYear();
  const NAV = [
    { href: "/conferencias", key: "nav.confs" },
    { href: "#about", key: "nav.about" },
    { href: "#services", key: "nav.services" },
    { href: "#portfolio", key: "nav.portfolio" },
    { href: "#stories", key: "nav.stories" },
    { href: "#testimonials", key: "nav.testimonials" },
    { href: "#faq", key: "nav.faq" },
    { href: "#contact", key: "nav.contact" },
    { href: "/blog", key: "nav.blog" },
  ] as const;
  const SOCIAL = [
    { href: "https://www.linkedin.com/in/paula-pinzon-maldonado/", label: "LinkedIn", Icon: Linkedin },
    { href: "https://www.youtube.com/@pauandreapinzon", label: "YouTube", Icon: Youtube },
    { href: "https://www.instagram.com/pauandreapinzon_ia/", label: "Instagram", Icon: Instagram },
    { href: "https://scholar.google.com/citations?user=AjsKousAAAAJ", label: "Google Scholar", Icon: GraduationCap },
    { href: "https://orcid.org/0009-0009-8462-1384", label: "ORCID", Icon: ExternalLink },
    { href: "https://sessionize.com/paula-andrea-pinzon/", label: "Sessionize", Icon: Mic },
  ];
  return (
    <footer className="py-12 bg-background border-t border-border" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display font-bold text-lg mb-3">Paula Andrea <span className="text-primary">Pinzón</span></h3>
            <address className="text-sm text-muted-foreground not-italic leading-relaxed whitespace-pre-line">{t("footer.address")}</address>
          </div>
          <nav aria-label="Site navigation">
            <h3 className="font-bold text-lg mb-3">{t("footer.sections.title")}</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href.startsWith("#") ? `/${n.href}` : n.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(n.key as any)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Social profiles">
            <h3 className="font-bold text-lg mb-3">{t("footer.follow.title")}</h3>
            <ul className="flex flex-wrap gap-3">
              {SOCIAL.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer me" aria-label={label} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground">© {year} Paula Pinzón Maldonado. {t("footer.copyright")}</p>
          <p className="text-sm text-muted-foreground mt-2">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
