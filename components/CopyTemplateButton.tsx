"use client";

import { useEffect, useRef, useState } from "react";

/** Copies an application email template to the clipboard with feedback. */
export default function CopyTemplateButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers / non-secure contexts.
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={copied ? "btn-outline mt-4" : "btn-primary mt-4"}
    >
      {copied ? (
        <>
          <span className="ko-only">✓ 복사됨 — 이메일에 붙여넣으세요</span>
          <span className="en-only">✓ Copied — paste it into an email</span>
        </>
      ) : (
        <>
          <span className="ko-only">지원 양식 복사하기</span>
          <span className="en-only">Copy application template</span>
        </>
      )}
    </button>
  );
}
