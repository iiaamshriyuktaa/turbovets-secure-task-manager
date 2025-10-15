import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular'; // or your angular plugin

export default defineConfig({
  plugins: [angular()],
  server: {
    port: 4200,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // your Nest API port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
