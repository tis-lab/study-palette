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
    outDir: "lib",
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
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
});
