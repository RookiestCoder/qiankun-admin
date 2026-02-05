import { lazy } from 'react';
import { createHashRouter, createMemoryRouter, RouteObject } from 'react-router-dom';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import Layout from '@/layout';

const CommunicationTest = lazy(() => import('@/views/CommunicationTest'));
const NavigateView = lazy(() => import('@/views/NavigateView'));
const TabView = lazy(() => import('@/views/TabView'));
const WebComponentsDemo = lazy(() => import('@/views/WebComponentsDemo'));

// HashRouter 使用 basename，MemoryRouter 不需要（qiankun 会处理路径）
const hashBasename = '/';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <CommunicationTest /> },
      {
        path: 'communication-test',
        element: <CommunicationTest />,
      },
      {
        path: 'navigate-view',
        element: <NavigateView />,
      },
      {
        path: 'tab-view',
        element: <TabView />,
      },
      {
        path: 'web-components-demo',
        element: <WebComponentsDemo />,
      },
    ],
  },
];

export const router = createHashRouter(routes, {
  basename: hashBasename,
});

export const memoryRouter = createMemoryRouter(routes, {
  initialEntries: ['/'],
  initialIndex: 0,
});
