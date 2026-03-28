import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // Cambia a true en desarrollo para no tener problemas de caché al programar
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        // 1. PÁGINAS PÚBLICAS: Carga instantánea (StaleWhileRevalidate)
        urlPattern: /\/mobile\/(home|import|course\/.*)/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "public-pages-cache",
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        // 2. RECURSOS ESTÁTICOS: CacheFirst (Máxima velocidad)
        urlPattern: /\.(?:js|css|woff2?|png|svg|json)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "static-assets",
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
      {
        // 3. RUTAS ADMIN: NetworkFirst (Intenta red, si falla usa caché)
        // Eliminamos el bloque "NetworkOnly" que tenías antes para que este funcione
        urlPattern:
          /\/(admin|mobile\/adminLibrary|mobile\/create|mobile\/edit\/.*)/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "admin-pages-cache",
          networkTimeoutSeconds: 3, // Si la red tarda más de 3s, usa el caché
          expiration: { maxEntries: 15 },
        },
      },
      {
        // 4. API DATA: NetworkFirst para sincronizar con Prisma
        urlPattern: /\/api\/(templates|updateTemplates)/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "api-data-cache",
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 },
        },
      },
      {
        // 5. NAVEGACIÓN GENERAL
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "pages-cache",
          expiration: { maxEntries: 40 },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["localhost:3000", "*.ngrok-free.app"],
};

export default withPWA({ ...nextConfig });
