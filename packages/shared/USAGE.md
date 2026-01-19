# 在 JavaScript 项目中使用 TypeScript 编写的 packages

## 问题

`packages/` 目录下的工具类都是用 TypeScript 编写的，但子项目（如 `sub-vue`）使用的是 JavaScript，如何复用这些工具？

## 解决方案

### 方案 1：编译 TypeScript 为 JavaScript（推荐）

**原理**：将 TypeScript 代码编译成 JavaScript，子项目直接使用编译后的 JS 文件。

#### 步骤 1：编译 packages

```bash
# 编译所有 packages
pnpm build:packages

# 或者单独编译某个 package
cd packages/shared
pnpm build
```

编译后会在 `packages/shared/dist/` 目录下生成：
- `index.js` - CommonJS 格式的 JavaScript 文件
- `index.d.ts` - TypeScript 类型定义文件（可选，JS 项目不需要）

#### 步骤 2：在 JavaScript 项目中使用

在 `sub-vue` 中安装并使用：

```bash
# 在 sub-vue 目录下
pnpm add @qiankun-admin/shared
```

然后在 JavaScript 代码中使用：

```javascript
// sub-vue/src/utils/helper.js
const { debounce, formatDate, isEmpty } = require('@qiankun-admin/shared')
// 或者使用 ES6 import（如果配置了支持）
// import { debounce, formatDate, isEmpty } from '@qiankun-admin/shared'

// 使用示例
const handleSearch = debounce((keyword) => {
  console.log(keyword)
}, 300)

const dateStr = formatDate(new Date(), 'YYYY-MM-DD')

if (isEmpty(value)) {
  // ...
}
```

#### 步骤 3：配置 Vue CLI 支持（如果需要）

如果 `sub-vue` 使用 Vue CLI，默认已经支持 `node_modules` 中的 CommonJS 模块，无需额外配置。

如果需要直接引用源码（不推荐），可以在 `vue.config.js` 中配置：

```javascript
// sub-vue/vue.config.js
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@qiankun-admin/shared': path.resolve(__dirname, '../../packages/shared/src')
      }
    }
  },
  chainWebpack: config => {
    // 让 webpack 处理 TypeScript 文件
    config.module
      .rule('ts')
      .test(/\.ts$/)
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true
      })
  }
}
```

### 方案 2：让构建工具直接处理 TypeScript

**原理**：配置 webpack/vue-cli 直接处理 TypeScript 文件，无需预先编译。

#### 配置步骤

1. **安装 TypeScript 相关依赖**（在 sub-vue 中）：

```bash
cd sub-vue
pnpm add -D typescript ts-loader
```

2. **配置 vue.config.js**：

```javascript
// sub-vue/vue.config.js
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@qiankun-admin/shared': path.resolve(__dirname, '../../packages/shared/src')
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
}
```

3. **在 JavaScript 中直接引用**：

```javascript
// sub-vue/src/utils/helper.js
import { debounce, formatDate } from '@qiankun-admin/shared'
```

## 推荐方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| 方案 1：编译 TS 为 JS | ✅ 简单，无需额外配置<br>✅ 性能好（预编译）<br>✅ 兼容性好 | ❌ 需要先编译 | ⭐⭐⭐⭐⭐ |
| 方案 2：构建工具处理 | ✅ 无需预编译<br>✅ 支持热更新 | ❌ 需要额外配置<br>❌ 构建时间较长 | ⭐⭐⭐ |

## 实际使用示例

### 在 sub-vue 中使用 shared 包

```javascript
// sub-vue/src/utils/index.js
const { debounce, formatDate, isEmpty, getUrlParam } = require('@qiankun-admin/shared')

// 防抖搜索
export const handleSearch = debounce((keyword) => {
  console.log('搜索:', keyword)
}, 300)

// 格式化日期
export const formatDateTime = (date) => {
  return formatDate(date, 'YYYY-MM-DD HH:mm:ss')
}

// 获取 URL 参数
export const getQueryParam = (name) => {
  return getUrlParam(name)
}
```

### 在 sub-vue 中使用 theme 包

```javascript
// sub-vue/src/utils/theme.js
const { initTheme, toggleTheme, getCurrentTheme } = require('@qiankun-admin/theme')

// 初始化主题
export function setupTheme() {
  initTheme()
}

// 切换主题
export function switchTheme() {
  toggleTheme()
}

// 获取当前主题
export function currentTheme() {
  return getCurrentTheme()
}
```

## 注意事项

1. **必须先编译 packages**：使用方案 1 时，确保在开发前先运行 `pnpm build:packages`
2. **watch 模式**：开发时可以使用 `pnpm build:watch` 监听文件变化自动编译
3. **类型提示**：虽然 JS 项目不需要类型，但安装包后仍会有 `.d.ts` 文件，IDE 可以提供类型提示
4. **版本同步**：修改 packages 源码后，记得重新编译并重启子应用

## 开发工作流

```bash
# 1. 安装依赖
pnpm install

# 2. 编译 packages（首次或修改后）
pnpm build:packages

# 3. 启动开发服务器
pnpm dev

# 或者使用 watch 模式自动编译
cd packages/shared
pnpm build:watch
```

