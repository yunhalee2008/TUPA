import type { ReactNode } from "react";
import { parseInlineMarkdown } from "@/lib/inline-markdown";

export function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  parseInlineMarkdown(text).forEach((segment, idx) => {
    switch (segment.kind) {
      case "text":
        nodes.push(segment.value);
        break;
      case "break":
        nodes.push(<br key={`br-${idx}`} />);
        break;
      case "bold":
        nodes.push(<strong key={`b-${idx}`}>{segment.value}</strong>);
        break;
      case "link":
        nodes.push(
          <a
            key={`a-${idx}`}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cobalt-600 underline-offset-2 hover:underline"
          >
            {segment.label}
          </a>,
        );
        break;
    }
  });
  return nodes;
}

export default function InlineMarkdown({ text }: { text: string }) {
  return <>{renderInlineMarkdown(text)}</>;
}
