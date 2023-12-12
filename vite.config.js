import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = dirname(fileURLToPath(import.meta.url))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(_dirname,  './src')
    }
  }
})
