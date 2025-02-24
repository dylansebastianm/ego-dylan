import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['challenge.egodesign.dev'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Deshabilita ESLint en el build
  },
  typescript: {
    ignoreBuildErrors: true, // Deshabilita errores de TypeScript en el build
  },
  compiler: {
    styledComponents: true, 
  },
  reactStrictMode: true, 
  swcMinify: true, 
};

export default nextConfig
