import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    autoImport({
      imports: ['vue', 'vue-router'], // 需要引入的类型来源
      dts: 'src/types/auto-import.d.ts', // 根据引入来源自动生成的类型声明文件路径
      eslintrc: {
        enabled: true // 使用 eslint 配置
      }
    }),
    Components({
      resolvers: [HeadlessUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
