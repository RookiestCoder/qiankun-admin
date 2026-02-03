<template>
  <div class="child-vue2-layout">
    <div class="svl-menu">
      <SideMenu></SideMenu>
    </div>
    <div class="svl-view">
      <div class="svlv-bread">
        <BreadcrumbVue></BreadcrumbVue>
      </div>
      <div class="svl-wrap">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import BreadcrumbVue from './components/Breadcrumb.vue'; //面包屑
import SideMenu from './components/SideMenu.vue'; //左侧菜单
export default {
  name: 'child-vue2-layout',
  components: {
    SideMenu,
    BreadcrumbVue,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.child-vue2-layout {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f5f7fa;

  .svl-menu {
    width: 220px;
    height: 100%;
  }

  .svl-view {
    width: calc(100% - 220px);
    height: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);

    .svlv-bread {
      height: 50px;
      width: 100%;
    }

    .svl-wrap {
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }
  }
}
</style>
