"use client";

import Image from "next/image";
import { useState } from "react";

export interface SlidePhoto {
  src: string;
  alt: string;
}

/** Large photo viewer with prev/next arrows (used for the About group photos). */
export default function PhotoSlider({ photos }: { photos: SlidePhoto[] }) {
  const [index, setIndex] = useState(0);
  const go = (delta: number) =>
    setIndex((i) => (i + delta + photos.length) % photos.length);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Group photos"
      className="relative overflow-hidden rounded-xl border border-mapline"
    >
      <div className="relative aspect-[16/9] w-full">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            priority={i === 0}
            className={`object-cover transition-opacity duration-300 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-cobalt-900 shadow-sm backdrop-blur transition-colors hover:bg-paper"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10 3 5 8l5 5" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-cobalt-900 shadow-sm backdrop-blur transition-colors hover:bg-paper"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m6 3 5 5-5 5" />
        </svg>
      </button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Photo ${i + 1}`}
            aria-current={i === index}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
