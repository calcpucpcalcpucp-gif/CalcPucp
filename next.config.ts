import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /\/mobile\/(home|import|course\/.*)/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "public-pages-cache",
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
          },
        },
      },
      {
        urlPattern: /\.(?:js|css|woff2?|png|svg|json)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "static-assets",
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
      {
        urlPattern:
          /\/(admin|mobile\/adminLibrary|mobile\/create|mobile\/edit\/.*)/i,
        handler: "NetworkOnly",
      },
      {
        urlPattern: /\/api\/(templates|updateTemplates)/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "api-data-cache",
          networkTimeoutSeconds: 5,
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 },
        },
      },
      {
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "pages-cache",
          expiration: { maxEntries: 40 },
        },
      },
    ],
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["localhost:3000", "*.ngrok-free.app"],
  // turbopack: {},
};

export default withPWA({ ...nextConfig });
