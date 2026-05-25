import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-only Next.js indicator that overlaps the mobile bottom nav.
  devIndicators: false,
  // Allow remote fal.ai image URLs in the live regen demo.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fal.media" },
      { protocol: "https", hostname: "v3.fal.media" },
      { protocol: "https", hostname: "v2.fal.media" },
      { protocol: "https", hostname: "v3b.fal.media" },
    ],
  },
};

export default nextConfig;
