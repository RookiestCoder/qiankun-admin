/**
 * @desc 按钮组件 Web Components 导出
 */

import { defineCustomElement } from 'vue';
import Button from './Button.ce.vue';

// 将 Vue 组件转换为 Web Components
const ButtonElement = defineCustomElement(Button);

/**
 * @desc 注册按钮 Web Components
 * @param name 自定义元素名称，默认为 'qk-button'
 */
export function registerButton(name = 'qk-button') {
  if (!customElements.get(name)) {
    customElements.define(name, ButtonElement);
  }
}

/**
 * @desc 按钮组件（Vue 组件形式，用于 Vue 项目）
 */
// export { default as Button } from './Button.vue'

/**
 * @desc 按钮 Web Components 类（用于直接使用）
 */
export { ButtonElement };
