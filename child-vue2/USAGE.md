# 在 child-vue2 中使用 Web Components 按钮组件

## 1. 确保依赖已安装

`@qiankun-admin/ui` 已经在 `package.json` 中配置为 `workspace:*`，确保已安装：

```bash
pnpm install
```

## 2. 导入并注册组件

### 方式一：使用 require（推荐，适用于 Vue CLI/Webpack）

```javascript
// 在组件的 <script> 中
const { registerButton } = require('@qiankun-admin/ui')

export default {
  mounted() {
    // 注册 Web Components（只需注册一次）
    registerButton('qk-button')
  }
}
```

### 方式二：使用 import（如果支持 ES Module）

```javascript
// 在组件的 <script> 中
import { registerButton } from '@qiankun-admin/ui'

export default {
  mounted() {
    // 注册 Web Components（只需注册一次）
    registerButton('qk-button')
  }
}
```

## 3. 在模板中使用

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
const { registerButton } = require('@qiankun-admin/ui')

export default {
  data() {
    return {
      isLoading: false
    }
  },
  mounted() {
    // 注册组件
    registerButton('qk-button')
  },
  methods: {
    handleClick(event) {
      console.log('按钮被点击', event)
    }
  }
}
</script>
```

## 4. 完整示例

参考 `src/views/WebComponentsDemo/index.vue` 文件，里面有完整的使用示例。

## 5. 支持的属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |

## 6. 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | `(event: MouseEvent) => void` |

## 7. 注意事项

1. **注册时机**：`registerButton()` 需要在组件 `mounted` 生命周期中调用，确保 DOM 已准备好
2. **全局注册**：如果多个组件都要使用，可以在 `main.js` 中全局注册一次
3. **Vue 配置**：已在 `vue.config.js` 中配置了 `isCustomElement`，Vue 会将 `qk-` 开头的标签视为自定义元素
4. **样式**：按钮的样式会自动加载，无需手动引入 CSS

## 8. 全局注册（可选）

如果多个组件都要使用，可以在 `main.js` 中全局注册：

```javascript
// main.js
import Vue from 'vue'
const { registerButton } = require('@qiankun-admin/ui')

// 全局注册
registerButton('qk-button')

// ... 其他代码
```

这样就不需要在每个组件中单独注册了。
