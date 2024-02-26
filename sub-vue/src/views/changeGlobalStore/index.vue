<template>
  <div class="subvue-changeGlobalStore">
    修改姓名
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <div @click="handleSubmit" class="btn">提交修改</div>
</div>
</template>
<script>
export default {
    //修改全局store的demo
  name: 'subvue-changeGlobalStore',
  data () {
    return {
      input:'',
    }
  },
  methods: {
    handleSubmit(){
      this.$setGlobalState({userInfo:{name:this.input?this.input:'张三'}})
    },
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>

.subvue-changeGlobalStore{
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  line-height: 50px;
  .btn{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    background-color: #409EFF;
    color: white;
    border-radius: 5px;
    margin-top: 20px;
  }

}

</style>
