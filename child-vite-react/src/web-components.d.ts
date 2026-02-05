/**
 * Web Components 类型声明
 * 用于 TypeScript 识别自定义元素
 */

import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'qk-button': {
        type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
        size?: 'small' | 'medium' | 'large';
        disabled?: boolean;
        loading?: boolean;
        onClick?: (event: React.MouseEvent<HTMLElement>) => void;
        children?: React.ReactNode;
        className?: string;
        style?: React.CSSProperties;
        [key: string]: any;
      };
    }
  }
}

export {};
