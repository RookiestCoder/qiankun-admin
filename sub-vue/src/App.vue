<template>
  <div id="sub-vue">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  mounted() {
    if (window.__POWERED_BY_QIANKUN__) {
      let elements = document.querySelector("#subapp-viewport").childNodes;
      let childrenNode = elements[0];
      childrenNode.setAttribute("style", "height:100%;width:100%");
    }
  },
};
</script>

<style>
#sub-vue {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
