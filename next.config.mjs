/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/recursos",
        destination: "/actualidad-ia",
        permanent: true,
      },
      {
        source: "/recursos/noticias",
        destination: "/actualidad-ia",
        permanent: true,
      },
      {
        source: "/en/ai-news",
        destination: "/actualidad-ia",
        permanent: true,
      },
      {
        source: "/en/ai-news/:slug*",
        destination: "/actualidad-ia",
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
