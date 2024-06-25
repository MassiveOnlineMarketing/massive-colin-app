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

  env: {
    G_TAG: process.env.G_TAG,
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
