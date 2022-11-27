/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    path: "/_next/image",
    domains: ["localhost", "bunt.life", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
