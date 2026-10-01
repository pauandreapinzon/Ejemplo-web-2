import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, TranslationKey } from "./translations";

export type Lang = "es" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const STORAGE_KEY = "paula-lang";

const detectInitialLang = (): Lang => {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved === "es" || saved === "en") return saved;
  const nav = navigator.language?.toLowerCase() || "es";
  return nav.startsWith("en") ? "en" : "es";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const initial = detectInitialLang();
    setLangState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.es[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useT = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
};
