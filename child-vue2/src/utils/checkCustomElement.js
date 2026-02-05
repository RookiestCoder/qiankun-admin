/**
 * @desc 检查自定义元素是否加载成功的工具函数
 */

/**
 * @desc 检查自定义元素是否已定义
 * @param {string} elementName 元素名称，如 'qk-button'
 * @returns {boolean}
 */
export function isCustomElementDefined(elementName) {
  return customElements.get(elementName) !== undefined;
}

/**
 * @desc 获取自定义元素的构造函数
 * @param {string} elementName 元素名称
 * @returns {Function|null}
 */
export function getCustomElementConstructor(elementName) {
  return customElements.get(elementName) || null;
}

/**
 * @desc 检查元素是否有 Shadow DOM
 * @param {HTMLElement} element 元素
 * @returns {boolean}
 */
export function hasShadowRoot(element) {
  return element && element.shadowRoot !== null;
}

/**
 * @desc 检查自定义元素是否正常工作
 * @param {string} elementName 元素名称
 * @returns {object} 检查结果
 */
export function checkCustomElementStatus(elementName) {
  const isDefined = isCustomElementDefined(elementName);
  const constructor = getCustomElementConstructor(elementName);

  // 在页面中查找元素
  const element = document.querySelector(elementName);
  const hasShadow = element ? hasShadowRoot(element) : false;

  // 检查样式
  let stylesLoaded = false;
  if (element) {
    const computedStyle = window.getComputedStyle(element);
    // 如果样式已加载，应该有特定的样式属性
    stylesLoaded =
      computedStyle.display !== 'inline' ||
      computedStyle.padding !== '0px' ||
      computedStyle.borderRadius !== '0px';
  }

  return {
    isDefined,
    constructor: constructor ? constructor.name : null,
    hasShadowRoot: hasShadow,
    stylesLoaded,
    element,
    // 在浏览器控制台中检查
    consoleCheck: () => {
      console.log('=== 自定义元素检查 ===');
      console.log('元素名称:', elementName);
      console.log('已定义:', isDefined);
      console.log('构造函数:', constructor);
      console.log('页面中的元素:', element);
      if (element) {
        console.log('Shadow DOM:', element.shadowRoot);
        console.log('计算样式:', window.getComputedStyle(element));
        console.log('元素类名:', element.className);
        console.log('元素标签名:', element.tagName);
      }
      console.log('====================');
    },
  };
}
