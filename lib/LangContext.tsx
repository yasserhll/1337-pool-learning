"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "./i18n";

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; }
const Ctx = createContext<LangCtx>({ lang: "fr", setLang: () => {} });

function initLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const s = localStorage.getItem("piscine_lang");
  return (s === "fr" || s === "en") ? s : "fr";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("piscine_lang", l);
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
