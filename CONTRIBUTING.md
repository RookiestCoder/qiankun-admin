# 🤝 贡献指南

感谢您对 qiankun-admin 项目的关注！我们欢迎各种形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 🔧 提交代码修复
- 📚 改进文档
- 🎨 优化UI/UX
- ⚡ 性能优化

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git >= 2.30.0

### 开发设置

1. **Fork 项目**
   ```bash
   # Fork 本项目到您的 GitHub 账户
   ```

2. **克隆项目**
   ```bash
   git clone https://github.com/YOUR_USERNAME/qiankun-admin.git
   cd qiankun-admin
   ```

3. **安装依赖**
   ```bash
   pnpm install
   ```

4. **启动开发环境**
   ```bash
   pnpm dev
   ```

## 📝 开发流程

### 1. 创建功能分支

```bash
# 从 main 分支创建新分支
git checkout -b feature/your-feature-name

# 或修复分支
git checkout -b fix/bug-description

# 或文档分支
git checkout -b docs/update-readme
```

### 2. 代码开发

#### 代码规范
- 遵循项目的 ESLint 和 Prettier 配置
- 使用 TypeScript 进行类型检查
- 提交前运行代码检查

```bash
# 代码检查
pnpm lint
pnpm type-check

# 代码格式化
pnpm format
```

#### 提交规范
项目采用 [Conventional Commits](https://conventionalcommits.org/) 规范：

```bash
# 推荐使用交互式提交
pnpm commit

# 或手动提交 (需符合规范)
git commit -m "feat: 添加用户管理功能"
git commit -m "fix: 修复登录页面样式问题"
git commit -m "docs: 更新API文档"
```

### 3. 测试验证

```bash
# 构建所有项目
pnpm build

# 单独构建特定项目
pnpm build:main
pnpm build:sub-react
```

### 4. 提交 Pull Request

1. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **创建 Pull Request**
   - 访问您的 Fork 仓库
   - 点击 "Compare & pull request"
   - 填写 PR 描述：
     - 简要说明改动内容
     - 关联相关 Issue (如果有)
     - 添加测试截图 (如果有UI改动)

3. **等待审查**
   - 项目维护者会审查您的代码
   - 根据反馈进行修改
   - 获得批准后会被合并

## 🎯 贡献类型

### 🐛 Bug 修复
- 清晰描述问题
- 提供复现步骤
- 提交修复代码
- 添加或更新测试

### 💡 新功能
- 先在 Issues 中讨论功能需求
- 提供详细的设计文档
- 分步实现功能
- 更新相关文档

### 📚 文档改进
- 修复文档错误
- 补充缺失的文档
- 改进文档结构
- 添加使用示例

### 🧪 测试
- 添加单元测试
- 改进测试覆盖率
- 添加集成测试
- 更新测试文档

## 🏗️ 项目结构

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
├── .husky/                 # Git Hooks
├── pnpm-workspace.yaml     # pnpm 工作区配置
└── README.md               # 项目说明
```

## 🔧 开发工具

### 推荐编辑器配置

#### VS Code 插件
- ESLint
- Prettier
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer

#### VS Code 设置
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### 常用命令

```bash
# 开发
pnpm dev                    # 启动所有应用
pnpm dev:main              # 启动主基座

# 代码质量
pnpm lint                  # ESLint 检查
pnpm format               # Prettier 格式化
pnpm type-check           # TypeScript 检查

# 构建
pnpm build                # 构建所有项目
pnpm build:packages       # 构建共享包

# 提交
pnpm commit               # 交互式提交
```

## 📋 行为准则

### 基本原则
- 尊重他人，友善交流
- 保持代码质量和一致性
- 及时响应 Issues 和 PR
- 积极参与社区讨论

### 代码审查标准
- ✅ 功能完整，实现需求
- ✅ 代码规范，通过所有检查
- ✅ 测试覆盖，包含必要测试
- ✅ 文档更新，同步修改文档
- ✅ 性能考虑，无明显性能问题

### 提交信息规范
- 使用清晰简洁的语言
- 说明做了什么，为什么做
- 关联相关 Issue (如: `fix #123`)

## ❓ 常见问题

### Q: 如何添加新的子应用？
A: 参考现有子应用的结构，在 `pnpm-workspace.yaml` 中添加配置，然后更新相关路由和菜单配置。

### Q: 如何修改共享包？
A: 在 `packages/` 目录下修改相应包，然后运行 `pnpm build:packages` 重新构建。

### Q: 代码检查失败怎么办？
A: 运行 `pnpm lint` 查看具体错误，修复后重新提交。

### Q: 如何测试微前端集成？
A: 启动主基座 (`pnpm dev:main`)，然后启动各个子应用进行集成测试。

## 📞 获取帮助

- 📧 **邮箱**: 发送邮件到项目维护者
- 💬 **Issues**: 在 GitHub Issues 中提问
- 💬 **Discussions**: 参与 GitHub Discussions 讨论
- 📖 **文档**: 查看项目 README 和 Wiki

## 📜 许可证

贡献的代码将采用与项目相同的 [MIT License](LICENSE)。

---

再次感谢您的贡献！🎉
