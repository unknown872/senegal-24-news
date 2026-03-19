/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://senegal24.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/api/*"],
};