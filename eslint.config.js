import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  // 忽略文件
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/*.tsbuildinfo',
      '**/.pnpm/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/*.config.js',
      '**/*.config.ts',
    ],
  },

  // 全局配置
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      // TypeScript 相关规则
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',

      // 通用代码质量规则
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // 使用 TypeScript 的规则
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // JSON 文件
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: tsparser,
    },
    rules: {
      'no-unused-expressions': 'off',
    },
  },
];
