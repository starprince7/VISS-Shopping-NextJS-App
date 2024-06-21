/**
 * @type {import('next').NextConfig}
 */
const path = require('path');

const nextConfig = {
  /* config options here */
  webpack: (config, options) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
