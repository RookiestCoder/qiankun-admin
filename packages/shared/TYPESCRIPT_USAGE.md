# TypeScript 项目使用源码（不编译）

## 问题

主应用（main）是 TypeScript 项目，希望直接使用 packages 中的 TypeScript 源码，而不是编译后的 JavaScript，这样可以：
- ✅ 享受完整的 TypeScript 类型检查
- ✅ 支持热更新（修改源码立即生效）
- ✅ 更好的开发体验和调试体验

## 解决方案

### 配置 TypeScript 路径映射

在 `main/tsconfig.json` 中已经配置了路径映射：

```json
{
  "compilerOptions": {
    "paths": {
      "@qiankun-admin/shared": ["../packages/shared/src/index.ts"],
      "@qiankun-admin/shared/*": ["../packages/shared/src/*"],
      "@qiankun-admin/theme": ["../packages/theme/src/index.ts"],
      "@qiankun-admin/theme/*": ["../packages/theme/src/*"],
      "@qiankun-admin/ui": ["../packages/ui/src/index.ts"],
      "@qiankun-admin/ui/*": ["../packages/ui/src/*"]
    }
  }
}
```

### 配置 Webpack 别名

在 `main/vue.config.ts` 中配置了 webpack 别名：

```typescript
config.resolve.alias
  .set('@qiankun-admin/shared', path.resolve(__dirname, '../packages/shared/src'))
  .set('@qiankun-admin/theme', path.resolve(__dirname, '../packages/theme/src'))
  .set('@qiankun-admin/ui', path.resolve(__dirname, '../packages/ui/src'))
```

## 使用方式

### 在 main 项目中直接引用 TypeScript 源码

```typescript
// main/src/utils/helper.ts
import { debounce, formatDate, isEmpty } from '@qiankun-admin/shared'
import { initTheme, toggleTheme } from '@qiankun-admin/theme'
import type { UserInfo, GlobalState } from '@qiankun-admin/shared'

// 直接使用，享受完整的类型提示
const handleSearch = debounce((keyword: string) => {
  console.log(keyword)
}, 300)

const user: UserInfo = {
  name: '张三',
  id: '123'
}
```

### 在 Vue 组件中使用

```vue
<template>
  <div>
    <button @click="handleToggleTheme">切换主题</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toggleTheme, getCurrentTheme } from '@qiankun-admin/theme'
import { debounce, formatDate } from '@qiankun-admin/shared'
import type { ThemeMode } from '@qiankun-admin/theme'

const currentTheme = ref<ThemeMode>(getCurrentTheme())

const handleToggleTheme = () => {
  currentTheme.value = toggleTheme()
}

// 使用防抖
const handleSearch = debounce((keyword: string) => {
  console.log('搜索:', keyword)
}, 300)
</script>
```

## 工作原理

1. **TypeScript 编译时**：通过 `tsconfig.json` 的 `paths` 配置，TypeScript 编译器直接读取源码路径
2. **Webpack 运行时**：通过 `vue.config.ts` 的别名配置，webpack 直接打包源码（会经过 ts-loader 处理）
3. **类型检查**：IDE 和 TypeScript 编译器都能正确识别类型

## 优势

- ✅ **完整的 TypeScript 支持**：类型检查、自动补全、跳转定义
- ✅ **热更新**：修改 packages 源码后，主应用立即看到变化
- ✅ **无需编译**：主应用开发时不需要先编译 packages
- ✅ **更好的调试体验**：可以直接在源码中打断点

## 注意事项

1. **子应用（JavaScript）仍然使用编译后的 JS**：
   - `sub-vue`、`sub-react` 等 JavaScript 项目仍然使用 `dist/index.js`
   - 只有 TypeScript 项目（main）使用源码

2. **确保 packages 源码可用**：
   - packages 的 `package.json` 中 `files` 字段包含了 `src`
   - 这样即使发布到 npm，源码也会被包含

3. **开发工作流**：
   ```bash
   # TypeScript 项目（main）直接使用源码，无需编译
   pnpm dev:main
   
   # JavaScript 项目（sub-vue）需要先编译 packages
   pnpm build:packages
   pnpm dev:sub-vue
   ```

## 对比

| 项目类型 | 使用方式 | 是否需要编译 packages |
|---------|---------|---------------------|
| TypeScript（main） | 直接引用源码 | ❌ 不需要 |
| JavaScript（sub-vue） | 使用编译后的 JS | ✅ 需要 |

这样既保证了 TypeScript 项目的开发体验，又保证了 JavaScript 项目的兼容性。

