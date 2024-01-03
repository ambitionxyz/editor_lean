/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
    return config;
  },
  experimental: {
    esmExternals: "loose", // required to make Konva & react-konva work
  },
  images: {
    domains: ["utfs.io"],
  },
  transpilePackages: ["@repo/ui"],
  reactStrictMode: false,
};
