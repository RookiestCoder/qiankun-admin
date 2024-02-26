import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //面包树
    breadTree: [{ label: '修改全局参数', path: '/changeGlobalStore' }],
    //当前展示地址
    currentPath:'/changeGlobalStore'
  },
  getters: {
  },
  mutations: {
    // 添加新的面包屑项
    addBreadcrumb(state, breadcrumbItem) {
      if (!state.breadTree.find(item => item.path == breadcrumbItem.path)) {
        state.breadTree.push(breadcrumbItem);
      }
    },
    // 清除面包屑
    deleteBreadcrumb(state, breadcrumbItem) {
      state = state.breadTree.filter(item => {
        item.path != breadcrumbItem.path
      })
    },
    //修改当前路由
    changeCurrentPath(state,currentPath){
      state.currentPath=currentPath;
    }
  },
  actions: {
  },
  modules: {
  }
})
