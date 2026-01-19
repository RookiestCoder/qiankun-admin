/**
 * @desc 公共类型定义
 */

/**
 * 用户信息类型
 */
export interface UserInfo {
  name: string
  id?: string | number
  avatar?: string
  email?: string
  roles?: string[]
  [key: string]: any
}

/**
 * 路由信息类型
 */
export interface RouteInfo {
  currentSub: string
  currentPath: string
  [key: string]: any
}

/**
 * 全局设置类型
 */
export interface GlobalSettings {
  theme?: 'light' | 'dark'
  language?: string
  [key: string]: any
}

/**
 * qiankun 全局状态类型
 */
export interface GlobalState {
  userInfo: UserInfo
  routeInfo: RouteInfo
  globalSettings: GlobalSettings
  time: string
  [key: string]: any
}

/**
 * qiankun Actions 类型
 */
export interface QiankunActions {
  onGlobalStateChange: (callback: (state: GlobalState, prev: GlobalState) => void, immediately?: boolean) => void
  setGlobalState: (state: Partial<GlobalState>) => boolean
  offGlobalStateChange: () => void
  getGlobalState: () => GlobalState
}

