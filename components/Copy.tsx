import type { CopyPair } from "@/lib/content";
import { renderInlineMarkdown } from "@/components/InlineMarkdown";

/**
 * Renders one bilingual copy pair as the site-wide ko-only/en-only span pair.
 * Supports the authoring conveniences documented in the Notion 페이지 문구 DB:
 * [텍스트](https://…) inline links, **텍스트** bold emphasis, and newlines
 * (→ <br/>), so the admin can edit copy — formatting included — without
 * touching code.
 */
export default function Copy({ t }: { t: CopyPair }) {
  return (
    <>
      <span className="ko-only">{renderInlineMarkdown(t.ko)}</span>
      <span className="en-only">{renderInlineMarkdown(t.en)}</span>
    </>
  );
}
