import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Task App",
        short_name: "todo-app",
        icons: [
          {
            src: "/assets/metadata/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/metadata/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#db6b42",
        background_color: "#db6b42",
        display: "standalone",
      },
    }),
  ],
  server: {
    port: 4209,
  },
  base: "/todo-app/"
});
