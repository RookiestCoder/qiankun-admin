/**
 * @desc 使用 @qiankun-admin/shared 工具函数的示例
 * @note 这是 JavaScript 文件，使用的是编译后的 JavaScript 代码
 */

// 方式 1：使用 CommonJS require（推荐）
const {
  debounce,
  throttle,
  formatDate,
  isEmpty,
  getUrlParam,
  isQiankun,
  deepClone
} = require('@qiankun-admin/shared')

// 方式 2：使用 ES6 import（如果配置了支持）
// import { debounce, formatDate, isEmpty } from '@qiankun-admin/shared'

/**
 * 防抖搜索函数
 */
export function createSearchHandler() {
  return debounce((keyword) => {
    console.log('搜索关键词:', keyword)
    // 执行搜索逻辑
  }, 300)
}

/**
 * 节流滚动处理
 */
export function createScrollHandler() {
  return throttle(() => {
    console.log('滚动事件触发')
  }, 100)
}

/**
 * 格式化日期时间
 * @param {Date|number} date 日期对象或时间戳
 * @returns {string} 格式化后的日期字符串
 */
export function formatDateTime(date) {
  return formatDate(date, 'YYYY-MM-DD HH:mm:ss')
}

/**
 * 格式化日期
 * @param {Date|number} date 日期对象或时间戳
 * @returns {string} 格式化后的日期字符串
 */
export function formatDateOnly(date) {
  return formatDate(date, 'YYYY-MM-DD')
}

/**
 * 判断值是否为空
 * @param {any} value 要判断的值
 * @returns {boolean} 是否为空
 */
export function checkEmpty(value) {
  return isEmpty(value)
}

/**
 * 获取 URL 参数
 * @param {string} name 参数名
 * @returns {string|null} 参数值
 */
export function getQueryParam(name) {
  return getUrlParam(name)
}

/**
 * 判断是否在 qiankun 环境中
 * @returns {boolean} 是否在 qiankun 环境
 */
export function checkQiankunEnv() {
  return isQiankun()
}

/**
 * 深拷贝对象
 * @param {any} obj 要拷贝的对象
 * @returns {any} 拷贝后的对象
 */
export function cloneDeep(obj) {
  return deepClone(obj)
}


