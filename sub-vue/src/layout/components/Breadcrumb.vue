<template>
  <div class="sub-vue-layoutcom-bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="item.path" v-for="(item,index) in breadTree" :key="index">{{item.label}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "sub-vue-layoutcom-menu",
  data() {
    return {};
  },
  computed: {
    // 面包屑数组
    ...mapState(['breadTree']), // 获取整个对象
    breadTree() {
      return this.$store.state.breadTree;
    },
  },
  watch: {
    breadTree:{
      handler(newVal,oldVal){
        console.log('newValnewValnewVal',newVal)
      },
      deep:true
    }
  },
  methods: {},
  created() {},
  mounted() {
  },
};
</script>
<style lang="less" scoped>
.sub-vue-layoutcom-bread {
  height: 100%;
  background-color: white;
  padding: 10px 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px;
  border-radius: 6px;
}
</style>
