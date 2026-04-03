# qiankun-admin 微前端项目

基于 qiankun 框架构建的微前端管理系统，采用主从架构设计，实现应用间的独立开发、部署和运行。

## 📁 项目结构

```
qiankun-admin/
├── base-vue3/              # 主基座应用 (Vue3 + qiankun)
├── child-vue2/             # 子应用 Vue (Vue2 + JavaScript)
├── child-vite-react/       # 子应用 React (React18 + TypeScript)
├── child-html/             # 子应用 HTML (纯HTML)
├── packages/                # 共享包
│   ├── shared/             # 公共工具库
│   ├── theme/              # 主题配置
│   └── ui/                 # UI组件库 (Web Components)
├── pnpm-workspace.yaml     # pnpm 工作区 + Catalog 配置
├── package.json            # 根目录脚本和依赖管理
└── README.md               # 项目说明文档
```

## 🏗️ 技术栈

### 主基座 (base-vue3)
- **构建工具**: Vue CLI 5.0.0 + Webpack 5
- **前端框架**: Vue 3.2.13 + TypeScript 4.5.5
- **微前端框架**: qiankun 2.10.16
- **UI框架**: Element Plus 2.5.0
- **状态管理**: Pinia 2.1.7 + Vuex 4.0.0
- **路由**: Vue Router 4.3.0
- **样式**: Less 4.0.0 + Sass 1.26.10
- **HTTP客户端**: Axios 1.6.5
- **开发端口**: 5500

### 子应用 Vue (child-vue2)
- **构建工具**: Vue CLI 5.0.0 + Webpack 5
- **前端框架**: Vue 2.6.14 + JavaScript
- **UI框架**: Element UI 2.15.14
- **状态管理**: Vuex 3.6.2
- **路由**: Vue Router 3.2.0
- **样式**: Less 4.1.2
- **共享依赖**: @qiankun-admin/shared, @qiankun-admin/theme, @qiankun-admin/ui

### 子应用 React (child-vite-react)
- **构建工具**: Vite 3.1.0
- **前端框架**: React 18.2.0 + TypeScript 4.6.4
- **UI框架**: Ant Design 4.23.4
- **状态管理**: Redux Toolkit 1.8.5
- **路由**: React Router 6.4.1
- **微前端插件**: vite-plugin-qiankun 1.0.15
- **开发端口**: 5503

### 子应用 HTML (child-html)
- **技术栈**: 原生 HTML + JavaScript
- **开发服务器**: http-server 13.0.0
- **跨域支持**: CORS
- **开发端口**: 5509

