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
      {
        source:
          "/propiedad-intelectual-ia/La%20Inteligencia%20Artificial%20Generativa%20ante%20el%20Desaf%C3%ADo%20del%20Derecho%20de%20Autor%20en%20la%20Uni%C3%B3n%20Europea",
        destination:
          "/propiedad-intelectual-ia/la-inteligencia-artificial-generativa-ante-el-desafio-del-derecho-de-autor-en-la-union-europea",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
