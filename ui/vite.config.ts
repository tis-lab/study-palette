import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      include: ["src"],
      bundleTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // These must NOT be bundled into study-palette's dist. Framework (and
      // study-palette itself) need to share one instance of each at runtime:
      // react/react-dom for hooks to work, @mui/material + @emotion for
      // theming context, and @tis-lab/context-providers so the context
      // object study-palette reads from is the same one framework provides.
      // Bundling any of these would create a second, disconnected instance.
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@tis-lab/context-providers",
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
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
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
  },
});
