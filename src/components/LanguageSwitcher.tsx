import { Globe } from "lucide-react";
import { useT } from "@/i18n/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, setLang, t } = useT();
  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg p-1"
      role="group"
      aria-label={t("lang.switch.aria")}
    >
      <Globe className="h-4 w-4 text-muted-foreground ml-2" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          lang === "es" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
