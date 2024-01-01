/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://cjeongmin.github.io/calendar/"
      : undefined,
};

module.exports = nextConfig;
