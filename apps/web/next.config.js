/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nexusai/ui', '@nexusai/sdk'],
  reactStrictMode: true,
};

module.exports = nextConfig;
