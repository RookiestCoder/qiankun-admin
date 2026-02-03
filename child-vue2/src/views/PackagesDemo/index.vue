<template>
  <div class="packages-demo">
    <el-card class="demo-card">
      <div slot="header">
        <span>Packages 使用示例</span>
      </div>

      <!-- 工具函数示例 -->
      <el-card class="section-card" shadow="never">
        <div slot="header">
          <span>1. 工具函数示例 (@qiankun-admin/shared)</span>
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            <h4>防抖搜索</h4>
            <el-input
              v-model="searchKeyword"
              placeholder="输入关键词（300ms 防抖）"
              @input="handleSearch"
            />
            <p class="result-text">搜索关键词: {{ searchResult }}</p>
          </el-col>

          <el-col :span="12">
            <h4>日期格式化</h4>
            <p>当前时间: {{ currentTime }}</p>
            <p>格式化日期: {{ formattedDate }}</p>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="12">
            <h4>判断是否为空</h4>
            <el-input v-model="emptyTestValue" placeholder="输入值测试" />
            <p class="result-text">是否为空: {{ isEmptyResult ? '是' : '否' }}</p>
          </el-col>

          <el-col :span="12">
            <h4>获取 URL 参数</h4>
            <p>参数 'test': {{ urlParam }}</p>
            <p>是否在 qiankun 环境: {{ inQiankun ? '是' : '否' }}</p>
          </el-col>
        </el-row>
      </el-card>

      <!-- qiankun 全局状态示例 -->
      <el-card class="section-card" shadow="never" style="margin-top: 20px">
        <div slot="header">
          <span>2. qiankun 全局状态示例</span>
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            <h4>全局用户信息</h4>
            <pre>{{ globalUserInfo }}</pre>
            <el-button @click="updateUserInfo" type="primary" size="small">
              更新用户信息
            </el-button>
          </el-col>

          <el-col :span="12">
            <h4>全局路由信息</h4>
            <pre>{{ globalRouteInfo }}</pre>
            <el-button @click="updateRouteInfo" type="primary" size="small">
              更新路由信息
            </el-button>
          </el-col>
        </el-row>

        <el-alert
          :title="stateChangeMessage"
          type="info"
          :closable="false"
          style="margin-top: 20px"
          v-if="stateChangeMessage"
        />
      </el-card>

      <!-- 主题管理示例 -->
      <el-card class="section-card" shadow="never" style="margin-top: 20px">
        <div slot="header">
          <span>3. 主题管理示例 (@qiankun-admin/theme)</span>
        </div>

        <div>
          <h4>当前主题: {{ currentTheme }}</h4>
          <el-button @click="handleToggleTheme" type="primary"> 切换主题 </el-button>
          <el-button @click="handleSetLightTheme" size="small"> 设置为亮色 </el-button>
          <el-button @click="handleSetDarkTheme" size="small"> 设置为暗色 </el-button>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
// 引入工具函数
import {
  createSearchHandler,
  formatDateTime,
  formatDateOnly,
  checkEmpty,
  getQueryParam,
  checkQiankunEnv,
} from '@/utils/sharedUtils';

// 引入 qiankun 状态管理
import {
  getGlobalUserInfo,
  updateGlobalUserInfo,
  getGlobalRouteInfo,
  updateGlobalRouteInfo,
  watchGlobalState,
} from '@/utils/qiankunState';

// 引入主题管理
import { setupTheme, switchTheme, getTheme, setTheme } from '@/utils/themeUtils';

export default {
  name: 'PackagesDemo',
  data() {
    return {
      // 搜索相关
      searchKeyword: '',
      searchResult: '',
      searchHandler: null,

      // 日期相关
      currentTime: '',
      formattedDate: '',

      // 空值测试
      emptyTestValue: '',
      isEmptyResult: false,

      // URL 参数
      urlParam: '',
      inQiankun: false,

      // qiankun 全局状态
      globalUserInfo: null,
      globalRouteInfo: null,
      stateChangeMessage: '',

      // 主题
      currentTheme: 'light',
    };
  },
  watch: {
    emptyTestValue(newVal) {
      this.isEmptyResult = checkEmpty(newVal);
    },
  },
  created() {
    // 初始化搜索处理器（防抖）
    this.searchHandler = createSearchHandler();

    // 初始化主题
    setupTheme();
    this.currentTheme = getTheme();

    // 初始化日期
    this.updateTime();

    // 获取 URL 参数
    this.urlParam = getQueryParam('test') || '无';

    // 检查是否在 qiankun 环境
    this.inQiankun = checkQiankunEnv();

    // 获取全局状态
    this.loadGlobalState();

    // 监听全局状态变化
    watchGlobalState((state, prev) => {
      this.stateChangeMessage = `状态已更新: ${JSON.stringify(state)}`;
      this.loadGlobalState();
      // 3 秒后清除消息
      setTimeout(() => {
        this.stateChangeMessage = '';
      }, 3000);
    });
  },
  methods: {
    /**
     * 处理搜索输入（防抖）
     */
    handleSearch() {
      this.searchHandler(this.searchKeyword);
      this.searchResult = this.searchKeyword;
    },

    /**
     * 更新时间
     */
    updateTime() {
      const now = new Date();
      this.currentTime = formatDateTime(now);
      this.formattedDate = formatDateOnly(now);
    },

    /**
     * 更新用户信息
     */
    updateUserInfo() {
      const newUserInfo = {
        name: `用户_${Date.now()}`,
        id: Math.floor(Math.random() * 1000),
      };
      updateGlobalUserInfo(newUserInfo);
      this.loadGlobalState();
    },

    /**
     * 更新路由信息
     */
    updateRouteInfo() {
      updateGlobalRouteInfo('child-vue2', `packages-demo-${Date.now()}`);
      this.loadGlobalState();
    },

    /**
     * 加载全局状态
     */
    loadGlobalState() {
      this.globalUserInfo = getGlobalUserInfo();
      this.globalRouteInfo = getGlobalRouteInfo();
    },

    /**
     * 切换主题
     */
    handleToggleTheme() {
      this.currentTheme = switchTheme();
    },

    /**
     * 设置为亮色主题
     */
    handleSetLightTheme() {
      setTheme('light');
      this.currentTheme = 'light';
    },

    /**
     * 设置为暗色主题
     */
    handleSetDarkTheme() {
      setTheme('dark');
      this.currentTheme = 'dark';
    },
  },
  mounted() {
    // 每秒更新时间
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
};
</script>

<style scoped>
.packages-demo {
  padding: 20px;
}

.demo-card {
  max-width: 1200px;
  margin: 0 auto;
}

.section-card {
  margin-bottom: 20px;
}

.section-card h4 {
  margin: 10px 0;
  color: #409eff;
}

.result-text {
  margin-top: 10px;
  color: #67c23a;
  font-weight: bold;
}

pre {
  background: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  max-height: 200px;
  overflow: auto;
}
</style>
