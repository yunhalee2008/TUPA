/** @type {import('next').NextConfig} */
const nextConfig = {
  // Claude Code preview servers set NEXT_DIST_DIR=.next-preview so they never
  // share build artifacts with a user-run `npm run dev` (avoids
  // "missing required error components" / missing-chunk corruption).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Serve images as-is, bypassing Vercel's image optimizer. Notion's signed
    // S3 photo URLs rotate on every revalidation, so each cycle counted as
    // brand-new transformations and exhausted the free-tier quota (5,000/mo).
    // All site images are pre-sized at import time, so optimization adds
    // little — and unoptimized keeps member photos from erroring mid-month.
    unoptimized: true,
    // Files uploaded to the Notion CMS are served from signed S3 URLs.
    remotePatterns: [
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "file.notion.so" },
    ],
  },
};

export default nextConfig;
