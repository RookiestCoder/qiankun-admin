import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppRouter } from './router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let root: Root | null = null;

type RenderProps = {
  container?: HTMLElement;
};

function render(props: RenderProps) {
  const { container } = props;
  const dom = (container || document).querySelector('#sub-react');

  if (!dom) return;

  root = createRoot(dom as HTMLElement);

  root.render(
    <StrictMode>
      <AppRouter>
        <App />
      </AppRouter>
    </StrictMode>
  );
}

// if (!(window as Window & { __POWERED_BY_QIANKUN__?: boolean }).__POWERED_BY_QIANKUN__) {
//   render({});
// }

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

renderWithQiankun({
  mount: async (props: RenderProps) => {
    render(props);
    // qiankunWindow.addEventListener('changeUser', changeUserListener)
  },
  bootstrap() {},
  unmount: async () => {
    root && root.unmount();
    // qiankunWindow.removeEventListener('changeUser', changeUserListener)
  },
  update() {},
});

// async function bootstrap() {
//   // NOTE 子应用初始化，只会执行一次
//   console.log('[sub-react] react app bootstraped');
// }

// async function mount(props: RenderProps) {
//   console.log('[sub-react] props from main framework', props);
//   render(props);
// }

// async function unmount(props: RenderProps) {
//   const { container } = props;
//   const dom = (container || document).querySelector('#root');

//   if (root) {
//     root.unmount();
//     root = null;
//   }

//   if (dom) {
//     dom.innerHTML = '';
//   }
// }

// (
//   window as Window & {
//     ['sub-react']?: {
//       bootstrap: () => Promise<void>;
//       mount: (p: RenderProps) => Promise<void>;
//       unmount: (p: RenderProps) => Promise<void>;
//     };
//   }
// )['sub-react'] = {
//   bootstrap,
//   mount,
//   unmount,
// };
