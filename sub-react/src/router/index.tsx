import { BrowserRouter } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

type AppRouterProps = PropsWithChildren;

const basename = (window as Window & { __POWERED_BY_QIANKUN__?: boolean }).__POWERED_BY_QIANKUN__
  ? '/app-react'
  : '/';

export function AppRouter({ children }: AppRouterProps) {
  return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
}
