<template>
  <div id="main">
    <router-view v-if="$route.meta.isMainSinglePage"></router-view>
    <layout v-else></layout>
  </div>
</template>

<script>
import layout from "./layout/index.vue";
export default {
  name: "main",
  components: { layout },
  data() {
    return {
    };
  },
  methods: {},
  created() {},
};
</script>

<style>
html,
body {
  margin: 0 !important;
  padding: 0;
  height: 100%;
}
</style>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}
</style>