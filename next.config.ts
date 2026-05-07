import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configuração para garantir estabilidade máxima com Turbopack. */
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

