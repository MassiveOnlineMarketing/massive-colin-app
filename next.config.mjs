/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Existing rule for SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack" }],
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: ''
      }
    ]
  },

  env: {
    G_TAG: process.env.G_TAG,
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
