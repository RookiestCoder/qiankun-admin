module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 提交类型
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复
        'docs', // 文档
        'style', // 样式（不影响代码逻辑）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试
        'chore', // 构建工具或辅助工具的变动
        'revert', // 回滚
        'build', // 构建系统或外部依赖
        'ci', // CI配置
      ],
    ],
    // 提交主题长度限制
    'subject-max-length': [2, 'always', 72],
    // 提交主题不能为空
    'subject-empty': [2, 'never'],
    // 提交主题不能以句号结尾
    'subject-full-stop': [2, 'never', '.'],
    // 提交类型后面必须有空格
    'subject-case': [0, 'never'],
    // 提交类型不能为空
    'type-empty': [2, 'never'],
    // 作用域可以为空
    'scope-empty': [0, 'always'],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围 (可选):',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述 (可选). 使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选). 使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨ 新功能', emoji: '✨' },
      { value: 'fix', name: 'fix:      🐛 修复', emoji: '🐛' },
      { value: 'docs', name: 'docs:     📝 文档', emoji: '📝' },
      { value: 'style', name: 'style:    💄 样式', emoji: '💄' },
      { value: 'refactor', name: 'refactor: 🔄 重构', emoji: '🔄' },
      { value: 'perf', name: 'perf:     ⚡ 性能优化', emoji: '⚡' },
      { value: 'test', name: 'test:     ✅ 测试', emoji: '✅' },
      { value: 'chore', name: 'chore:    🔧 构建工具', emoji: '🔧' },
      { value: 'revert', name: 'revert:   ⏪ 回滚', emoji: '⏪' },
      { value: 'build', name: 'build:    📦 构建', emoji: '📦' },
      { value: 'ci', name: 'ci:       🤖 CI', emoji: '🤖' },
    ],
    useEmoji: true,
  },
};
