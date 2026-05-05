import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "synapse-lms.t3.tigrisfiles.io",
        port: "",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;
