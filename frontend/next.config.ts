import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    allowedDevOrigins: ["192.168.30.147:3000"],
  },
};

export default nextConfig;
