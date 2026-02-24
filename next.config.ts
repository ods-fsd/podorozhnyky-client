import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
      },
      {
        protocol: "https",
        hostname: "ftp.goit.study",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
      },
    ],
  },
  
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    return [
      {
        source: '/app/api/:path*',
        destination: `${backendUrl.replace(/\/$/, '')}/:path*`, 
      },
    ];
  },
};

export default nextConfig;
