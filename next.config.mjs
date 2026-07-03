/** @type {import('next').NextConfig} */
const nextConfig = {
  // Claude Code preview servers set NEXT_DIST_DIR=.next-preview so they never
  // share build artifacts with a user-run `npm run dev` (avoids
  // "missing required error components" / missing-chunk corruption).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Files uploaded to the Notion CMS are served from signed S3 URLs.
    remotePatterns: [
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "file.notion.so" },
    ],
  },
};

export default nextConfig;
