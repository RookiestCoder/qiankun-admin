import { useState, useEffect, useRef } from 'react';
import { Card, Alert, Button, Space, Typography } from 'antd';
import { CodeOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Paragraph, Text } = Typography;

interface CustomElementStatus {
  title: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export default function WebComponentsDemo() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [clickMessage, setClickMessage] = useState('');
  const [isCustomElementDefined, setIsCustomElementDefined] = useState(false);
  const [customElementConstructor, setCustomElementConstructor] = useState<string | null>(null);
  const [hasShadowRoot, setHasShadowRoot] = useState(false);
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const [customElementStatus, setCustomElementStatus] = useState<CustomElementStatus>({
    title: '正在检查...',
    type: 'info',
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 延迟检查，确保 DOM 已渲染
    setTimeout(() => {
      checkCustomElement();
    }, 100);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setClickMessage(`按钮被点击了！时间: ${new Date().toLocaleTimeString()}`);
    console.log('按钮被点击了', event);
  };

  const handleLoading1 = () => {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };

  const handleLoading2 = () => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };

  /**
   * 检查自定义元素是否加载成功
   */
  const checkCustomElement = () => {
    const elementName = 'qk-button';

    // 1. 检查自定义元素是否已定义
    const isDefined = customElements.get(elementName) !== undefined;
    setIsCustomElementDefined(isDefined);

    // 2. 获取自定义元素的构造函数
    const constructor = customElements.get(elementName);
    setCustomElementConstructor(constructor ? constructor.name : null);

    // 3. 检查页面中是否有该元素，以及是否有 Shadow DOM
    if (containerRef.current) {
      const buttonElement = containerRef.current.querySelector(elementName) as HTMLElement;
      if (buttonElement) {
        const hasShadow = buttonElement.shadowRoot !== null;
        setHasShadowRoot(hasShadow);

        // 检查 Shadow DOM 中的样式
        if (buttonElement.shadowRoot) {
          const styleElement = buttonElement.shadowRoot.querySelector('style');
          const hasStyles =
            styleElement !== null && styleElement.textContent?.includes('.qk-button');
          setStylesLoaded(hasStyles);

          // 检查 Shadow DOM 内部的实际按钮元素
          const actualButton = buttonElement.shadowRoot.querySelector('button');
          if (actualButton) {
            const computedStyle = window.getComputedStyle(actualButton);
            const stylesOk =
              computedStyle.display === 'inline-flex' ||
              computedStyle.padding !== '0px' ||
              computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)';

            setStylesLoaded(hasStyles || stylesOk);

            console.log('自定义元素检查结果：', {
              element: buttonElement,
              isDefined,
              constructor: constructor?.name,
              hasShadowRoot: hasShadow,
              stylesLoaded: hasStyles || stylesOk,
              computedStyle: {
                display: computedStyle.display,
                padding: computedStyle.padding,
                backgroundColor: computedStyle.backgroundColor,
              },
            });
          }
        } else {
          setStylesLoaded(false);
        }
      } else {
        setHasShadowRoot(false);
        setStylesLoaded(false);
        console.warn('未找到 qk-button 元素');
      }

      // 4. 更新状态提示
      if (isDefined && buttonElement && hasShadowRoot && stylesLoaded) {
        setCustomElementStatus({
          title: '✅ 自定义元素已成功加载并应用样式！',
          type: 'success',
        });
      } else if (isDefined && buttonElement && hasShadowRoot) {
        setCustomElementStatus({
          title: '⚠️ 自定义元素已加载，但样式可能未完全生效。',
          type: 'warning',
        });
      } else if (isDefined) {
        setCustomElementStatus({
          title: '⚠️ 自定义元素已定义，但未在 DOM 中找到或无 Shadow DOM。',
          type: 'warning',
        });
      } else {
        setCustomElementStatus({
          title: '❌ 自定义元素未定义。',
          type: 'error',
        });
      }
    }
  };

  const usageCode1 = `// 在 main.tsx 中全局注册（推荐）
const { registerButton } = require('@qiankun-admin/ui')
registerButton('qk-button')

// 或在组件中注册
// import { registerButton } from '@qiankun-admin/ui'
// registerButton('qk-button')`;

  const usageCode2 = `// 在 JSX 中使用
<qk-button type="primary" size="medium" onClick={handleClick}>
  按钮文本
</qk-button>`;

  return (
    <div className="web-components-demo" ref={containerRef}>
      <Card className="demo-card">
        <div className="card-header">
          <CodeOutlined style={{ marginRight: 8 }} />
          <Title level={4} style={{ margin: 0 }}>
            Web Components 按钮组件示例
          </Title>
        </div>

        {/* 基础用法 */}
        <Card className="section-card" title="基础用法" size="small">
          <Space wrap>
            <qk-button>默认按钮</qk-button>
            <qk-button type="primary">主要按钮</qk-button>
            <qk-button type="success">成功按钮</qk-button>
            <qk-button type="warning">警告按钮</qk-button>
            <qk-button type="danger">危险按钮</qk-button>
            <qk-button type="info">信息按钮</qk-button>
          </Space>
        </Card>

        {/* 不同尺寸 */}
        <Card className="section-card" title="不同尺寸" size="small">
          <Space wrap>
            <qk-button size="small">小按钮</qk-button>
            <qk-button size="medium">中等按钮</qk-button>
            <qk-button size="large">大按钮</qk-button>
          </Space>
        </Card>

        {/* 禁用状态 */}
        <Card className="section-card" title="禁用状态" size="small">
          <Space wrap>
            <qk-button disabled>禁用按钮</qk-button>
            <qk-button type="primary" disabled>
              禁用主要按钮
            </qk-button>
          </Space>
        </Card>

        {/* 加载状态 */}
        <Card className="section-card" title="加载状态" size="small">
          <Space wrap>
            <qk-button loading={loading1} onClick={handleLoading1}>
              点击加载
            </qk-button>
            <qk-button type="primary" loading={loading2} onClick={handleLoading2}>
              点击加载
            </qk-button>
          </Space>
        </Card>

        {/* 事件监听 */}
        <Card className="section-card" title="事件监听" size="small">
          <Space wrap>
            <qk-button type="primary" onClick={handleClick}>
              点击我
            </qk-button>
            <qk-button type="success" onClick={handleClick}>
              点击我
            </qk-button>
          </Space>
          {clickMessage && (
            <Paragraph style={{ marginTop: 12, color: '#52c41a' }}>{clickMessage}</Paragraph>
          )}
        </Card>

        {/* 自定义元素状态检查 */}
        <Card className="section-card" title="自定义元素状态检查" size="small">
          <Alert
            message={customElementStatus.title}
            type={customElementStatus.type}
            showIcon
            style={{ marginBottom: 12 }}
          />
          <div className="status-info">
            <Paragraph>
              <Text strong>自定义元素已定义：</Text>
              {isCustomElementDefined ? (
                <Text style={{ color: '#52c41a' }}> ✅ 是</Text>
              ) : (
                <Text style={{ color: '#ff4d4f' }}> ❌ 否</Text>
              )}
            </Paragraph>
            <Paragraph>
              <Text strong>元素标签名：</Text>
              <Text code>qk-button</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>元素构造函数：</Text>
              <Text code>{customElementConstructor || '未定义'}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>Shadow DOM：</Text>
              {hasShadowRoot ? (
                <Text style={{ color: '#52c41a' }}> ✅ 是</Text>
              ) : (
                <Text style={{ color: '#ff4d4f' }}> ❌ 否</Text>
              )}
            </Paragraph>
            <Paragraph>
              <Text strong>样式已加载：</Text>
              {stylesLoaded ? (
                <Text style={{ color: '#52c41a' }}> ✅ 是</Text>
              ) : (
                <Text style={{ color: '#ff4d4f' }}> ❌ 否</Text>
              )}
            </Paragraph>
          </div>
          <Button
            type="primary"
            size="small"
            onClick={checkCustomElement}
            style={{ marginTop: 12 }}
          >
            重新检查
          </Button>
        </Card>

        {/* 使用说明 */}
        <Card className="section-card" title="使用说明" size="small">
          <div className="usage-content">
            <Title level={5}>1. 导入并注册组件：</Title>
            <pre className="code-block">{usageCode1}</pre>

            <Title level={5} style={{ marginTop: 20 }}>
              2. 在 JSX 中使用：
            </Title>
            <pre className="code-block">{usageCode2}</pre>

            <Title level={5} style={{ marginTop: 20 }}>
              3. 支持的属性：
            </Title>
            <ul>
              <li>
                <Text code>type</Text>: 'primary' | 'success' | 'warning' | 'danger' | 'info' |
                'default' (默认: 'default')
              </li>
              <li>
                <Text code>size</Text>: 'small' | 'medium' | 'large' (默认: 'medium')
              </li>
              <li>
                <Text code>disabled</Text>: boolean (默认: false)
              </li>
              <li>
                <Text code>loading</Text>: boolean (默认: false)
              </li>
            </ul>

            <Title level={5} style={{ marginTop: 20 }}>
              4. 事件：
            </Title>
            <ul>
              <li>
                <Text code>onClick</Text>: 点击事件
              </li>
            </ul>
          </div>
        </Card>
      </Card>
    </div>
  );
}
