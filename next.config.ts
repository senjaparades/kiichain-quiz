import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Tambahkan opsi lain jika ada
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
