<template>
  <div class="main-layout-childWrap">
    <!-- 子系统挂载节点 -->
    <div id="subapp-viewport"></div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="less" scoped>
.main-layout-childWrap {
  width: 100%;
  height: calc(100% - 50px);
  #subapp-viewport {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
