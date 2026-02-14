/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Consolidate news under /recursos/noticias
      {
        source: "/actualidad-ia",
        destination: "/recursos/noticias",
        permanent: true,
      },
      {
        source: "/actualidad-ia/:slug",
        destination: "/recursos/noticias/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
