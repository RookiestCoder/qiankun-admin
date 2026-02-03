import '@/public-path';
import '@/global.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { memoryRouter, router } from '@/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/stores/store';
import type { User } from '@/stores/userSlice';
import { setUser } from '@/stores/userSlice';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { ConfigProvider, Spin } from 'antd';

interface Prop {
  container?: HTMLElement;
  path?: string;
}

let root: null | ReactDOM.Root = null;

function render(props?: Prop) {
  let container: null | HTMLElement = null;
  if (props && props.container) {
    container = props.container;
  }

  let appContainer = (
    container
      ? container.querySelector('#child-vite-react')
      : document.getElementById('child-vite-react')
  ) as HTMLElement;

  // 确保容器高度为 100%
  if (appContainer) {
    appContainer.style.width = '100%';
    appContainer.style.height = '100%';
  }

  // 判断是否在 qiankun 环境中
  const isQiankun = qiankunWindow.__POWERED_BY_QIANKUN__;
  const routerInstance = isQiankun ? memoryRouter : router;

  root = ReactDOM.createRoot(appContainer);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider
          prefixCls="arv4"
          getPopupContainer={node => {
            if (node) {
              return node.parentNode as HTMLElement;
            }
            return appContainer;
          }}
        >
          <Suspense
            fallback={
              <Spin>
                <div style={{ width: '100%', height: '200px' }}></div>
              </Spin>
            }
          >
            <RouterProvider router={routerInstance} />
          </Suspense>
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  );

  // 在 qiankun 环境下，监听路由变化
  if (isQiankun) {
    // 初始化路由
    const initialPath = window.location.pathname.replace('/child-vite-react', '') || '/';
    console.log('Initial path:', initialPath);
    memoryRouter.navigate(initialPath);

    // 监听 popstate 事件（浏览器前进后退）
    const handlePopState = () => {
      const path = window.location.pathname.replace('/child-vite-react', '') || '/';
      console.log('PopState - Navigating to:', path);
      memoryRouter.navigate(path);
    };
    window.addEventListener('popstate', handlePopState);

    // 保存清理函数
    (window as any).__SUB_REACT_CLEANUP__ = () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}

function changeUserListener(e: Event) {
  store.dispatch(dispatch => {
    dispatch(setUser((e as CustomEvent<User>).detail));
  });
}

renderWithQiankun({
  mount: async (props: Prop) => {
    console.log('qiankun mount with props:', props);
    render(props);
    qiankunWindow.addEventListener('changeUser', changeUserListener);
  },
  bootstrap() {
    console.log('qiankun bootstrap');
  },
  unmount: async () => {
    console.log('qiankun unmount');
    root && root.unmount();
    qiankunWindow.removeEventListener('changeUser', changeUserListener);

    // 清理事件监听
    if ((window as any).__SUB_REACT_CLEANUP__) {
      (window as any).__SUB_REACT_CLEANUP__();
      delete (window as any).__SUB_REACT_CLEANUP__;
    }
  },
  update(props: Prop) {
    console.log('qiankun update with props:', props);
  },
});
