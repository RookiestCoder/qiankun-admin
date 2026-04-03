import { globalState } from './src/qiankun/globalState';
import { pinia } from './src/store/index';
import { useUserStore } from './src/store/modules/user';

const microApps = [
  {
    name: 'child-vue2',
    displayName: 'Vue2 子应用',
    entry: process.env.VUE_APP_CHILD_VUE2 || process.env.VUE_APP_SUB_VUE,
    activeRule: '/child-vue2',
    icon: 'Vue.png',
    techStack: [
      { name: 'Vue', version: '2.6.14' },
      { name: 'Webpack', version: '5.x' },
      { name: 'JavaScript', version: 'ES6+' },
      { name: 'Element UI', version: '2.x' },
    ],
  },
  {
    name: 'child-vite-react',
    displayName: 'React 子应用',
    entry: process.env.VUE_APP_CHILD_VITE_REACT || process.env.VUE_APP_SUB_REACT,
    activeRule: '/child-vite-react',
    icon: 'React.png',
    techStack: [
      { name: 'React', version: '18.x' },
      { name: 'Vite', version: '5.x' },
      { name: 'TypeScript', version: '5.x' },
      { name: 'Ant Design', version: '5.x' },
    ],
  },
  {
    name: 'child-html',
    displayName: 'HTML 子应用',
    entry: process.env.VUE_APP_CHILD_HTML || process.env.VUE_APP_SUB_HTML,
    activeRule: '/child-html',
    icon: 'html.png',
    techStack: [
      { name: 'HTML5', version: '' },
      { name: 'CSS3', version: '' },
      { name: 'JavaScript', version: 'ES6+' },
      { name: 'Native', version: '' },
    ],
  },
];

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    // container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule,
      globalState: globalState,
      /** 子应用 mount 时调用，读取基座 Pinia 中最新的 token 与权限 */
      getMainAuth: () => {
        const user = useUserStore(pinia);
        return {
          token: user.token,
          permissions: [...user.permissions],
        };
      },
    },
  };
});

export default apps;
