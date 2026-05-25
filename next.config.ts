import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — generates /out as plain HTML/CSS/JS/assets.
  // Cloudflare Pages serves /out directly. No server runtime needed.
  output: "export",
  // Trailing slash for cleaner CF Pages URL handling.
  trailingSlash: true,
  // next/image is unused on this site; disable optimizer so static export works.
  images: { unoptimized: true },
  // Hide the dev-only Next.js indicator that overlaps the mobile bottom nav.
  devIndicators: false,
};

export default nextConfig;
