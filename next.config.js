/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: process.env.NODE_ENV === "production" ? `/calendar/` : undefined,
  trailingSlash: true,
};

module.exports = nextConfig;
