import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: undefined,
      allowedOrigins: undefined,
    },
    authInterrupts: true, // for unauthorized
  },
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  images: {
    formats: ["image/avif", "image/webp"], // Enable modern image formats
  },
  async headers() {
    return [
      {
        source: "/avatars/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Enable aggressive caching for avatars
          },
        ],
      },
    ];
  },
};

export default nextConfig;
