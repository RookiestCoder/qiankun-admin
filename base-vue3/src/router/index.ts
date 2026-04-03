import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
/**
 * isMainSinglePage：单独整页（如登录），不使用带侧栏/头部的 layout
 * 其余路由：父级为 layout，子级渲染在 layout 内 <router-view />
 */

const APP_NAME = 'base-vue3';

function formatRoute(route: any) {
  return {
    name: route?.name,
    path: route?.path,
    fullPath: route?.fullPath,
    params: route?.params,
    query: route?.query,
  };
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/login.vue'),
    meta: { isMainSinglePage: true },
  },
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    meta: {},
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
      },
      {
        path: 'child-vue2/:pathMatch(.*)*',
        name: 'micro-child-vue2',
        component: () =>
          import(/* webpackChunkName: "micro-empty" */ '../views/EmptyMicroView.vue'),
      },
      {
        path: 'child-vite-react/:pathMatch(.*)*',
        name: 'micro-child-vite-react',
        component: () =>
          import(/* webpackChunkName: "micro-empty" */ '../views/EmptyMicroView.vue'),
      },
      {
        path: 'child-html/:pathMatch(.*)*',
        name: 'micro-child-html',
        component: () =>
          import(/* webpackChunkName: "micro-empty" */ '../views/EmptyMicroView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // 统一打印路由切换信息（便于在微前端联调时区分“主应用/子应用”监听点）
  // eslint-disable-next-line no-console
  console.log(`[${APP_NAME}][router.beforeEach]`, {
    from: formatRoute(from),
    to: formatRoute(to),
  });
});

router.afterEach((to, from) => {
  // eslint-disable-next-line no-console
  console.log(`[${APP_NAME}][router.afterEach]`, {
    from: formatRoute(from),
    to: formatRoute(to),
  });
});

router.onError((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(`[${APP_NAME}][router.onError]`, error);
});

export default router;
