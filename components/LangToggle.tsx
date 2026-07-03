"use client";

import { useEffect, useState } from "react";

type Lang = "ko" | "en";

function apply(lang: Lang) {
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang;
}

export default function LangToggle() {
  const [lang, setLang] = useState<Lang>("ko");

  useEffect(() => {
    const saved = window.localStorage.getItem("tupa-lang");
    if (saved === "en" || saved === "ko") {
      setLang(saved);
      apply(saved);
    }
  }, []);

  const toggle = () => {
    const next: Lang = lang === "ko" ? "en" : "ko";
    setLang(next);
    apply(next);
    window.localStorage.setItem("tupa-lang", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
      className="flex items-center gap-1 rounded-full border border-mapline bg-white px-3 py-1.5 font-mono text-xs transition-colors hover:border-cobalt-600"
    >
      <span className={lang === "ko" ? "font-bold text-cobalt-900" : "text-body/50"}>
        KO
      </span>
      <span className="text-body/30">/</span>
      <span className={lang === "en" ? "font-bold text-cobalt-900" : "text-body/50"}>
        EN
      </span>
    </button>
  );
}
