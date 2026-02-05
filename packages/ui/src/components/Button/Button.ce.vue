<template>
  <button
    :class="[
      'qk-button',
      `qk-button--${type}`,
      `qk-button--${size}`,
      { 'qk-button--disabled': disabled, 'qk-button--loading': loading },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="qk-button__loading">
      <svg class="qk-button__spinner" viewBox="0 0 24 24">
        <circle
          class="qk-button__spinner-circle"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
    </span>
    <span class="qk-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { Size } from '../../types';
import './Button.css';

/**
 * @desc 按钮组件 Props
 */
interface ButtonProps {
  /**
   * 按钮类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  /**
   * 按钮尺寸
   */
  size?: Size;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否加载中
   */
  loading?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

/**
 * @desc 处理点击事件
 * @param event 鼠标事件
 */
function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return;
  emit('click', event);
}
</script>

<style src="./Button.css" scoped></style>
