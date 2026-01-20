/**
 * @desc UI 相关类型定义
 */

/**
 * 尺寸类型
 */
export type Size = 'small' | 'medium' | 'large';

/**
 * 位置类型
 */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * 状态类型
 */
export type Status = 'success' | 'warning' | 'error' | 'info';

/**
 * 加载状态
 */
export interface LoadingState {
  loading: boolean;
  error?: Error | null;
  data?: any;
}
