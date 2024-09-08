import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true
  },
  build: {
    outDir: "bmx-gwl-build",
    sourcemap: true,
  }
})
