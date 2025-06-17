import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,  // This will ignore TypeScript errors during the build
  },
};

export default nextConfig;
