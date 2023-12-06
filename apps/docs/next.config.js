/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["utfs.io"],
  },
  transpilePackages: ["@repo/ui"],
  reactStrictMode: false,
};
