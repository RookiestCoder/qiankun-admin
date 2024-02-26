<template>
  <div class="main-layout-childList">
    <div class="choice-box">
      <div
        v-for="(item, index) in microApps"
        :key="index"
        @click="goto(item)"
        class="cb-item"
      >
        <img :src="require(`@/assets/images/${item.icon}`)" alt="" />
        <span class="cbi-title">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, ref, watch } from "vue";
import microApps from "../../../micro-app";
import { registerMicroApps, start, setDefaultMountApp } from "qiankun";
import { useRouteInfoStore } from "../../store/index";
const routeInfo = useRouteInfoStore();
const watchedValue1 = ref(routeInfo.currentSub);
const watchedValue2 = ref(routeInfo.currentPath);
// 使用 watch 监听多个属性的变化
watch(
  [() => routeInfo.currentSub, () => routeInfo.currentPath],
  ([newValue1, newValue2], [oldValue1, oldValue2]) => {
    if (newValue1 == "sub-react") {
      goto(microApps[1]);
    }
  }
);

onMounted(() => {
  const config = ref({
    beforeLoad: [
      // 挂载前回调
      (app) => {
        console.log(
          "%c before load",
          "background:#0f0 ; padding: 1px; border-radius: 3px;  color: #fff",
          app
        );
      },
    ],
    beforeMount: [
      // 挂载后回调
      (app) => {
        console.log(
          "%c before mount",
          "background:#f1f ; padding: 1px; border-radius: 3px;  color: #fff",
          app
        );
      },
    ],
    afterMount: [
      // 挂载后回调
      (app) => {
        console.log(
          "%c after mount",
          "background:#a7a ; padding: 1px; border-radius: 3px;  color: #fff",
          app
        );
      },
    ],
    beforeUnmount: [
      // 卸载前回调
      (app) => {
        console.log(
          "%c after unmount",
          "background:#a7a ; padding: 1px; border-radius: 3px;  color: #fff",
          app
        );
      },
    ],
    afterUnmount: [
      // 卸载后回调
      (app) => {
        console.log(
          "%c after unmount",
          "background:#a7a ; padding: 1px; border-radius: 3px;  color: #fff",
          app
        );
      },
    ],
  });
  registerMicroApps(microApps, config.value);
  start();
});

function goto(item) {
  history.pushState(null, item.activeRule, item.activeRule);
}
</script>
<style lang="less" scoped>
.main-layout-childList {
  width: 100%;
  height: 100%;
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
}
</style>
