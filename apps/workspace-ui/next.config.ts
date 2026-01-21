import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // API → Spring Boot
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },

      // Auth → Spring Boot (Form Login / Logout)
      {
        source: "/login",
        destination: "http://localhost:8080/login",
      },
      {
        source: "/logout",
        destination: "http://localhost:8080/logout",
      },
    ];
  },
};

export default nextConfig;
