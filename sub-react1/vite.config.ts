import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import qiankun from 'vite-plugin-qiankun';
const useDevMode = true;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // 禁用 Fast Refresh（React 热更新）
      // 在 qiankun 微前端环境中，有时需要禁用以避免冲突
      jsxRuntime: 'classic',
    }),
    qiankun('viteApp', {
      useDevMode,
    }),
  ],
  server: {
    port: 5503,
    cors: true,
  },
});
