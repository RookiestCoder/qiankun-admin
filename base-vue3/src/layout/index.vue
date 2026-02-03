<template>
  <div class="main-layout">
    <!-- layoutpage -->
    <div class="layout-header">
      <div class="header-left">
        <div class="logo-section">
          <div class="logo-icon">🚀</div>
          <span class="logo-text">Qiankun Admin</span>
        </div>
        <div class="lh-btn" @click="$router.replace('/')">
          <el-icon class="btn-icon"><HomeFilled /></el-icon>
          <span>返回首页</span>
        </div>
      </div>

      <div class="lh-userinfo">
        <div class="time-display">
          <el-icon class="time-icon"><Clock /></el-icon>
          <span class="lhu-time">{{ formattedDate }} {{ weekDate }}</span>
        </div>

        <div class="user-section">
          <div class="user-avatar">
            <el-icon class="avatar-icon"><Avatar /></el-icon>
          </div>
          <span class="lhu-name">{{ userStore.name }}</span>
        </div>

        <div class="lhu-quit" @click="handleQuit">
          <el-icon class="quit-icon"><SwitchButton /></el-icon>
          <span>退出</span>
        </div>

        <a
          href="https://github.com/RookiestCoder/qiankun-admin/tree/2.x"
          target="_blank"
          class="github-link"
          title="查看 GitHub 仓库"
        >
          <svg class="github-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </div>

    <!-- 选择子系统 -->
    <chooseChild v-show="!isInChild"></chooseChild>
    <!-- 子系统载体 -->
    <childWrap v-show="isInChild"></childWrap>
    <!-- <div id="subapp-viewport"></div> -->
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { Avatar, HomeFilled, Clock, SwitchButton } from '@element-plus/icons-vue';
import { computed, onMounted, ref, watch } from 'vue';
import microApps from '../../micro-app';
import { useRoute, useRouter } from 'vue-router';
import router from '../router';
import chooseChild from './components/chooseChild.vue';
import childWrap from './components/childWrap.vue';
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import { useUserStore } from '..//store/index';

const userStore = useUserStore();

// 监听路由变化，当有microApps中的baseurl时，隐藏选择框
const route = useRoute();
const isInChild = computed(() => {
  return microApps.some(item => route.path.includes(item.activeRule));
});

//默认打开的地址
const current = ref('/child-vue2');

//是否显示首页选择框
const mainChoiceVisiable = ref(true);

function goto(item) {
  this.mainChoiceVisiable = false;
  this.current = item.activeRule;
  history.pushState(null, item.activeRule, item.activeRule);
}

// 使用 ref 创建响应式数据
const currentDate = ref(new Date());

// 使用 computed 创建一个计算属性，格式化日期
const formattedDate = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = (currentDate.value.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.value.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
});
const weekDate = computed(() => {
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const currentDate = new Date();
  const dayIndex = currentDate.getDay();
  const currentDay = daysOfWeek[dayIndex];
  return currentDay;
});

//退出登陆
function handleQuit() {
  history.pushState(null, 'login', 'login');
  // router.push('/login')
}

onMounted(() => {});
</script>
<style lang="less" scoped>
.main-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .layout-header {
    position: relative;
    width: 100%;
    height: 70px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    color: white;
    font-size: 15px;
    z-index: 100;

    // 玻璃质感效果
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 100%
      );
      backdrop-filter: blur(10px);
      pointer-events: none;
    }

    // 底部光晕
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.5) 50%,
        transparent 100%
      );
      animation: shimmer 3s ease-in-out infinite;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 40px;
      position: relative;
      z-index: 1;

      .logo-section {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 20px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .logo-icon {
          font-size: 28px;
          animation: float 3s ease-in-out infinite;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }

      .lh-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 24px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-weight: 500;
        backdrop-filter: blur(10px);

        .btn-icon {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

          .btn-icon {
            transform: scale(1.1);
          }
        }

        &:active {
          transform: translateY(0);
        }
      }
    }

    .lh-userinfo {
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      z-index: 1;

      .time-display {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);

        .time-icon {
          font-size: 16px;
          animation: pulse 2s ease-in-out infinite;
        }

        .lhu-time {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
        }
      }

      .user-section {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 6px 16px 6px 6px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 25px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        cursor: pointer;
        backdrop-filter: blur(10px);

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

          .avatar-icon {
            font-size: 20px;
            color: white;
          }
        }

        .lhu-name {
          font-weight: 600;
          font-size: 15px;
        }
      }

      .lhu-quit {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 20px;
        background: rgba(255, 107, 107, 0.2);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        font-weight: 500;
        backdrop-filter: blur(10px);

        .quit-icon {
          font-size: 16px;
          transition: transform 0.3s ease;
        }

        &:hover {
          background: rgba(255, 107, 107, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);

          .quit-icon {
            transform: rotate(180deg);
          }
        }

        &:active {
          transform: translateY(0);
        }
      }

      .github-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
        color: #24292e;

        .github-icon {
          width: 36px;
          height: 36px;
          transition: all 0.2s ease;
        }

        &:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        &:active {
          transform: scale(1.05);
        }
      }
    }
  }

  .choice-box {
    height: calc(100% - 70px);
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .cb-item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 80px 50px;
      background-color: rgba(186, 213, 211, 0.2);
      border-radius: 20px;
      .cbi-title {
        margin-top: 20px;
        font-size: 30px;
      }
      > img {
        width: 200px;
        height: 200px;
      }
    }
  }

  #subapp-viewport {
    width: 100%;
    height: calc(100% - 70px);
    overflow: hidden;
  }
}

// 动画定义
@keyframes shimmer {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .main-layout .layout-header {
    padding: 0 20px;
    height: 60px;

    .header-left {
      gap: 20px;

      .logo-section .logo-text {
        display: none;
      }
    }

    .lh-userinfo {
      gap: 12px;

      .time-display {
        display: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .main-layout .layout-header {
    padding: 0 15px;
    height: 56px;

    .header-left .lh-btn span {
      display: none;
    }

    .lh-userinfo .user-section .lhu-name {
      display: none;
    }
  }
}
</style>
