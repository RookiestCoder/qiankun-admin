import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
/**
 * @description ：isMainSinglePage参数判断是否是主应用的单独页面，不走layout
*/


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/login.vue'),
    meta: { isMainSinglePage: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes
})

export default router
