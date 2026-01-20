module.exports = {
  // 行尾换行符
  endOfLine: 'lf',

  // 使用单引号
  singleQuote: true,

  // 尾随逗号
  trailingComma: 'es5',

  // 缩进宽度
  tabWidth: 2,

  // 使用空格而不是制表符
  useTabs: false,

  // 行宽度
  printWidth: 100,

  // 对象的括号之间加空格
  bracketSpacing: true,

  // 箭头函数参数括号
  arrowParens: 'avoid',

  // 在文件顶部插入 @prettier 注释
  requirePragma: false,

  // 在文件顶部插入 @format 注释
  insertPragma: false,

  // 换行符
  proseWrap: 'preserve',

  // HTML 空白敏感度
  htmlWhitespaceSensitivity: 'css',

  // Vue 文件缩进脚本和样式
  vueIndentScriptAndStyle: false,

  // 嵌入式语言格式化
  embeddedLanguageFormatting: 'auto',

  // 文件扩展名
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.yaml',
      options: {
        printWidth: 120,
        singleQuote: false,
      },
    },
  ],
};
