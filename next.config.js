/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {},
  },

  onDemandEntries: {
    maxInactiveAge: 5 * 60 * 1000,
    pagesBufferLength: 0,
  },

  // Reduce memory usage during build
  compiler: {
    removeConsole: true,
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
    // turbopackMinifier: true, // Disabled to reduce memory usage during build
  },

  async headers() {
    return [];
  },

  async rewrites() {
    return [];
  },

  async redirects() {
    return [
      {
        source: "/en",
        destination: "https://decisionandlaw.com/",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "https://decisionandlaw.com/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
