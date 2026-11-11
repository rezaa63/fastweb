import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const basePath = process.env.VITE_BASE_PATH || "/";

/**
 * Development/preview server configuration.
 *
 * - `host: 0.0.0.0` so the site is reachable from outside the container.
 * - Port 3000 keeps the dev entry point stable for local dev and previews.
 * - Extra Host headers are allow-listed through the standard Vite environment
 *   variable `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (Vite >= 6.1 reads it
 *   automatically). Nothing is hard-coded to a specific environment, so the
 *   same source runs locally, behind a proxy, or on a custom domain.
 *
 * Production builds (`npm run build`) are plain static files in `dist/` and can
 * be served by any host or CDN on any domain.
 */
export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
});
