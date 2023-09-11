// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
export default defineConfig({
  
  plugins:[react()],
  server: {
    proxy: {
      '/api/signup': 'http://localhost:8000',
      '/api/signup/google': 'http://localhost:8000',
      '/api/login': 'http://localhost:8000',
      '/api/profile': 'http://localhost:8000',
    },
  },
});
