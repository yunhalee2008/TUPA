import type { ReactNode } from "react";
import type { CopyPair } from "@/lib/content";

/**
 * Renders one bilingual copy pair as the site-wide ko-only/en-only span pair.
 * Supports the two authoring conveniences documented in the Notion 페이지 문구
 * DB: [텍스트](https://…) inline links and newlines (→ <br/>), so the admin
 * can edit copy — links included — without touching code.
 */
// URL part allows single-level balanced parens so DOI links like
// doi.org/10.1016/S0140-6736(20)31142-9 survive intact.
const LINK_RE = /\[([^\]]+)\]\((https?:\/\/(?:[^\s()]|\([^\s()]*\))+)\)/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  text.split("\n").forEach((line, lineIdx) => {
    if (lineIdx > 0) nodes.push(<br key={`br-${lineIdx}`} />);
    let last = 0;
    for (const m of Array.from(line.matchAll(LINK_RE))) {
      if (m.index! > last) nodes.push(line.slice(last, m.index));
      nodes.push(
        <a
          key={`a-${lineIdx}-${m.index}`}
          href={m[2]}
          target="_blank"
          rel="noreferrer"
          className="text-cobalt-600 underline-offset-2 hover:underline"
        >
          {m[1]}
        </a>,
      );
      last = m.index! + m[0].length;
    }
    if (last < line.length) nodes.push(line.slice(last));
  });
  return nodes;
}

export default function Copy({ t }: { t: CopyPair }) {
  return (
    <>
      <span className="ko-only">{renderInline(t.ko)}</span>
      <span className="en-only">{renderInline(t.en)}</span>
    </>
  );
}
