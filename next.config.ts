import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["mmthcoffee.com", "www.mega-mgccoffee.com", "img.79plus.co.kr"],
  },
};

export default nextConfig;
