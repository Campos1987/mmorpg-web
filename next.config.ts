import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost:3000', '192.168.0.153']
};

export default nextConfig;
