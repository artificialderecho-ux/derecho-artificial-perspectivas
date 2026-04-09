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

  experimental: {
    cpus: 1,
  },

  async headers() {
    return [];
  },

  async redirects() {
    return [
      {
        source: '/ia-global',
        destination: '/global-ia',
        permanent: true,
      },
      {
        source: '/ia-global/:slug*',
        destination: '/global-ia/:slug*',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;
