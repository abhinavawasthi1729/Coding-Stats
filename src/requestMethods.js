// Import Vite's config helper
import { defineConfig } from 'vite'

// Import the React plugin for Vite
import react from '@vitejs/plugin-react'

// Export Vite configuration
export default defineConfig({
  plugins: [react()], // Enable React support
})
