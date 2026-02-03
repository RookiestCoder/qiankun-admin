import { Alert, Divider, Space, Typography } from 'antd';
import UserInfo from '@/components/UserInfo';
import MessageTrigger from '@/components/MessageTrigger';
import Counter from '@/components/Counter';
import { InfoCircleOutlined, MessageOutlined, NumberOutlined } from '@ant-design/icons';
import './index.less';

export default function CommunicationTest() {
  return (
    <div className="communication-test-page">
      <div className="page-header">
        <div className="header-icon">
          <MessageOutlined />
        </div>
        <div className="header-content">
          <h2>通信测试</h2>
          <p>Qiankun 微前端应用间通信示例</p>
        </div>
      </div>

      <div className="content-wrapper">
        <Alert
          message={
            <div className="alert-content">
              <InfoCircleOutlined style={{ marginRight: 8 }} />
              <span>
                qiankun官方并未对vite子应用进行支持，但qiankun3有支持vite的计划。该示例依靠社区的
                <a
                  href="https://github.com/tengmaoqing/vite-plugin-qiankun"
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: 4 }}
                >
                  vite-plugin-qiankun
                </a>
                实现。
              </span>
            </div>
          }
          type="info"
          showIcon={false}
          className="custom-alert"
        />

        <div className="section-card">
          <div className="section-header">
            <div className="section-icon">👤</div>
            <Typography.Title level={3}>用户信息</Typography.Title>
          </div>
          <UserInfo />
        </div>

        <div className="section-card">
          <div className="section-header">
            <div className="section-icon">💬</div>
            <Typography.Title level={3}>子应用向主应用通信</Typography.Title>
          </div>
          <MessageTrigger />
        </div>

        <div className="section-card">
          <div className="section-header">
            <div className="section-icon">🔢</div>
            <Typography.Title level={3}>计数器</Typography.Title>
          </div>
          <Counter />
        </div>
      </div>
    </div>
  );
}
