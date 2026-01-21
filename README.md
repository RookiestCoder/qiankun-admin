# qiankun-admin 微前端项目

基于 qiankun 框架构建的微前端管理系统，采用主从架构设计，实现应用间的独立开发、部署和运行。

## 📁 项目结构

```
qiankun-admin/
├── main/                    # 主基座应用 (Vue3 + qiankun)
├── sub-vue/                 # 子应用 Vue (Vue2 + JavaScript)
├── sub-react/               # 子应用 React (React18 + TypeScript)
├── sub-html/                # 子应用 HTML (纯HTML)
├── packages/                # 共享包
│   ├── shared/             # 公共工具库
│   ├── theme/              # 主题配置
│   └── ui/                 # UI组件库
├── pnpm-workspace.yaml     # pnpm 工作区 + Catalog 配置
├── package.json            # 根目录脚本和依赖管理
└── README.md               # 项目说明文档
```

## 🏗️ 技术栈

### 主基座 (main)
- **构建工具**: Vue CLI 5.0.9 + Webpack 5.90.0
- **前端框架**: Vue 3.2.13 + TypeScript 4.5.5
- **微前端框架**: qiankun 2.6.3
- **UI框架**: Element Plus 2.5.0
- **状态管理**: Pinia 2.1.7 + Vuex 4.0.0
- **路由**: Vue Router 4.3.0
- **样式**: Less 4.0.0 + Sass 1.26.10
- **HTTP客户端**: Axios 1.6.5
- **开发端口**: 5500

### 子应用 Vue (sub-vue)
- **构建工具**: Vue CLI 5.0.0 + Webpack 5
- **前端框架**: Vue 2.6.14 + JavaScript
- **UI框架**: Element UI 2.15.14
- **状态管理**: Vuex 3.6.2
- **路由**: Vue Router 3.2.0
- **样式**: Less 4.1.2
- **共享依赖**: @qiankun-admin/shared, @qiankun-admin/theme, @qiankun-admin/ui

### 子应用 React (sub-react)
- **构建工具**: Vite 5.4.10
- **前端框架**: React 18.3.1 + TypeScript 5.6.2
- **代码检查**: ESLint 9.15.0
- **React插件**: @vitejs/plugin-react 4.3.4
- **类型定义**: @types/react 18.3.12, @types/react-dom 18.3.7

### 子应用 HTML (sub-html)
- **技术栈**: 原生 HTML + JavaScript
- **开发服务器**: http-server 13.0.0
- **跨域支持**: CORS
- **开发端口**: 5504

### 共享包 (packages)
- **shared**: 公共工具库 (TypeScript 5.0.0 + qiankun 2.6.3)
- **theme**: 主题配置模块 (TypeScript 5.0.0)
- **ui**: UI组件库 (TypeScript 5.0.0)

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 9.0.0 (支持 Catalog 依赖管理)

### 安装依赖
```bash
# 安装所有依赖
pnpm install
```

### 启动应用

#### 方式1：分别启动各个应用
```bash
# 1. 启动主基座 (端口: 5500)
cd main && pnpm run serve

# 2. 启动 Vue 子应用 (端口: 8080)
cd sub-vue && pnpm run serve

# 3. 启动 React 子应用 (端口: 3000)
cd sub-react && pnpm run dev

# 4. 启动 HTML 子应用 (端口: 5504)
cd sub-html && pnpm run serve
```

### 构建应用
```bash
# 构建主基座
cd main && pnpm run build

# 构建 Vue 子应用
cd sub-vue && pnpm run build

# 构建 React 子应用
cd sub-react && pnpm run build

# 构建 HTML 子应用
cd sub-html && pnpm run build
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

## 🔧 开发命令

### 根目录统一命令 (推荐)

```bash
# 开发环境
pnpm dev                    # 并行启动所有应用
pnpm dev:main              # 主基座
pnpm dev:sub-vue           # Vue子应用
pnpm dev:sub-react         # React子应用
pnpm dev:sub-html          # HTML子应用

# 代码质量
pnpm lint                  # ESLint检查
pnpm type-check           # TypeScript类型检查
pnpm format               # Prettier格式化
pnpm format:check         # 检查格式化

# 构建
pnpm build                # 构建所有项目
pnpm build:packages       # 只构建共享包
pnpm build:main           # 构建主基座
pnpm build:sub-vue        # 构建Vue子应用
pnpm build:sub-react      # 构建React子应用
pnpm build:sub-html       # 构建HTML子应用

# Git提交
pnpm commit               # 交互式提交 (推荐)

# 清理
pnpm clean                # 清理所有node_modules和dist
pnpm clean:packages       # 只清理共享包
```

### 各项目独立命令

| 项目 | 开发启动 | 构建 | 代码检查 | 预览 |
|------|----------|------|----------|------|
| main | `cd main && pnpm run serve` | `pnpm run build` | - | - |
| sub-vue | `cd sub-vue && pnpm run serve` | `pnpm run build` | - | - |
| sub-react | `cd sub-react && pnpm run dev` | `pnpm run build` | `pnpm run lint` | `pnpm run preview` |
| sub-html | `cd sub-html && pnpm run serve` | `pnpm run build` | - | - |
| shared | - | `pnpm run build` | `pnpm run type-check` | - |
| theme | - | `pnpm run build` | `pnpm run type-check` | - |
| ui | - | `pnpm run build` | `pnpm run type-check` | - |

## 🌐 访问地址

- **主基座**: http://localhost:5500
- **Vue子应用**: http://localhost:8080 (独立访问)
- **React子应用**: http://localhost:3000 (独立访问)
- **HTML子应用**: http://localhost:5504 (独立访问)

## 📦 共享包管理

### Catalog 依赖管理

项目使用 **pnpm catalog** 功能统一管理共享依赖版本，避免版本冲突和重复定义：

```yaml
# pnpm-workspace.yaml
catalog:
  # 微前端框架
  qiankun: ^2.6.3
  # TypeScript 相关
  typescript: ^5.6.2
  # Vue 相关
  vue: ^3.2.13
  # React 相关
  react: ^18.3.1
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
- 公共UI组件库
- 跨框架组件抽象
- 设计系统实现

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