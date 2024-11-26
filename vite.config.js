import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory
    sourcemap: true, // Generate source maps for debugging
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'), // Alias for 'src'
    },
  },
  server: {
    port: 3000, // Dev server port
  },
});
