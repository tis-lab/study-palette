import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: process.env.VITE_ALLOWED_HOST
      ? process.env.VITE_ALLOWED_HOST.split(",").map((host) => host.trim())
      : [],
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@mui/material",
        "@emotion/react",
        "@emotion/styled",
      ],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
  },
});
