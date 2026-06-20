import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VANCOUVER MADE — portal app config
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
