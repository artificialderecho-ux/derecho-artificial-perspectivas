/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ]
  },
};

export default nextConfig;
