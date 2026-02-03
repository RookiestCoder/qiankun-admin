import { Button, Space } from 'antd';
import { CompassOutlined, HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import './index.less';

export default function NavigateView() {
  const handleClick = ({ url }: { url: string }) => {
    console.log(window.location.pathname + url);
    window.history.pushState({}, '', window.location.pathname + url);
  };

  const buttons = [
    {
      url: '#/main/communication-test',
      label: '跳转至主应用',
      icon: <HomeOutlined />,
    },
    {
      url: '#/child-vue2/communication-test',
      label: '跳转至 Vue2 子应用',
      icon: <AppstoreOutlined />,
    },
    {
      url: '#/child-vite-react/communication-test',
      label: '跳转至 React 子应用',
      icon: <AppstoreOutlined />,
    },
  ];

  return (
    <div className="navigate-view-page">
      <div className="page-header">
        <div className="header-icon">
          <CompassOutlined />
        </div>
        <div className="header-content">
          <h2>路由跳转</h2>
          <p>子应用内控制跨应用路由跳转</p>
        </div>
      </div>

      <div className="content-card">
        <div className="card-title">
          <span className="title-icon">🚀</span>
          <span>快速导航</span>
        </div>

        <div className="button-grid">
          {buttons.map(item => (
            <Button
              key={item.url}
              type="primary"
              size="large"
              icon={item.icon}
              onClick={() => handleClick(item)}
              className="nav-button"
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="info-box">
          <div className="info-icon">💡</div>
          <div className="info-text">
            <strong>提示：</strong>
            点击按钮可以在不同的微前端应用之间进行跳转，体验无缝的应用切换。
          </div>
        </div>
      </div>
    </div>
  );
}
