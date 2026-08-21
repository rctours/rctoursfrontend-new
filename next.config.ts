import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async redirects() {
    return [
      // OLD WEBSITE - Available Cars
      {
        source: "/cars",
        destination: "/fleet",
        permanent: true,
      },

      // OLD WEBSITE - old blog URLs found in Google
      {
        source: "/blog/n4udcjmgcl9mjgnljgt6day0",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/qgpsgh41zz6jer4og1ywxtu9",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;