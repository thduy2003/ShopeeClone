/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  worker: {
    plugins: [react()]
  },
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './vitest.setup.js')
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
