/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  loader: "default",
  images: {
    path: "/_next/image",
    domains: ["localhost", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
