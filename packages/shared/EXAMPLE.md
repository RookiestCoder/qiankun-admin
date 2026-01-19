# 在 JavaScript 项目中使用示例

## 在 sub-vue 中使用 @qiankun-admin/shared

### 1. 安装依赖

```bash
cd sub-vue
pnpm add @qiankun-admin/shared
```

### 2. 使用示例

```javascript
// sub-vue/src/utils/helper.js

// 方式 1：使用 CommonJS require（推荐）
const { debounce, formatDate, isEmpty, getUrlParam, isQiankun } = require('@qiankun-admin/shared')

// 方式 2：使用 ES6 import（如果配置了支持）
// import { debounce, formatDate, isEmpty } from '@qiankun-admin/shared'

// 防抖函数示例
export const handleSearch = debounce((keyword) => {
  console.log('搜索关键词:', keyword)
  // 执行搜索逻辑
}, 300)

// 节流函数示例
export const handleScroll = throttle(() => {
  console.log('滚动事件')
}, 100)

// 格式化日期示例
export const formatDateTime = (date) => {
  return formatDate(date, 'YYYY-MM-DD HH:mm:ss')
}

// 判断是否为空
export const checkEmpty = (value) => {
  return isEmpty(value)
}

// 获取 URL 参数
export const getQuery = (name) => {
  return getUrlParam(name)
}

// 判断是否在 qiankun 环境
export const checkQiankun = () => {
  return isQiankun()
}
```

### 3. 在 Vue 组件中使用

```vue
<template>
  <div>
    <input v-model="keyword" @input="handleInput" />
    <p>当前时间: {{ currentTime }}</p>
    <p>是否在 qiankun 环境: {{ inQiankun }}</p>
  </div>
</template>

<script>
const { debounce, formatDate, isQiankun } = require('@qiankun-admin/shared')

export default {
  name: 'ExampleComponent',
  data() {
    return {
      keyword: '',
      currentTime: '',
      inQiankun: false
    }
  },
  created() {
    // 格式化当前时间
    this.currentTime = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
    
    // 检查是否在 qiankun 环境
    this.inQiankun = isQiankun()
  },
  methods: {
    // 使用防抖处理输入
    handleInput: debounce(function() {
      console.log('搜索:', this.keyword)
      // 执行搜索逻辑
    }, 300)
  }
}
</script>
```

### 4. 使用 qiankun 全局状态

```javascript
// sub-vue/src/utils/qiankun.js
const { getGlobalState, setGlobalState, onGlobalStateChange } = require('@qiankun-admin/shared')

// 获取全局状态
export function getGlobalUserInfo() {
  const state = getGlobalState()
  return state ? state.userInfo : null
}

// 设置全局状态
export function updateGlobalUserInfo(userInfo) {
  setGlobalState({
    userInfo: userInfo
  })
}

// 监听全局状态变化
export function watchGlobalState(callback) {
  onGlobalStateChange((state, prev) => {
    console.log('全局状态变化:', state, prev)
    if (callback) {
      callback(state, prev)
    }
  })
}
```

### 5. 在 Vuex Store 中使用

```javascript
// sub-vue/src/store/modules/user.js
const { getGlobalState, setGlobalState } = require('@qiankun-admin/shared')

export default {
  namespaced: true,
  state: {
    userInfo: null
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 从全局状态同步用户信息
    syncUserInfo({ commit }) {
      const globalState = getGlobalState()
      if (globalState && globalState.userInfo) {
        commit('SET_USER_INFO', globalState.userInfo)
      }
    },
    // 更新全局用户信息
    updateGlobalUserInfo({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo)
      setGlobalState({ userInfo })
    }
  }
}
```

## 注意事项

1. **必须先编译 packages**：
   ```bash
   # 在根目录执行
   pnpm build:packages
   ```

2. **开发时使用 watch 模式**：
   ```bash
   cd packages/shared
   pnpm build:watch
   ```

3. **如果修改了 packages 源码**，需要重新编译并重启子应用。

4. **类型提示**：虽然使用的是 JavaScript，但安装包后 IDE 仍可以提供类型提示（通过 `.d.ts` 文件）。

