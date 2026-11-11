
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const basePath = "/";

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

