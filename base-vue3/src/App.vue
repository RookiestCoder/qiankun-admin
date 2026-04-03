<template>
  <div id="main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
