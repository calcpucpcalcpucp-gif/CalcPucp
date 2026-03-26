import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "*", // Intento de permitir todo
    "localhost:3000", // Local
    "*.ngrok-free.app", // Comodín para cualquier subdominio de ngrok
  ],
};

export default nextConfig;
