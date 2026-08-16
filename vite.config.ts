import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// Repo: ElectrokwSas.github.io (repositorio de usuario/organización) -> se
// publica en la raíz del dominio, sin subpath. Si en algún momento se cambia
// a un repo con nombre propio, ver PROJECT_BRIEF.md sección 10.1 antes de
// tocar esto.
export default defineConfig(() => ({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // El manifest es un archivo estático en public/site.webmanifest
      // (enlazado manualmente en index.html), así que el plugin solo se
      // encarga del service worker / precache.
      manifest: false,
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "site.webmanifest",
        "icons/*.png",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
