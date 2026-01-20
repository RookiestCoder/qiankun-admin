/**
 * @desc 主题管理
 */

import type { ThemeMode, ThemeConfig } from '../types';
import { getThemeVariables } from '../variables';

/**
 * 默认主题配置
 */
export const defaultThemeConfig: ThemeConfig = {
  mode: 'light',
  primaryColor: '#409eff',
  successColor: '#67c23a',
  warningColor: '#e6a23c',
  errorColor: '#f56c6c',
  infoColor: '#909399',
};

/**
 * 应用主题
 * @param mode 主题模式
 */
export function applyTheme(mode: ThemeMode = 'light'): void {
  if (typeof document === 'undefined') return;

  const variables = getThemeVariables(mode);
  const root = document.documentElement;

  // 应用 CSS 变量
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // 设置主题类名
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(`theme-${mode}`);

  // 保存到 localStorage
  try {
    localStorage.setItem('qiankun-admin-theme', mode);
  } catch (e) {
    console.warn('Failed to save theme to localStorage', e);
  }
}

/**
 * 获取当前主题
 * @returns 当前主题模式
 */
export function getCurrentTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'light';

  // 从 localStorage 读取
  try {
    const saved = localStorage.getItem('qiankun-admin-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (e) {
    console.warn('Failed to read theme from localStorage', e);
  }

  // 从 DOM 读取
  const root = document.documentElement;
  if (root.classList.contains('theme-dark')) return 'dark';
  if (root.classList.contains('theme-light')) return 'light';

  // 默认返回亮色主题
  return 'light';
}

/**
 * 切换主题
 * @returns 切换后的主题模式
 */
export function toggleTheme(): ThemeMode {
  const current = getCurrentTheme();
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  return next;
}

/**
 * 初始化主题
 */
export function initTheme(): void {
  const theme = getCurrentTheme();
  applyTheme(theme);
}
