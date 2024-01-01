/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://cjeongmin.github.io/calendar/blob/gh-pages"
      : undefined,
};

module.exports = nextConfig;
