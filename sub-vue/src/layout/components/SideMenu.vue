<template>
  <div class="sub-vue-layoutcom-menu">
    <div class="svlm-logo">
      <img src="@/assets/logo.png" alt="">
      sub-vue
    </div>
    <el-menu
      :default-active="currentPath"
      class=""
      @open="handleOpen"
      @close="handleClose"
      background-color="#334154"
      text-color="#bfcbd9"
      active-text-color="#409eff"
    >
    <el-menu-item v-for="(item,index) in routes" :key="index" @click="$router.push(item.path)" :index="item.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "sub-vue-layoutcom-menu",
  data() {
    return {
      routes: [
        {name: '修改全局参数', path: '/changeGlobalStore',icon:'el-icon-location'},
        {name: '跳转子应用', path: '/junpSubImp',icon:'el-icon-menu'},
        {name: 'aboutVue', path: '/about',icon:'el-icon-document'},
        {name: '导航四', path: '/about',icon:'el-icon-setting'},
      ]
    };
  },
  computed: {
    // 面包屑数组
    ...mapState(['currentPath']), // 获取整个对象
    currentPath() {
      return this.$store.state.currentPath;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.sub-vue-layoutcom-menu {
  width: 100%;
  height: 100%;
  .svlm-logo{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #bfcbd9;
    background-color: #232d3b;
    font-size: 28px;
    img{
      width: 28px;
      margin-right: 10px;
    }
  }
  ::v-deep{
    .el-menu{
      height: calc(100% - 80px);
    }
  }
}
</style>
