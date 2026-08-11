import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      viteCompression({ algorithm: 'gzip' }),
      viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
    ],
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            animations: ['framer-motion', 'gsap', '@gsap/react'],
            ui: ['swiper', 'lucide-react']
          }
        }
      }
    }
  }
})

