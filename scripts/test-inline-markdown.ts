import assert from "node:assert/strict";
import { extractMarkdownLinks, parseInlineMarkdown } from "../lib/inline-markdown";

const sample =
  "GKS 안내는 [이 링크](https://example.com)와 [공식 사이트](https://gr.mofa.go.kr/gr/main.do)를 참고하세요.";

const links = extractMarkdownLinks(sample);
assert.equal(links.length, 2);
assert.equal(links[0]?.label, "이 링크");
assert.equal(links[0]?.href, "https://example.com");
assert.equal(links[1]?.label, "공식 사이트");
assert.equal(links[1]?.href, "https://gr.mofa.go.kr/gr/main.do");

const withBold = parseInlineMarkdown("**중요** [이 링크](https://example.com)");
assert.deepEqual(withBold, [
  { kind: "bold", value: "중요" },
  { kind: "text", value: " " },
  { kind: "link", label: "이 링크", href: "https://example.com" },
]);

const multiline = parseInlineMarkdown("첫 줄\n둘째 줄");
assert.deepEqual(multiline, [
  { kind: "text", value: "첫 줄" },
  { kind: "break" },
  { kind: "text", value: "둘째 줄" },
]);

console.log("inline-markdown: all assertions passed");
