import HomeView from '../views/HomeView.vue';
import layout from '../layout/index.vue';
import VueRouter from 'vue-router';

// 处理重复点击同一个路由报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    name: 'child-vue2-layout',
    component: layout,
    redirect: '/changeGlobalStore',
    children: [
      {
        path: '/about',
        name: 'about',
        component: HomeView,
      },
      {
        //修改全局参数
        path: '/changeGlobalStore',
        name: '修改全局参数',
        component: () =>
          import(
            /* webpackChunkName: "changeGlobalStore" */ '../views/changeGlobalStore/index.vue'
          ),
      },
      {
        //跳转到子应用
        path: '/junpSubImp',
        name: '跳转子应用',
        component: () =>
          import(/* webpackChunkName: "junpSubImp" */ '../views/junpSubImp/index.vue'),
      },
      {
        // Packages 使用示例
        path: '/packages-demo',
        name: 'Packages 使用示例',
        component: () =>
          import(/* webpackChunkName: "packagesDemo" */ '../views/PackagesDemo/index.vue'),
      },
      {
        // Web Components 案例
        path: '/web-components-demo',
        name: 'Web Components 案例',
        component: () =>
          import(
            /* webpackChunkName: "webComponentsDemo" */ '../views/WebComponentsDemo/index.vue'
          ).catch(err => {
            console.error('Failed to load WebComponentsDemo component:', err);
            // 返回一个简单的错误组件，避免路由失败
            return {
              template: '<div>组件加载失败，请检查控制台错误信息</div>',
            };
          }),
      },

      // 其他子路由...
    ],
  },
];

export default routes;
