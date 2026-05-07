import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configuração minimalista para garantir estabilidade máxima com Turbopack. */
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

