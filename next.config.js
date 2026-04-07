/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {},
  },

  onDemandEntries: {
    maxInactiveAge: 5 * 60 * 1000,
    pagesBufferLength: 0,
  },

  compress: true,
  productionBrowserSourceMaps: false,

  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365,
    formats: ['image/webp'],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [16, 32, 64, 128, 256],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [];
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;
