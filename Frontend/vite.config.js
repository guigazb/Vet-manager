import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // define: {
  //   'process.env': process.env
  // },
  plugins: [react()],
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173
  // },
  resolve: {
    alias: {
      '@tailwindConfig': path.resolve(__dirname, 'tailwind.config.js'),
    },
  },
  optimizeDeps: {
    include: [
      '@tailwindConfig',
    ]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  test: {
    environment: 'jsdom', // Necessário para simular o DOM
    globals: true, // Habilita APIs globais como describe, it, expect
    setupFiles: './src/setupTests.js', // Arquivo de configuração (opcional)
    css: { // ignora CSS em ambiente de teste
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
    resolve: { // Resolver extensões de arquivo
      alias: {
        '@mui/x-data-grid': path.resolve(__dirname, 'node_modules/@mui/x-data-grid/esm'),
      },
    },
  },
});
