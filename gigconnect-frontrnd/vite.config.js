import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ✅ Do not call it wrong, just use tailwindcss() like this
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
