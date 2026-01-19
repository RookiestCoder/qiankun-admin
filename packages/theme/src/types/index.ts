/**
 * @desc 主题类型定义
 */

/**
 * 主题模式
 */
export type ThemeMode = 'light' | 'dark'

/**
 * 主题配置
 */
export interface ThemeConfig {
  mode: ThemeMode
  primaryColor: string
  successColor: string
  warningColor: string
  errorColor: string
  infoColor: string
  [key: string]: any
}

