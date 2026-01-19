# @qiankun-admin/shared

微前端公共工具模块，包含工具函数、类型定义、qiankun 全局状态管理等。

## 安装

```bash
pnpm add @qiankun-admin/shared
```

## 使用

### 工具函数

```typescript
import { debounce, throttle, formatDate, isEmpty } from '@qiankun-admin/shared'

// 防抖
const handleSearch = debounce((keyword: string) => {
  console.log(keyword)
}, 300)

// 节流
const handleScroll = throttle(() => {
  console.log('scroll')
}, 100)

// 格式化日期
const dateStr = formatDate(new Date(), 'YYYY-MM-DD')

// 判断是否为空
if (isEmpty(value)) {
  // ...
}
```

### 类型定义

```typescript
import type { UserInfo, RouteInfo, GlobalState } from '@qiankun-admin/shared'

const user: UserInfo = {
  name: '张三',
  id: '123',
}
```

### qiankun 全局状态管理

#### 主应用使用

```typescript
import { initQiankunGlobalState } from '@qiankun-admin/shared'

const actions = initQiankunGlobalState({
  userInfo: { name: '李四' },
})

// 设置全局状态
actions.setGlobalState({ userInfo: { name: '王五' } })
```

#### 子应用使用

```typescript
import { getGlobalState, setGlobalState, onGlobalStateChange } from '@qiankun-admin/shared'

// 获取全局状态
const state = getGlobalState()

// 设置全局状态
setGlobalState({ userInfo: { name: '赵六' } })

// 监听全局状态变化
onGlobalStateChange((state, prev) => {
  console.log('状态变化', state, prev)
})
```

### 常量

```typescript
import { SUB_APP_NAMES, STORAGE_KEYS, THEME_MODES } from '@qiankun-admin/shared'

console.log(SUB_APP_NAMES.SUB_VUE) // 'sub-vue'
console.log(STORAGE_KEYS.TOKEN) // 'qiankun-admin-token'
```

