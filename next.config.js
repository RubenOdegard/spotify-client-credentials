/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SPOTIFY_APP_CLIENT_ID: "36ba0d845c1b439484592d5b655c1b09",
    SPOTIFY_APP_CLIENT_SECRET: "926d0101e9004708a250be70dd2289d7",
    NEXTAUTH_SECRET: "06KRH7k+ibYNJTGFVGXqzmy8QdpQiRlNbqEjTAByIfw=",
  },
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
