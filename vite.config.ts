/// <reference types="vite/client" />
/// <reference types="vitest" />
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteExternalsPlugin as externals } from 'vite-plugin-externals';
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({}),

    externals({
      react: 'window.React',
      'react-dom': 'window.ReactDOM'
    },{ useWindow: true }),
      // Generates dts type files
    dts({
      exclude: ['src/test', '**/*.test.tsx'],
      tsconfigPath: 'tsconfig.app.json',
    }),
      // injects css modules into js bundle
    cssInjectedByJsPlugin()
  ],
  optimizeDeps: {
    include: ['**/*.scss'], // Include all .scss files
    esbuildOptions: {
      jsx: "automatic",
    }
  },
  // esbuild: {
  //   jsxFactory: "React.createElemennt",
  //   jsxFragment: "React.Fragment"
  // },
  css: {
    preprocessorOptions: {
     scss: true,
    },
    modules: {
      // Enable CSS Modules for all .scss files
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    minify: false,
    // sourcemap: 'inline',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      input: 'src/main.ts',
      // https://rollupjs.org/configuration-options/#input
      // input: Object.fromEntries(
      //   globSync(['src/components/**/index.tsx', 'src/main.ts']).map((file) => {
      //     // This remove `src/` as well as the file extension from each
      //     // file, so e.g. src/nested/foo.js becomes nested/foo
      //     const entryName = path.relative(
      //       'src',
      //       file.slice(0, file.length - path.extname(file).length)
      //     )
      //     // This expands the relative paths to absolute paths, so e.g.
      //     // src/nested/foo becomes /project/src/nested/foo.js
      //     const entryUrl = fileURLToPath(new URL(file, import.meta.url))
      //     return [entryName, entryUrl]
      //   })
      // ),
      output: {
        manualChunks: undefined,
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          'react/jsx-runtime': 'ReactJsxRuntime',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      moduleDirectories: ['react']
    },
    css: true,
    coverage: {
      include: ['src/'],
    },
  },
})
