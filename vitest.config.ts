import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue']
    })
  ],
  resolve: {
    alias: {
      '~/': `/`
    }
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
