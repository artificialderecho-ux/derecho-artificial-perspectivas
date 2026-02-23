/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://derechoartificial.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://derechoartificial.com/sitemap.xml',
    ],
  },
  outDir: './public',
};
