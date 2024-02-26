<template>
  <div class="sub-vue-layout">
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
import BreadcrumbVue from "./components/Breadcrumb.vue"; //面包屑
import SideMenu from "./components/SideMenu.vue"; //左侧菜单
export default {
  name: "sub-vue-layout",
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
<style lang="less"  scoped>
.sub-vue-layout {
  width: 100%;
  height: 100%;
  display: flex;
  .svl-menu {
    width: 220px;
    height: 100%;
  }
  .svl-view {
    width: calc(100% - 220px);
    height: 100%;
    background-color: #f2f3f5;
    .svlv-bread {
      height: 50px;
      width: 100%;
    }
    .svl-wrap{
      width: 100%;
      height: calc(100% - 50px);
      overflow: scroll;
    }
  }
}
</style>
