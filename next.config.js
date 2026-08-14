/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "**.instant-gaming.com",
      },
      {
        protocol: "https",
        hostname: "**.gaming-cdn.com",
      },
      {
        protocol: "https",
        hostname: "**.akamai.steamstatic.com",
      },
      {
        protocol: "https",
        hostname: "**.steamstatic.com",
      },
      {
        protocol: "https",
        hostname: "**.gog.com",
      },
      {
        protocol: "https",
        hostname: "**.epicgames.com",
      },
      {
        protocol: "https",
        hostname: "**.unrealengine.com",
      },
    ],
  },
};

module.exports = nextConfig;
