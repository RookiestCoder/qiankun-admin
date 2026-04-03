function formatRoute(route) {
  return {
    name: route && route.name,
    path: route && route.path,
    fullPath: route && route.fullPath,
    params: route && route.params,
    query: route && route.query,
  };
}

/**
 * 为子应用 router 绑定统一的守卫日志与面包屑更新逻辑。
 * 注意：子应用的 router 是在 qiankun 的 render(props) 里动态 new VueRouter 的，所以必须在 router 创建后调用。
 */
export function applyChildRouteGuards(router, store, appName = 'child-vue2') {
  router.beforeEach((to, from, next) => {
    //每次跳转前将路由加到面包屑数组
    // eslint-disable-next-line no-console
    console.log(`[${appName}][router.beforeEach]`, {
      from: formatRoute(from),
      to: formatRoute(to),
    });

    store.commit('addBreadcrumb', {
      label: to.name,
      path: to.fullPath,
    });

    //修改当前路由
    store.commit('changeCurrentPath', to.fullPath);
    next();
  });

  router.afterEach((to, from) => {
    // eslint-disable-next-line no-console
    console.log(`[${appName}][router.afterEach]`, {
      from: formatRoute(from),
      to: formatRoute(to),
    });
  });
}
