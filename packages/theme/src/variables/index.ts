/**
 * @desc CSS 变量定义
 */

/**
 * 亮色主题变量
 */
export const lightThemeVariables = {
  '--color-primary': '#409eff',
  '--color-success': '#67c23a',
  '--color-warning': '#e6a23c',
  '--color-error': '#f56c6c',
  '--color-info': '#909399',
  '--bg-color': '#ffffff',
  '--text-color': '#303133',
  '--text-color-secondary': '#606266',
  '--border-color': '#dcdfe6',
  '--border-color-light': '#e4e7ed',
  '--border-color-lighter': '#ebeef5',
  '--border-color-extra-light': '#f2f6fc',
} as const;

/**
 * 暗色主题变量
 */
export const darkThemeVariables = {
  '--color-primary': '#409eff',
  '--color-success': '#67c23a',
  '--color-warning': '#e6a23c',
  '--color-error': '#f56c6c',
  '--color-info': '#909399',
  '--bg-color': '#1d1e1f',
  '--text-color': '#e5eaf3',
  '--text-color-secondary': '#b3b8c3',
  '--border-color': '#4c4d4f',
  '--border-color-light': '#414243',
  '--border-color-lighter': '#363637',
  '--border-color-extra-light': '#2b2b2c',
} as const;

/**
 * 获取主题变量
 * @param mode 主题模式
 * @returns 主题变量对象
 */
export function getThemeVariables(mode: 'light' | 'dark' = 'light') {
  return mode === 'light' ? lightThemeVariables : darkThemeVariables;
}
