interface SectionHeadingProps {
  index: string;
  titleEn: string;
  titleKo?: string;
}

/**
 * Left column of the editorial two-column section layout.
 * Place inside a `lg:grid lg:grid-cols-12` parent; this takes 3 columns,
 * content takes the remaining 9.
 */
export default function SectionHeading({ index, titleEn, titleKo }: SectionHeadingProps) {
  return (
    <div className="lg:col-span-3">
      <p className="mono-label">
        {index} — {titleEn}
      </p>
      {titleKo ? (
        <h2 className="mt-2 text-2xl font-bold text-cobalt-900">
          <span className="ko-only">{titleKo}</span>
          <span className="en-only">{titleEn}</span>
        </h2>
      ) : null}
    </div>
  );
}
