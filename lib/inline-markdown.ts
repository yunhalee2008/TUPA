/**
 * Shared inline Markdown subset for Notion rich-text fields rendered on the site.
 * Supports [label](https://url) links, **bold**, and newline → break.
 *
 * Used by 페이지 문구 (<Copy>) and 모집공고 descriptions (<OpeningCard>).
 */

/** URL part allows single-level balanced parens (DOI links with parens). */
export const INLINE_MARKDOWN_RE =
  /\[([^\]]+)\]\((https?:\/\/(?:[^\s()]|\([^\s()]*\))+)\)|\*\*([^*]+)\*\*/g;

export type InlineSegment =
  | { kind: "text"; value: string }
  | { kind: "link"; label: string; href: string }
  | { kind: "bold"; value: string }
  | { kind: "break" };

export function parseInlineMarkdown(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  text.split("\n").forEach((line, lineIdx) => {
    if (lineIdx > 0) segments.push({ kind: "break" });
    let last = 0;
    for (const m of Array.from(line.matchAll(INLINE_MARKDOWN_RE))) {
      if (m.index! > last) {
        segments.push({ kind: "text", value: line.slice(last, m.index) });
      }
      if (m[1] !== undefined && m[2] !== undefined) {
        segments.push({ kind: "link", label: m[1], href: m[2] });
      } else if (m[3] !== undefined) {
        segments.push({ kind: "bold", value: m[3] });
      }
      last = m.index! + m[0].length;
    }
    if (last < line.length) segments.push({ kind: "text", value: line.slice(last) });
  });
  return segments;
}

/** Test helper: ordered link labels and hrefs extracted from a string. */
export function extractMarkdownLinks(
  text: string,
): Array<{ label: string; href: string }> {
  return parseInlineMarkdown(text)
    .filter((s): s is Extract<InlineSegment, { kind: "link" }> => s.kind === "link")
    .map(({ label, href }) => ({ label, href }));
}
