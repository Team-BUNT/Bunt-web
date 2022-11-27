/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    path: "/_next/image",
    domains: ["localhost", "bunt.life", "firebasestorage.googleapis.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://bunt.life/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
