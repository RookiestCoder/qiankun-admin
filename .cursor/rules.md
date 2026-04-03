# qiankun-admin — Cursor 规则

本文件为在本仓库内协助开发时的约定与上下文说明，便于快速对齐技术栈与命令习惯。

## 项目概览

基于 **qiankun** 的 **pnpm workspace** 微前端 monorepo：主应用 `base-vue3`（Vue 3）加载多个子应用；共享能力在 `packages/*`（如 `shared`、`theme`、`ui`）。

## 目录结构（精简）

```
qiankun-admin/
├── base-vue3/           # 主基座：Vue 3 + qiankun + TypeScript + Element Plus
├── child-vue2/          # 子应用：Vue 2
├── child-vite-react/    # 子应用：React + Vite
├── child-html/          # 子应用：原生 HTML
├── packages/            # 共享包（需先 build 再被各应用消费时按 README 流程）
│   ├── shared/
│   ├── theme/
│   └── ui/
├── pnpm-workspace.yaml  # workspace + catalog 统一依赖版本
├── package.json         # 根脚本（dev/build/lint 等）
└── README.md            # 详细文档与端口说明
```

## 环境要求

- **Node.js**：`>= 18`（以根目录 `package.json` 的 `engines` 为准）。
- **pnpm**：`>= 9.5`（见 `engines`）。**Workspace Catalogs**（`pnpm-workspace.yaml` 中的 `catalog` 与 `package.json` 中的 `catalog:` 协议）自 **pnpm 9.5** 起提供；低于该版本无法正常解析本仓库的依赖声明。

## 依赖安装

在仓库根目录执行：

```bash
pnpm install
```

若 lockfile 与某包 `package.json` 不一致（例如改过 `catalog` 引用），需按团队流程更新锁文件，必要时在 CI 外使用 `pnpm install --no-frozen-lockfile`（以项目规范为准）。

## 常用命令（根目录）

优先在**仓库根目录**用 pnpm 调用脚本，与 `package.json` 保持一致：

```bash
# 并行启动主应用 + 所有子应用（联调）
pnpm dev

# 单独启动（按需调试）
pnpm dev:base-vue3
pnpm dev:child-vue2
pnpm dev:child-vite-react
pnpm dev:child-html

# 构建 / 质量
pnpm build
pnpm build:packages
pnpm lint
pnpm type-check
pnpm format
pnpm format:check
```

等价地也可用 `npm run <script>`，但本仓库脚本内部依赖 `pnpm --filter`，本机需已安装 pnpm。

## 单包调试

进入对应目录后 `pnpm run serve` / `pnpm run build`，或始终在根目录使用 filter：

```bash
pnpm --filter base-vue3 run serve
pnpm --filter child-vue2 run serve
```

具体端口以 **README.md「访问地址」** 为准（主基座默认 `5500` 等）。

## 微前端与主应用相关路径（便于改代码时定位）

- 子应用注册与入口：主应用侧 `base-vue3/micro-app.ts`；环境变量见 `base-vue3/.env.development`、`.env.production`（子应用 entry URL）。
- 基座里 qiankun 生命周期与选择子应用 UI：`base-vue3/src/layout/` 下组件。
- 共享包在基座中的 webpack 别名：`base-vue3/vue.config.ts` 中 `@qiankun-admin/shared` 等指向 `packages/*/src`。

## 给 AI 助手的实现约定

1. **改动范围**：只改任务需要的文件；避免无关重构、不擅自批量改文档（README 等除非用户要求）。
2. **风格一致**：遵循现有目录、命名、TypeScript/Vue 写法与格式化结果（Prettier、lint）。
3. **monorepo**：改依赖时注意是否应写入 `pnpm-workspace.yaml` 的 `catalog`，子包用 `catalog:` 引用版本。
4. **微前端**：修改子应用 publicPath、`__webpack_public_path__`、端口或路由 base 时，需与主应用 entry、activeRule 一致，避免联调失败。
5. **提交**：若用户需要提交信息规范，可使用根目录已配置的 `pnpm commit`（Commitizen）。

## 文档来源

更完整的命令表、端口、构建顺序与 Catalog 说明见仓库根目录 **README.md**；若与本文冲突，以 **README.md 与 `package.json` 当前内容** 为准。
