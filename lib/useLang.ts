"use client";

import { useEffect, useState } from "react";

export type Lang = "ko" | "en";

/**
 * Current UI language, mirrored from the html[data-lang] attribute that
 * LangToggle mutates. Starts at "ko" (the server-rendered default) so the
 * first client render matches SSR, then reflects the real value and any
 * later toggles via a MutationObserver.
 *
 * Use this for text that can't rely on the CSS .ko-only/.en-only spans —
 * e.g. <option> labels and input placeholders, which only hold plain text.
 */
export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("ko");

  useEffect(() => {
    const read = () =>
      setLang(document.documentElement.dataset.lang === "en" ? "en" : "ko");
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-lang"],
    });
    return () => observer.disconnect();
  }, []);

  return lang;
}
