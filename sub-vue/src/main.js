import './public-path'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import routes from './router'
// import { store as commonStore } from 'common'
import store from './store'
import VueRouter from 'vue-router'
Vue.use(VueRouter).use(ElementUI);

Vue.config.productionTip = false
let instance = null

function render(props = {}) {
  Vue.prototype.$setGlobalState = props.setGlobalState;
  const { container, routerBase } = props
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : '/sub-vue',
    mode: 'history',
    routes
  })
  router.beforeEach((to, from, next) => {
    //每次跳转前将路由加到面包屑数组
    store.commit('addBreadcrumb', {
      label: to.name,
      path: to.fullPath,
    });
    //修改当前路由
    store.commit('changeCurrentPath', to.fullPath)
    next()
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#sub-vue') : '#sub-vue')
}
if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  //   commonStore.globalRegister(store)
  // 模拟登录后，存储用户信息到global module
  //   const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  //   store.commit('global/setGlobalState', { user: userInfo })
  render()
}
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
  //   commonStore.globalRegister(store, props)
  //在这里可以把子应用的store数据初始化
  props.onGlobalStateChange((state, prev) => {
    console.log('[vue] 收到主应用消息变更:', state)
  })
  render(props)
}

export async function unmount() {
  console.log('销毁了')
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
