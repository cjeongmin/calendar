/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://raw.githubusercontent.com/cjeongmin/calendar/gh-pages/"
      : undefined,
};

module.exports = nextConfig;
