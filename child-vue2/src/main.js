import './public-path';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注意：Web Components 的样式会自动注入到 Shadow DOM 中，不需要手动引入
// import '@qiankun-admin/ui/dist/style.css';
import App from './App.vue';
import routes from './router';
import { applyChildRouteGuards } from './router/routeGuards';
// import { store as commonStore } from 'common'
import store from './store';
import VueRouter from 'vue-router';
Vue.use(VueRouter).use(ElementUI);

Vue.config.productionTip = false;

// 全局注册 Web Components 按钮组件
try {
  const { registerButton } = require('@qiankun-admin/ui');
  registerButton('qk-button');
  console.log('[child-vue2] Web Components 按钮组件已全局注册');
} catch (error) {
  console.error('[child-vue2] 注册 Web Components 按钮组件失败:', error);
}

let instance = null;

function render(props = {}) {
  Vue.prototype.$setGlobalState = props.setGlobalState;
  const { container, routerBase } = props;
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : '/child-vue2',
    mode: 'history',
    routes,
  });

  applyChildRouteGuards(router, store, 'child-vue2');

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#child-vue2') : '#child-vue2');
}
if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  //   commonStore.globalRegister(store)
  // 模拟登录后，存储用户信息到global module
  //   const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  //   store.commit('global/setGlobalState', { user: userInfo })
  render();
}
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);

  if (typeof props.getMainAuth === 'function') {
    const mainAuth = props.getMainAuth();
    console.log('[child-vue2] 主应用 Pinia 下发的鉴权快照:', mainAuth);
    console.log('[child-vue2] token:', mainAuth?.token);
    console.log('[child-vue2] permissions:', mainAuth?.permissions);
  } else {
    console.warn('[child-vue2] props 中未提供 getMainAuth，跳过鉴权打印');
  }

  props.onGlobalStateChange((state, prev) => {
    console.log('[vue] 收到主应用消息变更:', state);
  });
  render(props);
}

export async function unmount() {
  console.log('销毁了');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
