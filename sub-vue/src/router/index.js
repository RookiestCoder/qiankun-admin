import HomeView from '../views/HomeView.vue'
import layout from '../layout/index.vue'
import VueRouter from "vue-router";

// 处理重复点击同一个路由报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: 'sub-vue-layout',
    component: layout,
    redirect:'/changeGlobalStore',
    children: [
      {
        path: '/about',
        name: 'about',
        component: HomeView
      },
      {   //修改全局参数
        path: '/changeGlobalStore',
        name: '修改全局参数',
        component: () => import(/* webpackChunkName: "changeGlobalStore" */ '../views/changeGlobalStore/index.vue')
      },
      {   //跳转到子应用
        path: '/junpSubImp',
        name: '跳转子应用',
        component: () => import(/* webpackChunkName: "junpSubImp" */ '../views/junpSubImp/index.vue')
      },
      
      // 其他子路由...
    ],
  },
]


export default routes;