### 共享包 (packages)
- **shared**: 公共工具库 (TypeScript 5.6.2 + qiankun 2.10.16)
- **theme**: 主题配置模块 (TypeScript 5.6.2)
- **ui**: UI组件库 (TypeScript 5.6.2 + Vue 3 + Web Components)

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 9.5.0（Workspace Catalogs / `catalog:` 自 [pnpm 9.5](https://github.com/pnpm/pnpm/releases/tag/v9.5.0) 起支持，低于该版本无法安装本仓库）

### 安装依赖
```bash
# 在仓库根目录安装所有依赖（workspace + catalog）
pnpm install
```

### 首次克隆 / 拉代码后的推荐流程

本地刚拿到仓库时，请按下面顺序操作（**不要**在 `pnpm install` 之前构建 `packages`，因为需要先安装依赖才能执行 `tsc` 等构建命令）：

1. **`pnpm install`**（必须在**仓库根目录**执行）  
   - 安装 monorepo 全部依赖，并正确链接 `workspace:*` 的 `@qiankun-admin/*`。  
   - 仅单独在某个子目录用 `npm install` 无法解析这些本地包。

2. **`pnpm build:packages`**（构建 `packages/shared`、`packages/theme`、`packages/ui`）  
   - 这些包的 `package.json` 中入口指向 **`dist/`**（如 `main: "dist/index.js"`），未执行构建时 `dist` 不存在，子应用在开发时引用 `@qiankun-admin/shared` 等可能报错或无法解析。  
   - 修改共享包源码后，需重新构建对应包，或对单个包使用其 `package.json` 中的 `build:watch`（若已配置）。

3. **启动应用**  
   - 根目录：`pnpm dev` 或 `pnpm dev:base-vue3` 等；或进入子项目执行 `pnpm run serve`。  
   - 根目录的 `pnpm build` 会先执行 `build:packages` 再构建各应用；日常开发在步骤 1、2 完成后即可跑本地调试。

**小结**：顺序是 **`pnpm install` → `pnpm build:packages` → 再启动各应用**，而不是先打包再 install。

## 🔧 开发命令

### 根目录统一命令 (推荐)

```bash
# 开发环境
npm dev                      # 并行启动所有应用
npm dev:base-vue3           # 主基座
npm dev:child-vue2          # Vue子应用
npm dev:child-vite-react    # React子应用
npm dev:child-html          # HTML子应用

# 代码质量
npm lint                    # ESLint检查
npm type-check             # TypeScript类型检查
npm format                 # Prettier格式化
npm format:check           # 检查格式化

# 构建
npm build                  # 构建所有项目
npm build:packages         # 只构建共享包
npm build:base-vue3       # 构建主基座
npm build:child-vue2      # 构建Vue子应用
npm build:child-vite-react # 构建React子应用
npm build:child-html      # 构建HTML子应用

# Git提交
npm commit                 # 交互式提交 (推荐)

# 清理
npm clean                  # 清理所有node_modules和dist
npm clean:packages         # 只清理共享包
```

### 各项目独立命令

| 项目 | 开发启动 | 构建 | 代码检查 | 预览 |
|------|----------|------|----------|------|
| base-vue3 | `cd base-vue3 && pnpm run serve` | `pnpm run build` | - | - |
| child-vue2 | `cd child-vue2 && pnpm run serve` | `pnpm run build` | - | - |
| child-vite-react | `cd child-vite-react && pnpm run serve` | `pnpm run build` | - | `pnpm run preview` |
| child-html | `cd child-html && pnpm run serve` | `pnpm run build` | - | - |
| shared | - | `pnpm run build` | `pnpm run type-check` | - |
| theme | - | `pnpm run build` | `pnpm run type-check` | - |
| ui | - | `pnpm run build` | `pnpm run type-check` | - |

### 启动应用

#### 方式1：分别启动各个应用
```bash
# 1. 启动主基座 (端口: 5500)
cd base-vue3 && pnpm run serve

# 2. 启动 Vue 子应用 (默认端口: 8080)
cd child-vue2 && pnpm run serve

# 3. 启动 React 子应用 (端口: 5503)
cd child-vite-react && pnpm run serve

# 4. 启动 HTML 子应用 (端口: 5509)
cd child-html && pnpm run serve
```

### 构建应用
```bash
# 构建主基座
cd base-vue3 && pnpm run build

# 构建 Vue 子应用
cd child-vue2 && pnpm run build

# 构建 React 子应用
cd child-vite-react && pnpm run build

# 构建 HTML 子应用
cd child-html && pnpm run build
```

### 构建共享包
```bash
# 构建所有共享包
pnpm build:packages

# 或分别构建
pnpm --filter @qiankun-admin/shared run build
pnpm --filter @qiankun-admin/theme run build
pnpm --filter @qiankun-admin/ui run build
```

## 🌐 访问地址

- **主基座**: http://localhost:5500
- **Vue子应用**: http://localhost:8080 (独立访问，默认端口)
- **React子应用**: http://localhost:5503 (独立访问)
- **HTML子应用**: http://localhost:5509 (独立访问)

## 📦 共享包管理

### Catalog 依赖管理

项目使用 **pnpm catalog** 统一管理共享依赖版本，避免版本冲突和重复定义。**请使用 pnpm >= 9.5.0**，否则无法识别 `catalog:` 协议（该能力在 pnpm 9.5 引入）。

```yaml
# pnpm-workspace.yaml
catalog:
  # 微前端框架
  qiankun: ^2.10.16
  # TypeScript 相关
  typescript: ^5.6.2
  # Vue 相关
  vue: ^3.2.13
  vue-router: ^4.3.0
  vuex: ^4.0.0
  pinia: ^2.1.7
  # React 相关
  react: ^18.3.1
  react-dom: ^18.3.1
  # Vite 相关
  vite: ^5.4.10
  # UI 框架
  element-plus: ^2.5.0
  # 等等...
```

各项目通过 `"catalog:"` 引用统一版本：

```json
{
  "dependencies": {
    "react": "catalog:",
    "vue": "catalog:",
    "typescript": "catalog:"
  }
}
```

### Workspace 协议

共享包使用 workspace 协议进行内部引用：

```json
{
  "dependencies": {
    "@qiankun-admin/shared": "workspace:*",
    "@qiankun-admin/theme": "workspace:*",
    "@qiankun-admin/ui": "workspace:*"
  }
}
```

### 共享包说明

#### shared 包
- 提供微前端相关的工具函数
- 包含 qiankun 状态管理工具
- 导出公共的工具方法

#### theme 包
- 统一主题配置
- 提供主题切换功能
- 支持暗色模式

#### ui 包
- **Web Components 组件库**: 基于 Vue 3 + TypeScript 构建的 Web Components
- **跨框架支持**: 可在 Vue2、Vue3、React 等任何框架中使用
- **技术实现**: 使用 Vue 3 的 `defineCustomElement` API 将 Vue 组件转换为标准 Web Components
- **样式隔离**: 通过 Shadow DOM 实现样式隔离，避免样式冲突
- **当前组件**: `qk-button` 按钮组件

##### Web Components 使用示例

**在 Vue 2 子应用中使用** (`child-vue2`):

```javascript
// main.js - 全局注册（使用 require，因为 Webpack 环境）
const { registerButton } = require('@qiankun-admin/ui');
registerButton('qk-button');

// vue.config.js - 配置 Vue 2 识别自定义元素
module.exports = {
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
  },
};

// 组件中使用
<template>
  <qk-button type="primary" @click="handleClick">
    点击按钮
  </qk-button>
</template>
```

**在 React 子应用中使用** (`child-vite-react`):

```tsx
// main.tsx - 全局注册
import { registerButton } from '@qiankun-admin/ui';
registerButton('qk-button');

// 组件中使用
function App() {
  return (
    <qk-button type="primary" onClick={handleClick}>
      点击按钮
    </qk-button>
  );
}
```

**组件属性**:
- `type`: 按钮类型 (`primary` | `success` | `warning` | `danger` | `info` | `default`)
- `size`: 按钮尺寸 (`small` | `medium` | `large`)
- `disabled`: 是否禁用
- `loading`: 是否加载中
- `@click` / `onClick`: 点击事件

**构建产物**:
- `index.cjs.js`: CommonJS 格式（用于 Webpack 项目，如 Vue CLI）
- `index.esm.js`: ES Module 格式（用于 Vite 项目）
- `index.iife.js`: IIFE 格式（用于浏览器直接引入）
- `index.d.ts`: TypeScript 类型定义

**技术优势**:
- ✅ **真正的跨框架**: 基于 Web 标准，可在任何框架中使用
- ✅ **样式隔离**: Shadow DOM 确保样式不会泄露或冲突
- ✅ **生命周期管理**: 自动处理组件的挂载和卸载
- ✅ **事件系统**: 支持原生 DOM 事件，兼容各框架的事件系统
- ✅ **类型安全**: 提供完整的 TypeScript 类型定义
- ✅ **零依赖**: 构建后的组件包含 Vue 3 运行时，无需额外依赖

## 🛠️ 开发工具链

### 代码格式化 (Prettier)
项目使用 Prettier 统一代码格式，确保代码风格一致。

```bash
# 格式化所有文件
pnpm format

# 检查格式化状态
pnpm format:check
```

### Git Hooks (Husky + lint-staged)
- **pre-commit**: 自动运行 Prettier 格式化
- **commit-msg**: 验证提交信息格式

### 提交规范 (Commitlint + Commitizen)
项目采用 [Conventional Commits](https://conventionalcommits.org/) 规范。

#### 提交类型
- `feat`: ✨ 新功能
- `fix`: 🐛 修复
- `docs`: 📝 文档
- `style`: 💄 样式
- `refactor`: 🔄 重构
- `perf`: ⚡ 性能优化
- `test`: ✅ 测试
- `chore`: 🔧 构建工具
- `revert`: ⏪ 回滚
- `build`: 📦 构建
- `ci`: 🤖 CI

#### 提交示例
```bash
feat: 添加用户登录功能
fix: 修复登录页面样式问题
docs: 更新README文档
```

#### 推荐提交方式
```bash
# 交互式提交 (推荐)
pnpm commit

# 或手动提交
git commit -m "feat: 添加新功能"
```

## 🏗️ 架构特点

### 微前端特性
1. **独立开发**: 各子应用可独立开发、部署
2. **技术栈无关**: 支持不同技术栈共存 (Vue2/Vue3/React/HTML)
3. **资源隔离**: JS沙箱、样式隔离、路由隔离
4. **共享复用**: 公共模块提取复用
5. **渐进升级**: 可逐步迁移老应用
6. **跨框架组件**: 通过 Web Components 实现真正的跨框架组件复用

### Monorepo 优势
1. **统一依赖管理**: 通过 pnpm catalog 统一管理依赖版本
2. **代码共享**: workspace 协议实现内部包共享
3. **原子提交**: 相关更改可在单次提交中完成
4. **高效构建**: 并行构建和增量构建优化
5. **团队协作**: 标准化开发流程和工具链

### 开发体验优化
1. **代码质量保证**: ESLint + Prettier + TypeScript 严格检查
2. **自动化工作流**: Git Hooks 自动执行代码检查和格式化
3. **提交规范**: Commitlint 确保提交信息规范化
4. **并行开发**: 支持多应用同时开发和调试

## 📚 相关文档

- [qiankun 官方文档](https://qiankun.umijs.org/)
- [Vue CLI 文档](https://cli.vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://reactjs.org/)

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送到分支: `git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情