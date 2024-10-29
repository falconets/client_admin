import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    outDir:'dist',
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@auth': './auth',
      '@types': './types',
      '@credentials': path.resolve(__dirname, 'src/hooks/credentials/useAppContext'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@modal': path.resolve(__dirname, 'src/components/modals'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@route': path.resolve(__dirname, 'src/route'),
      '@themes': path.resolve(__dirname, 'src/theme'),

    },
  },
  server:{
    port: parseInt(process.env.PORT as string) || 5073,
    host:  '0.0.0.0',
    hmr: false,
    // open: true,
    // cors: true,
    // proxy: {
    //   '/api': {
    //     target: 'https://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // },
  }
})
