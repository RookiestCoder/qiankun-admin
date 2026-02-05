import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'QiankunAdminUI',
      fileName: format => {
        if (format === 'es') return 'index.esm.js';
        if (format === 'iife') return 'index.iife.js';
        return `index.${format}.js`;
      },
      formats: ['es', 'cjs', 'iife'],
    },
    rollupOptions: {
      // 不将 vue 作为 external，这样会打包 Vue 3 运行时
      // 因为 Web Components 需要 Vue 3 的运行时支持
      external: [],
      output: {
        // 确保所有模块都被正确处理
        preserveModules: false,
      },
    },
    // 确保 CSS 被正确处理
    cssCodeSplit: false,
  },
});
