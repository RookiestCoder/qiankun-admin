/**
 * @desc qiankun 全局状态管理
 * @note 主应用和子应用都可以使用此模块来管理全局状态
 */

import { initGlobalState, MicroAppStateActions } from 'qiankun';
import type { GlobalState, QiankunActions } from '../types';

/**
 * 默认全局状态
 */
export const defaultGlobalState: GlobalState = {
  // 用户信息
  userInfo: { name: '张三' },
  // 路由信息
  routeInfo: { currentSub: 'sub-vue', currentPath: 'changeGlobalStore' },
  // 全局配置
  globalSettings: {},
  // 时间戳
  time: '',
};

/**
 * 初始化 qiankun 全局状态
 * @param initialState 初始状态
 * @returns qiankun actions
 */
export function initQiankunGlobalState(initialState?: Partial<GlobalState>): QiankunActions {
  const state = { ...defaultGlobalState, ...initialState };
  const actions = initGlobalState(state) as MicroAppStateActions & QiankunActions;

  return actions;
}

/**
 * 获取全局状态（子应用使用）
 * @returns 全局状态对象
 */
export function getGlobalState(): GlobalState | null {
  if (typeof window !== 'undefined' && (window as any).__POWERED_BY_QIANKUN__) {
    return (window as any).__QIANKUN_DEVELOPMENT__?.getGlobalState?.() || null;
  }
  return null;
}

/**
 * 设置全局状态（子应用使用）
 * @param state 要设置的状态
 * @returns 是否设置成功
 */
export function setGlobalState(state: Partial<GlobalState>): boolean {
  if (typeof window !== 'undefined' && (window as any).__POWERED_BY_QIANKUN__) {
    return (window as any).__QIANKUN_DEVELOPMENT__?.setGlobalState?.(state) || false;
  }
  return false;
}

/**
 * 监听全局状态变化（子应用使用）
 * @param callback 回调函数
 * @param immediately 是否立即执行
 */
export function onGlobalStateChange(
  callback: (state: GlobalState, prev: GlobalState) => void,
  immediately = false
): void {
  if (typeof window !== 'undefined' && (window as any).__POWERED_BY_QIANKUN__) {
    (window as any).__QIANKUN_DEVELOPMENT__?.onGlobalStateChange?.(callback, immediately);
  }
}
