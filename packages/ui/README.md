# @qiankun-admin/ui

微前端公共 UI 工具模块，提供通用的 UI 工具函数和类型定义。

## 安装

```bash
pnpm add @qiankun-admin/ui
```

## 使用

### 工具函数

```typescript
import { formatFileSize, copyToClipboard, downloadFile, getElementPosition } from '@qiankun-admin/ui'

// 格式化文件大小
const size = formatFileSize(1024 * 1024) // '1 MB'

// 复制到剪贴板
await copyToClipboard('要复制的文本')

// 下载文件
downloadFile('https://example.com/file.pdf', 'file.pdf')

// 获取元素位置
const position = getElementPosition(element)
```

### 类型定义

```typescript
import type { Size, Placement, Status } from '@qiankun-admin/ui'

const size: Size = 'medium'
const placement: Placement = 'top-start'
const status: Status = 'success'
```

## 说明

由于微前端项目可能使用不同的框架（Vue、React），框架特定的组件建议放在各自的子应用中。本模块主要提供：

- 通用的 UI 工具函数
- 类型定义
- 样式工具函数

如果需要跨框架的组件，可以考虑：
1. 使用 Web Components
2. 使用 iframe 嵌入
3. 在各自的子应用中实现

