"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const POSTER_ALT =
  "Miniature paper city seen from above, where buildings form the letters TUPA";

/**
 * Hero background video. The video itself carries the TUPA wordmark
 * (letter-shaped buildings), so no text is overlaid on it.
 * Falls back to the poster image when the user prefers reduced motion,
 * and pauses whenever it scrolls out of the viewport.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <Image
        src="/hero/hero-poster.jpg"
        alt={POSTER_ALT}
        width={1284}
        height={716}
        priority
        className="max-h-[78vh] w-full object-cover"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero/hero-poster.jpg"
      aria-label={POSTER_ALT}
      className="max-h-[78vh] w-full object-cover"
    >
      <source src="/hero/hero.webm" type="video/webm" />
      <source src="/hero/hero.mp4" type="video/mp4" />
    </video>
  );
}
