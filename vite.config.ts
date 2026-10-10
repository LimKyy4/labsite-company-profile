import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Root-level esbuild options. `drop` strips logging at minify time — the
  // esbuild minifier honours these the same way `build.esbuild` does on Vite 6,
  // but without pinning the toolchain to that major.
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    target: 'es2020',
    // Cooperative caching: react, framer-motion and the icon set are the three
    // heavy, rarely-changing chunks, so they each get their own cache key and
    // a return visitor who edited only app code re-downloads a fraction of the
    // bundle instead of the whole thing.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});