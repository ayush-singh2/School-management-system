import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@school-os/ui", "@school-os/utils"],
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3001"] },
  },
};

export default nextConfig;
