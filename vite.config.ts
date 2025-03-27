/// <reference types="vite/client" />
/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

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
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'js' : 'cjs';
        return `${entryName}.${extension}`;
      },
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: "src/main.ts",
      output: {
        exports: 'named',
        // preserveModules: true,
        // manualChunks: undefined,
        // entryFileNames: "[name].[format]",
        // assetFileNames: "assets/[name][extname]",
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
