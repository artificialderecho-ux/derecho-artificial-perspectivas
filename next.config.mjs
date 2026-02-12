/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimización de imágenes (AVIF + WebP + tamaños responsivos)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },

  // Compresión y minificación
  compress: true,
  swcMinify: true,

  // Headers de seguridad (RGPD y buenas prácticas)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Tus redirects y rewrites actuales (los mantenemos)
  async redirects() {
    return [
      {
        source: '/guias-protocolos',
        destination: '/recursos/guias',
        permanent: true,
      },
      {
        source: '/guias-protocolos/guias',
        destination: '/recursos/guias',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/Recursos/Analisis/:path*',
        destination: '/Recursos/Analisis/:path*',
      },
    ];
  },
};

export default nextConfig;