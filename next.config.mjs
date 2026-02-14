/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      // Consolidate news under /recursos/noticias
      {
        source: "/actualidad-ia",
        destination: "/recursos/noticias",
        permanent: true,
      },
      {
        source: "/actualidad-ia/:slug*",
        destination: "/recursos/noticias/:slug*",
        permanent: true,
      },
      // English redirects to consolidated resources
      {
        source: "/en/ai-news",
        destination: "/recursos/noticias",
        permanent: true,
      },
      {
        source: "/en/ai-news/:slug*",
        destination: "/recursos/noticias/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
