/**
 * @desc 使用 @qiankun-admin/theme 主题管理
 * @note 这是 JavaScript 文件，使用的是编译后的 JavaScript 代码
 */

const { initTheme, toggleTheme, getCurrentTheme, applyTheme } = require('@qiankun-admin/theme');

/**
 * 初始化主题（在应用启动时调用）
 */
export function setupTheme() {
  initTheme();
}

/**
 * 切换主题
 * @returns {string} 切换后的主题模式 'light' | 'dark'
 */
export function switchTheme() {
  return toggleTheme();
}

/**
 * 获取当前主题
 * @returns {string} 当前主题模式 'light' | 'dark'
 */
export function getTheme() {
  return getCurrentTheme();
}

/**
 * 应用指定主题
 * @param {string} mode 主题模式 'light' | 'dark'
 */
export function setTheme(mode) {
  applyTheme(mode);
}
