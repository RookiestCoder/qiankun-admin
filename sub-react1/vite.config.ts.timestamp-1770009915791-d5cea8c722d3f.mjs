// vite.config.ts
import { defineConfig } from "file:///Users/admin/Desktop/qiankun-github/qiankun-admin/node_modules/.pnpm/vite@5.4.21_@types+node@25.0.3_less@4.5.1_sass@1.97.1_terser@5.44.1/node_modules/vite/dist/node/index.js";
import react from "file:///Users/admin/Desktop/qiankun-github/qiankun-admin/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.21_@types+node@25.0.3_less@4.5.1_sass@1.97.1_terser@5.44.1_/node_modules/@vitejs/plugin-react/dist/index.js";
import qiankun from "file:///Users/admin/Desktop/qiankun-github/qiankun-admin/node_modules/.pnpm/vite-plugin-qiankun@1.0.15_typescript@5.9.3_vite@5.4.21_@types+node@25.0.3_less@4.5.1_sass@1.97.1_terser@5.44.1_/node_modules/vite-plugin-qiankun/dist/index.js";
var useDevMode = true;
var vite_config_default = defineConfig({
  plugins: [
    react({
      // 禁用 Fast Refresh（React 热更新）
      // 在 qiankun 微前端环境中，有时需要禁用以避免冲突
      jsxRuntime: "classic"
    }),
    qiankun("viteApp", {
      useDevMode
    })
  ],
  server: {
    port: 5503,
    cors: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRtaW4vRGVza3RvcC9xaWFua3VuLWdpdGh1Yi9xaWFua3VuLWFkbWluL3N1Yi1yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FkbWluL0Rlc2t0b3AvcWlhbmt1bi1naXRodWIvcWlhbmt1bi1hZG1pbi9zdWItcmVhY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FkbWluL0Rlc2t0b3AvcWlhbmt1bi1naXRodWIvcWlhbmt1bi1hZG1pbi9zdWItcmVhY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcWlhbmt1biBmcm9tICd2aXRlLXBsdWdpbi1xaWFua3VuJ1xuY29uc3QgdXNlRGV2TW9kZSA9IHRydWVcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCh7XG4gICAgICAvLyBcdTc5ODFcdTc1MjggRmFzdCBSZWZyZXNoXHVGRjA4UmVhY3QgXHU3MEVEXHU2NkY0XHU2NUIwXHVGRjA5XG4gICAgICAvLyBcdTU3MjggcWlhbmt1biBcdTVGQUVcdTUyNERcdTdBRUZcdTczQUZcdTU4ODNcdTRFMkRcdUZGMENcdTY3MDlcdTY1RjZcdTk3MDBcdTg5ODFcdTc5ODFcdTc1MjhcdTRFRTVcdTkwN0ZcdTUxNERcdTUxQjJcdTdBODFcbiAgICAgIGpzeFJ1bnRpbWU6ICdjbGFzc2ljJ1xuICAgIH0pLFxuICAgIHFpYW5rdW4oJ3ZpdGVBcHAnLCB7XG4gICAgICB1c2VEZXZNb2RlXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDU1MDMsXG4gICAgY29yczogdHJ1ZSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVyxTQUFTLG9CQUFvQjtBQUNoWSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLElBQU0sYUFBYTtBQUduQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQTtBQUFBLE1BR0osWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBQ0QsUUFBUSxXQUFXO0FBQUEsTUFDakI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
