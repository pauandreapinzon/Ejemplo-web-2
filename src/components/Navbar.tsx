import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useT } from "@/i18n/LanguageContext";
import { scrollToId } from "@/lib/scroll";
import { introDelay } from "@/lib/intro";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", key: "nav.about" },
  { id: "services", key: "nav.services" },
  { id: "portfolio", key: "nav.portfolio" },
  { id: "libro", key: "nav.book" },
] as const;

const Navbar = () => {
  const { lang, setLang, t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const logoClicksRef = useRef<number[]>([]);
  const [tipVisible, setTipVisible] = useState(false);
  const [clickPulse, setClickPulse] = useState(0);
  const tipDismissedRef = useRef(false);
  const hoverTimerRef = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <motion.nav
      initial={reduce ? false : { y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: introDelay() + 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Navegación principal"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl border-b border-border/70"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 md:h-[72px] flex items-center justify-between gap-4">
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              const now = Date.now();
              logoClicksRef.current = [...logoClicksRef.current.filter((ts) => now - ts < 4000), now];
              setClickPulse((v) => v + 1);
              tipDismissedRef.current = true;
              setTipVisible(false);
              if (logoClicksRef.current.length >= 5) {
                logoClicksRef.current = [];
                toast({
                  title: lang === "en" ? "Jaime, the digital butler" : "Jaime, el mayordomo digital",
                  description:
                    lang === "en"
                      ? "\"Yes, sir. If you are happy, I am happy.\""
                      : "\"Sí, señor. Si ustedes son felices, yo soy feliz.\"",
                });
              }
            }}
            onMouseEnter={() => {
              if (tipDismissedRef.current) return;
              if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
              hoverTimerRef.current = window.setTimeout(() => setTipVisible(true), 350);
            }}
            onMouseLeave={() => {
              if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
              setTipVisible(false);
            }}
            aria-label={lang === "en" ? "Back to top. Tap 5 times to summon Jaime" : "Volver al inicio. Toca 5 veces para invocar a Jaime"}
            aria-describedby="logo-tip"
            className="group relative flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <motion.span
              key={clickPulse}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.12, 1], boxShadow: ["0 0 0 0 hsl(var(--violet-glow) / 0.5)", "0 0 0 14px hsl(var(--violet-glow) / 0)", "0 0 0 0 hsl(var(--violet-glow) / 0)"] }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/20 glow-violet"
            >
              <span className="font-display font-bold text-sm tracking-tight text-foreground">PA</span>
            </motion.span>
            <span className="hidden sm:inline font-display font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
              Paula Andrea <span className="text-primary">Pinzón</span>
            </span>
          </button>
          <AnimatePresence>
            {tipVisible && (
              <motion.div
                id="logo-tip"
                role="tooltip"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute top-full left-0 mt-3 whitespace-nowrap rounded-lg border border-primary/30 bg-background/95 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground shadow-lg"
              >
                <span className="text-primary">✨</span> {lang === "en" ? "Tap the logo 5 times to summon Jaime" : "Toca el logo 5 veces para invocar a Jaime"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(s.key as any)}
            </button>
          ))}
          <Link
            to="/conferencias"
            className={`link-underline text-sm font-medium transition-colors ${location.pathname === "/conferencias" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t("nav.confs")}
          </Link>
          <a
            href="/blog/"
            className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.blog")}
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="flex items-center gap-0.5 rounded-full border border-border bg-card/60 p-0.5"
            role="group"
            aria-label={t("lang.switch.aria")}
          >
            <Globe className="h-3.5 w-3.5 text-muted-foreground ml-1.5 hidden sm:block" aria-hidden="true" />
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-semibold transition-colors",
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            onClick={() => go("contact")}
            className="hidden md:inline-flex btn-primary-glow bg-primary text-primary-foreground hover:bg-primary font-semibold rounded-full px-5"
            aria-label={t("hero.cta.primary.aria")}
          >
            {t("hero.cta.primary")}
          </Button>

          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(s.id)}
                  className="text-left py-3 px-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  {t(s.key as any)}
                </button>
              ))}
              <Link
                to="/conferencias"
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {t("nav.confs")}
              </Link>
              <a
                href="/blog/"
                className="py-3 px-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {t("nav.blog")}
              </a>
              <Button
                onClick={() => go("contact")}
                className="mt-2 btn-primary-glow bg-primary text-primary-foreground hover:bg-primary font-semibold rounded-full"
              >
                {t("hero.cta.primary")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
