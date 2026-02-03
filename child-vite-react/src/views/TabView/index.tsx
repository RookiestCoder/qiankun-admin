import Counter from '@/components/Counter';
import MessageTrigger from '@/components/MessageTrigger';
import { Input, Tabs, Card } from 'antd';
import { EditOutlined, MessageOutlined, NumberOutlined } from '@ant-design/icons';
import './index.less';

const items = [
  {
    label: (
      <span>
        <EditOutlined /> 输入框
      </span>
    ),
    key: '1',
    children: (
      <Card className="tab-card" bordered={false}>
        <div className="card-header">
          <EditOutlined className="card-icon" />
          <h3>输入框组件</h3>
        </div>
        <div className="card-content">
          <p className="card-desc">这是一个基础的输入框组件，支持各种输入操作。</p>
          <Input placeholder="请输入内容" size="large" />
        </div>
      </Card>
    ),
  },
  {
    label: (
      <span>
        <MessageOutlined /> 消息触发
      </span>
    ),
    key: '2',
    children: (
      <Card className="tab-card" bordered={false}>
        <div className="card-header">
          <MessageOutlined className="card-icon" />
          <h3>消息触发组件</h3>
        </div>
        <div className="card-content">
          <p className="card-desc">用于触发和测试消息通信功能。</p>
          <MessageTrigger />
        </div>
      </Card>
    ),
  },
  {
    label: (
      <span>
        <NumberOutlined /> 计数器
      </span>
    ),
    key: '3',
    children: (
      <Card className="tab-card" bordered={false}>
        <div className="card-header">
          <NumberOutlined className="card-icon" />
          <h3>计数器组件</h3>
        </div>
        <div className="card-content">
          <p className="card-desc">一个简单的计数器组件，演示状态管理。</p>
          <Counter />
        </div>
      </Card>
    ),
  },
];

export default function TabView() {
  return (
    <div className="tab-view-container">
      <div className="page-header">
        <h2 className="page-title">Tab 视图</h2>
        <p className="page-subtitle">展示不同的组件功能</p>
      </div>
      <Tabs items={items} className="custom-tabs" />
    </div>
  );
}
