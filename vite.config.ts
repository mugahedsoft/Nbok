import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "بنكك - نظام إدارة العمليات",
        short_name: "بنكك",
        description: "نظام بنكك لإدارة العمليات المالية - بنك الخرطوم",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#0b1220",
        theme_color: "#991b1b",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "48x48 72x72 96x96 144x144 192x192 256x256",
            type: "image/x-icon",
          },
        ],
      },
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
