import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.lib.json",
      entryRoot: "src",
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    // Force Vite to deduplicate React across linked packages
    dedupe: ["react", "react-dom"],
    alias: {
      // Hard-lock React resolution to Cohort Builder's node_modules
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
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
        "@tis-lab/context-providers",
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
