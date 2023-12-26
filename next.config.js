/** @type {import('next').NextConfig} */
const nextConfig = {
  // remove comment if you want to run as docker image
  // output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

module.exports = nextConfig;
