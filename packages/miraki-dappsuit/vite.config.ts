/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import dts from 'vite-plugin-dts'
import * as packageJson from './package.json'
import { libInjectCss } from 'vite-plugin-lib-inject-css'


const isProductionMode = process.env['NODE_BUILD_MODE'] === 'production'

const externals = [...Object.keys(packageJson.peerDependencies), "react/jsx-runtime"]
if (isProductionMode){
  externals.push('buffer')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
    })
  ],
  optimizeDeps: {
    include: ['linked-dep'],
  },
  build: {
    copyPublicDir: false,
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
    lib: {
      entry: path.resolve(__dirname, 'lib/index.tsx'),
      formats: ['es'],
      fileName: (format) => 'index.js'
    },
    rollupOptions: {
      external: externals,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})