/**
 * @desc 公共常量定义
 */

/**
 * 子应用名称常量
 */
export const SUB_APP_NAMES = {
  SUB_VUE: 'sub-vue',
  SUB_REACT: 'sub-react',
  SUB_HTML: 'sub-html',
} as const

/**
 * 子应用路由前缀
 */
export const SUB_APP_ROUTES = {
  [SUB_APP_NAMES.SUB_VUE]: '/sub-vue',
  [SUB_APP_NAMES.SUB_REACT]: '/sub-react',
  [SUB_APP_NAMES.SUB_HTML]: '/sub-html',
} as const

/**
 * 存储 key 常量
 */
export const STORAGE_KEYS = {
  TOKEN: 'qiankun-admin-token',
  USER_INFO: 'qiankun-admin-user-info',
  THEME: 'qiankun-admin-theme',
  LANGUAGE: 'qiankun-admin-language',
} as const

/**
 * 主题模式
 */
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

/**
 * API 基础路径（可根据实际情况调整）
 */
export const API_BASE_URL = {
  DEVELOPMENT: '/api',
  PRODUCTION: 'https://api.example.com',
} as const

