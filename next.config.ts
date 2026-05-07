import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configuração para estabilidade máxima (Versão 1.0.1 - Produção) */
  reactStrictMode: true,

  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};


export default nextConfig;

