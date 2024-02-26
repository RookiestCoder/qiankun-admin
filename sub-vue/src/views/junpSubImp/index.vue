<template>
  <div class="subvue-jumpSubImp">
    <div>跳转到其他子应用</div>
    <div @click="handleJump" class="btn">点击跳转到react子应用</div>
  </div>
</template>
  <script>
export default {
  //跳转到其他子应用demo
  name: "subvue-jumpSubImp",
  data() {
    return {};
  },
  methods: {
    handleJump() {
      this.$setGlobalState({
        routeInfo: { currentSub:'sub-react', currentPath:'/123123'},
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
  <style lang="less" scoped>
.subvue-jumpSubImp {
    width: 100%;
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  .btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 40px;
    background-color: #409eff;
    color: white;
    border-radius: 5px;
    margin-top: 20px;
  }
}
</style>
  