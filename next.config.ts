import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configuração para estabilidade máxima */
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
};



export default nextConfig;

