import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: remove this later
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
