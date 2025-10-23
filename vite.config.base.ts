import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: './index.html',
      },
    },
  },
  plugins: [react()],

  resolve: {
    alias: {
      '@consuri/core-services': path.resolve(__dirname, './libs/core-services/src/index.ts'),
      '@consuri/core-ui-components/style/index.scss': path.resolve(__dirname, './libs/core-ui-components/src/style/index.scss',),
      '@consuri/core-ui-components/texts/texts_sk.json': path.resolve(__dirname, './libs/core-ui-components/src/texts/texts_sk.json',),
      '@consuri/core-ui-components': path.resolve(__dirname, './libs/core-ui-components/src/index.ts',),
      '@consuri/core-auth': path.resolve(__dirname, './libs/core-auth/src/index.ts',),
      '@consuri/reservation-client': path.resolve(__dirname, './apps/reservation-client/src/index.ts',),
    },
  },
})
