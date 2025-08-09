import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "sparrowhawknativeplants.com",
      },
      {
        protocol: "https",
        hostname: "developers.elementor.com",
      },
      {
        protocol: "https",
        hostname: "dbk52j1umm.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
