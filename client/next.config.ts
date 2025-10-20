import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  allowedDevOrigins: ['192.168.1.241', 'localhost', '127.0.0.1'],
  /* config options here */
};

export default nextConfig;
