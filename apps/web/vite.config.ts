import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'
import inject from '@rollup/plugin-inject'
import nodePolyfills from "rollup-plugin-polyfill-node";
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import {NodeModulesPolyfillPlugin} from "@esbuild-plugins/node-modules-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['linked-dep'],
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
    rollupOptions: {
      plugins: [
        inject({ Buffer: ['buffer/', 'Buffer'] }),
        nodePolyfills()
      ]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
