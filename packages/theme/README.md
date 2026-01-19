# @qiankun-admin/theme

微前端主题配置模块，提供统一的主题管理和 CSS 变量。

## 安装

```bash
pnpm add @qiankun-admin/theme
```

## 使用

### 基础使用

```typescript
import { applyTheme, getCurrentTheme, toggleTheme, initTheme } from '@qiankun-admin/theme'

// 初始化主题（在应用启动时调用）
initTheme()

// 应用指定主题
applyTheme('dark')

// 获取当前主题
const currentTheme = getCurrentTheme() // 'light' | 'dark'

// 切换主题
const newTheme = toggleTheme()
```

### 在 Vue 中使用

```vue
<template>
  <div>
    <button @click="handleToggleTheme">切换主题</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { initTheme, toggleTheme } from '@qiankun-admin/theme'

onMounted(() => {
  initTheme()
})

function handleToggleTheme() {
  toggleTheme()
}
</script>
```

### 在 React 中使用

```tsx
import { useEffect } from 'react'
import { initTheme, toggleTheme } from '@qiankun-admin/theme'

function App() {
  useEffect(() => {
    initTheme()
  }, [])

  return (
    <div>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  )
}
```

### CSS 变量

主题模块会自动设置以下 CSS 变量，你可以在样式中直接使用：

```css
.my-component {
  color: var(--text-color);
  background-color: var(--bg-color);
  border-color: var(--border-color);
}
```

### 可用变量

- `--color-primary`: 主色
- `--color-success`: 成功色
- `--color-warning`: 警告色
- `--color-error`: 错误色
- `--color-info`: 信息色
- `--bg-color`: 背景色
- `--text-color`: 文本色
- `--text-color-secondary`: 次要文本色
- `--border-color`: 边框色
- 等等...

