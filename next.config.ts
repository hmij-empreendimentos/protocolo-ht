import type { NextConfig } from "next";

// Content-Security-Policy: lista todos los orígenes externos que el app
// legítimamente carga (players de video, etc). Si una funcionalidad nueva
// carga un dominio nuevo, agrégalo aquí o el navegador lo bloqueará.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://scripts.converteai.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://scripts.converteai.net https://*.converteai.net https://vitals.vercel-insights.com",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://scripts.converteai.net https://*.converteai.net https://soporte-ht.netlify.app",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
