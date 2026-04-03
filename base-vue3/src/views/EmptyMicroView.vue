<template>
  <!-- 微应用由 layout 中 qiankun 挂载到 #subapp-viewport，此处仅占位以便 Vue Router 匹配 /child-* 路径 -->
  <div class="empty-micro-route" aria-hidden="true" />
</template>

<script setup lang="ts"></script>

<style scoped>
.empty-micro-route {
  display: none;
}
</style>
