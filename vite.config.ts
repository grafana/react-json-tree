/// <reference types="vite/client" />
/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// import { analyzer } from 'vite-bundle-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  define: process.env.VITEST ? {} : { global: "window" },
  plugins: [
    react({}),
    // Generates dts type files
    dts({
      exclude: ["src/test", "**/*.test.tsx", "src/setupTests.js"],
      insertTypesEntry: true,
      tsconfigPath: "tsconfig.app.json",
    }),
    // injects css modules into js bundle
    cssInjectedByJsPlugin(),
    // analyzer()
  ],
  optimizeDeps: {
    include: ["**/*.scss"], // Include all .scss files
    esbuildOptions: {
      jsx: "automatic",
    },
  },
  css: {
    preprocessorOptions: {
      scss: true,
    },
    modules: {
      // Enable CSS Modules for all .scss files
      localsConvention: "camelCaseOnly",
    },
  },
  build: {
    minify: "terser",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: "src/main.ts",
      output: {
        manualChunks: undefined,
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
        globals: {
          react: "React",
          "react-dom": "ReactDom",
          "react/jsx-runtime": "ReactJsxRuntime",
        },
      },
    },
  },
  test: {
    setupFiles: "src/setupTests.js",
    globals: true,
    environment: "jsdom",
    deps: {
      moduleDirectories: ["react"],
    },
    css: true,
    coverage: {
      include: ["src/"],
    },
  },
});
