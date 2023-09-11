// vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
  // Other Vite configurations...

  server: {
    proxy: {
      '/api/signup': 'http://localhost:8000',
      '/api/signup/google': 'http://localhost:8000',
      '/api/login': 'http://localhost:8000',
      '/api/profile': 'http://localhost:8000',
    },
  },
});
