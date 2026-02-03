import { Breadcrumb as AntBreadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';
import './Breadcrumb.less';

const routeMap: Record<string, string> = {
  '/': '首页',
  '/communication-test': '通信测试',
  '/navigate-view': '路由跳转',
  '/tab-view': 'Tab 视图',
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbItems = [
    {
      title: <Link to="/">首页</Link>,
    },
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const isLast = index === pathSnippets.length - 1;
      return {
        title: isLast ? routeMap[url] || url : <Link to={url}>{routeMap[url] || url}</Link>,
      };
    }),
  ];

  return (
    <div className="child-vite-react-breadcrumb">
      <div className="bread-icon">
        <EnvironmentOutlined />
      </div>
      <AntBreadcrumb items={breadcrumbItems} />
    </div>
  );
}
