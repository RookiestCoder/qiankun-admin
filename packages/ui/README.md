# @qiankun-admin/ui

微前端公共 UI 组件模块，提供基于 Web Components 的跨框架组件。

## 安装

```bash
pnpm add @qiankun-admin/ui
```

## Web Components 按钮组件

### 注册组件

```javascript
// 在应用启动时注册（推荐）
const { registerButton } = require('@qiankun-admin/ui')
registerButton('qk-button')
```

### 在模板中使用

```vue
<template>
  <qk-button type="primary" @click="handleClick">
    按钮文本
  </qk-button>
</template>
```

### 支持的属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | `(event: MouseEvent) => void` |

### 使用示例

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <qk-button>默认按钮</qk-button>
    <qk-button type="primary">主要按钮</qk-button>
    
    <!-- 不同尺寸 -->
    <qk-button size="small">小按钮</qk-button>
    <qk-button size="medium">中等按钮</qk-button>
    <qk-button size="large">大按钮</qk-button>
    
    <!-- 禁用状态 -->
    <qk-button disabled>禁用按钮</qk-button>
    
    <!-- 加载状态 -->
    <qk-button :loading="isLoading">加载中</qk-button>
    
    <!-- 事件监听 -->
    <qk-button type="primary" @click="handleClick">点击我</qk-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    handleClick(event) {
      console.log('按钮被点击', event)
    }
  }
}
</script>
```

## 类型定义

```typescript
import type { Size } from '@qiankun-admin/ui'

const size: Size = 'medium'
```

## 框架配置

### Vue 2 (Vue CLI)

在 `vue.config.js` 中配置：

```javascript
chainWebpack: (config) => {
  config.module
    .rule('vue')
    .use('vue-loader')
    .tap((options) => ({
      ...options,
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('qk-'),
      },
    }));
}
```

### Vue 3

在 `vite.config.ts` 中配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('qk-'),
        },
      },
    }),
  ],
})
```

## 说明

- **框架无关**：基于 Web Components 标准，可在 Vue、React、Angular 等任何框架中使用
- **样式隔离**：使用 Shadow DOM 实现样式隔离
- **类型安全**：完整的 TypeScript 类型定义支持

## 详细文档

更多实现细节和使用说明，请参考 [IMPLEMENTATION.md](./IMPLEMENTATION.md)
