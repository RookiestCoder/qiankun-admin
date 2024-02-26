<template>
  <div class="main-layout">
    <!-- layoutpage -->
    <div class="layout-header">
      <div class="lh-btn" @click="$router.replace('/')">返 回 首 页</div>
      <div class="lh-userinfo">
        <span @click="handleQuit" class="lhu-quit">退出登陆</span>
        <span class="lhu-name">
          <el-icon class=""><Avatar /></el-icon> {{ userStore.name }}
        </span>
        <span class="lhu-time"
          >{{ formattedDate }}&nbsp;&nbsp;{{ weekDate }}</span
        >
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
import { Avatar } from "@element-plus/icons-vue";
import { computed, onMounted, ref, watch } from "vue";
import microApps from "../../micro-app";
import { useRoute, useRouter } from "vue-router";
import router from "../router";
import chooseChild from "./components/chooseChild.vue";
import childWrap from "./components/childWrap.vue";
import { registerMicroApps, start, setDefaultMountApp } from "qiankun";
import { useUserStore } from "..//store/index";

const userStore = useUserStore();

// 监听路由变化，当有microApps中的baseurl时，隐藏选择框
const route = useRoute();
const isInChild = computed(() => {
  return microApps.some((item) => route.path.includes(item.activeRule));
});

//默认打开的地址
const current = ref("/sub-vue");

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
  const month = (currentDate.value.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.value.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
});
const weekDate = computed(() => {
  const daysOfWeek = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const currentDate = new Date();
  const dayIndex = currentDate.getDay();
  const currentDay = daysOfWeek[dayIndex];
  return currentDay;
});

//退出登陆
function handleQuit() {
  history.pushState(null, "login", "login");
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 0 50px;
    width: 100%;
    height: 50px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(51, 51, 51, 1);
    .lh-btn {
      cursor: pointer;
    }
    .lh-userinfo {
      display: flex;
      align-items: center;
      .lhu-quit {
        margin-right: 50px;
        cursor: pointer;
      }
      .lhu-name {
        margin-right: 50px;
        display: flex;
        align-items: center;
        .el-icon {
          margin-right: 10px;
        }
      }
      .lhu-time {
        color: rgba(10, 57, 118, 1);
      }
    }
  }

  .choice-box {
    height: calc(100% - 50px);
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
      //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    height: calc(100% - 50px);
    overflow: hidden;
  }
}
</style>
