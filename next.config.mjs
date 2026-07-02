/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep build output out of iCloud sync (see CLAUDE.md: iCloud 환경 주의)
  distDir: ".next.nosync",
};

export default nextConfig;
