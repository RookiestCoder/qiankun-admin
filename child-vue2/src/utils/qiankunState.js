/**
 * @desc 使用 @qiankun-admin/shared 中的 qiankun 全局状态管理
 * @note 这是 JavaScript 文件，使用的是编译后的 JavaScript 代码
 */

const { getGlobalState, setGlobalState, onGlobalStateChange } = require('@qiankun-admin/shared');

/**
 * 获取全局用户信息
 * @returns {Object|null} 用户信息对象
 */
export function getGlobalUserInfo() {
  const state = getGlobalState();
  return state ? state.userInfo : null;
}

/**
 * 更新全局用户信息
 * @param {Object} userInfo 用户信息对象
 */
export function updateGlobalUserInfo(userInfo) {
  setGlobalState({
    userInfo: userInfo,
  });
}

/**
 * 获取全局路由信息
 * @returns {Object|null} 路由信息对象
 */
export function getGlobalRouteInfo() {
  const state = getGlobalState();
  return state ? state.routeInfo : null;
}

/**
 * 更新全局路由信息
 * @param {string} currentSub 当前子应用名称
 * @param {string} currentPath 当前路径
 */
export function updateGlobalRouteInfo(currentSub, currentPath) {
  setGlobalState({
    routeInfo: {
      currentSub,
      currentPath,
    },
  });
}

/**
 * 监听全局状态变化
 * @param {Function} callback 回调函数
 */
export function watchGlobalState(callback) {
  onGlobalStateChange((state, prev) => {
    console.log('[sub-vue] 全局状态变化:', state, prev);
    if (callback && typeof callback === 'function') {
      callback(state, prev);
    }
  });
}

/**
 * 获取完整的全局状态
 * @returns {Object|null} 全局状态对象
 */
export function getFullGlobalState() {
  return getGlobalState();
}
