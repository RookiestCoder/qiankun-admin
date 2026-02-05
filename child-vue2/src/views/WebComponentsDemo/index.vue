<template>
  <div class="vue-button-demo">
    <el-card class="demo-card">
      <div slot="header">
        <span>Web Components 按钮组件示例</span>
      </div>

      <!-- 基础用法 -->
      <el-card class="section-card" shadow="never">
        <div slot="header">
          <span>基础用法</span>
        </div>
        <div class="button-group">
          <qk-button>默认按钮</qk-button>
          <qk-button type="primary">主要按钮</qk-button>
          <qk-button type="success">成功按钮</qk-button>
          <qk-button type="warning">警告按钮</qk-button>
          <qk-button type="danger">危险按钮</qk-button>
          <qk-button type="info">信息按钮</qk-button>
        </div>
      </el-card>

      <!-- 不同尺寸 -->
      <el-card class="section-card" shadow="never" style="margin-top: 20px">
        <div slot="header">
          <span>不同尺寸</span>
        </div>
        <div class="button-group">
          <qk-button size="small">小按钮</qk-button>
          <qk-button size="medium">中等按钮</qk-button>
          <qk-button size="large">大按钮</qk-button>
        </div>
      </el-card>

      <!-- 禁用状态 -->
      <el-card class="section-card" shadow="never" style="margin-top: 20px">
        <div slot="header">
          <span>禁用状态</span>
        </div>
        <div class="button-group">
          <qk-button disabled>禁用按钮</qk-button>
          <qk-button type="primary" disabled>禁用主要按钮</qk-button>
        </div>
      </el-card>

      <!-- 加载状态 -->
      <el-card class="section-card" shadow="never" style="margin-top: 20px">
        <div slot="header">
          <span>加载状态</span>
        </div>
        <div class="button-group">
          <qk-button :loading="loading1" @click="handleLoading1">点击加载</qk-button>
          <qk-button type="primary" :loading="loading2" @click="handleLoading2">点击加载</qk-button>
        </div>
      </el-card>

      <!-- 事件监听 -->
      <el-card class="section-card" shadow="never" style="margin-top: 20px">
        <div slot="header">
          <span>事件监听</span>
        </div>
        <div class="button-group">
          <qk-button type="primary" @click="handleClick">点击我</qk-button>
          <qk-button type="success" @click="handleClick">点击我</qk-button>
        </div>
        <p v-if="clickMessage" class="result-text">{{ clickMessage }}</p>
      </el-card>

      <!-- 自定义元素状态检查 -->
      <el-card class="section-card" shadow="never" style="margin-top: 20px">
        <div slot="header">
          <span>自定义元素状态检查</span>
        </div>
        <div class="status-content">
          <el-alert
            :title="customElementStatus.title"
            :type="customElementStatus.type"
            :closable="false"
            style="margin-bottom: 12px"
          />
          <div class="status-info">
            <p>
              <strong>自定义元素已定义：</strong>{{ isCustomElementDefined ? '✅ 是' : '❌ 否' }}
            </p>
            <p><strong>元素标签名：</strong><code>qk-button</code></p>
            <p><strong>元素构造函数：</strong>{{ customElementConstructor || '未定义' }}</p>
            <p><strong>Shadow DOM：</strong>{{ hasShadowRoot ? '✅ 是' : '❌ 否' }}</p>
            <p><strong>样式已加载：</strong>{{ stylesLoaded ? '✅ 是' : '❌ 否' }}</p>
          </div>
          <el-button
            @click="checkCustomElement"
            type="primary"
            size="small"
            style="margin-top: 12px"
          >
            重新检查
          </el-button>
        </div>
      </el-card>

      <!-- 使用说明 -->
      <el-card class="section-card" shadow="never" style="margin-top: 20px">
        <div slot="header">
          <span>使用说明</span>
        </div>
        <div class="usage-content">
          <h4>1. 导入并注册组件：</h4>
          <pre class="code-block">{{ usageCode1 }}</pre>

          <h4 style="margin-top: 20px">2. 在模板中使用：</h4>
          <pre class="code-block">{{ usageCode2 }}</pre>

          <h4 style="margin-top: 20px">3. 支持的属性：</h4>
          <ul>
            <li>
              <code>type</code>: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
              (默认: 'default')
            </li>
            <li><code>size</code>: 'small' | 'medium' | 'large' (默认: 'medium')</li>
            <li><code>disabled</code>: boolean (默认: false)</li>
            <li><code>loading</code>: boolean (默认: false)</li>
          </ul>

          <h4 style="margin-top: 20px">4. 事件：</h4>
          <ul>
            <li><code>@click</code>: 点击事件</li>
          </ul>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
// 注意：组件已在 main.js 中全局注册，这里不需要再次导入和注册
// 如果需要在组件中单独注册，可以在 mounted 中延迟加载：
// mounted() {
//   // 延迟加载，避免循环依赖
//   this.$nextTick(() => {
//     const { registerButton } = require('@qiankun-admin/ui')
//     registerButton('qk-button')
//   })
// }

export default {
  name: 'WebComponentsDemo',
  data() {
    return {
      loading1: false,
      loading2: false,
      clickMessage: '',
      isCustomElementDefined: false,
      customElementConstructor: null,
      hasShadowRoot: false,
      stylesLoaded: false,
      customElementStatus: {
        title: '正在检查...',
        type: 'info',
      },
      usageCode1: `// 方式1：在 main.js 中全局注册（推荐）
const { registerButton } = require('@qiankun-admin/ui')
registerButton('qk-button')

// 方式2：在组件中注册
// const { registerButton } = require('@qiankun-admin/ui')
// registerButton('qk-button')`,
      usageCode2: `<template>
  <qk-button type="primary" size="medium" @click="handleClick">
    按钮文本
  </qk-button>
</template>`,
    };
  },
  mounted() {
    // 延迟检查，确保 DOM 已渲染
    this.$nextTick(() => {
      this.checkCustomElement();
    });
  },
  methods: {
    handleClick(event) {
      this.clickMessage = `按钮被点击了！时间: ${new Date().toLocaleTimeString()}`;
      console.log('按钮被点击了', event);
    },
    handleLoading1() {
      this.loading1 = true;
      setTimeout(() => {
        this.loading1 = false;
      }, 2000);
    },
    handleLoading2() {
      this.loading2 = true;
      setTimeout(() => {
        this.loading2 = false;
      }, 2000);
    },
    /**
     * @desc 检查自定义元素是否加载成功
     */
    checkCustomElement() {
      const elementName = 'qk-button';

      // 1. 检查自定义元素是否已定义
      this.isCustomElementDefined = customElements.get(elementName) !== undefined;

      // 2. 获取自定义元素的构造函数
      const constructor = customElements.get(elementName);
      this.customElementConstructor = constructor ? constructor.name : null;

      // 3. 检查页面中是否有该元素，以及是否有 Shadow DOM
      const buttonElement = this.$el.querySelector(elementName);
      if (buttonElement) {
        this.hasShadowRoot = buttonElement.shadowRoot !== null;

        // 检查 Shadow DOM 中的样式
        let shadowStyles = null;
        if (buttonElement.shadowRoot) {
          const styleElement = buttonElement.shadowRoot.querySelector('style');
          shadowStyles = styleElement ? styleElement.textContent : null;
        }

        // 检查样式是否加载（检查 Shadow DOM 内部的实际按钮元素）
        let actualButton = buttonElement;
        if (buttonElement.shadowRoot) {
          actualButton = buttonElement.shadowRoot.querySelector('button');
        }

        if (actualButton) {
          const computedStyle = window.getComputedStyle(actualButton);
          this.stylesLoaded =
            computedStyle.display === 'inline-flex' ||
            computedStyle.padding !== '0px' ||
            computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)';

          console.log('自定义元素检查结果：', {
            element: buttonElement,
            isDefined: this.isCustomElementDefined,
            constructor: this.customElementConstructor,
            hasShadowRoot: this.hasShadowRoot,
            shadowStyles: shadowStyles ? '已注入' : '未注入',
            actualButton: actualButton,
            styles: {
              display: computedStyle.display,
              padding: computedStyle.padding,
              backgroundColor: computedStyle.backgroundColor,
              color: computedStyle.color,
              border: computedStyle.border,
            },
          });
        } else {
          this.stylesLoaded = false;
          console.warn('Shadow DOM 中未找到 button 元素');
        }
      } else {
        this.hasShadowRoot = false;
        this.stylesLoaded = false;
        console.warn('未找到 qk-button 元素');
      }

      // 4. 更新状态提示
      if (this.isCustomElementDefined && buttonElement) {
        this.customElementStatus = {
          title: '✅ 自定义元素已成功加载！',
          type: 'success',
        };
      } else if (this.isCustomElementDefined) {
        this.customElementStatus = {
          title: '⚠️ 自定义元素已定义，但页面中未找到元素',
          type: 'warning',
        };
      } else {
        this.customElementStatus = {
          title: '❌ 自定义元素未定义，请检查 registerButton 是否已调用',
          type: 'error',
        };
      }
    },
  },
};
</script>

<style scoped lang="less">
.vue-button-demo {
  padding: 20px;

  .demo-card {
    margin-bottom: 20px;
  }

  .section-card {
    margin-top: 20px;

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }

    .result-text {
      margin-top: 12px;
      color: #67c23a;
      font-weight: 500;
    }

    .status-content {
      .status-info {
        p {
          margin: 8px 0;
          line-height: 1.8;
          code {
            background-color: #f5f7fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 13px;
            color: #e6a23c;
          }
        }
      }
    }

    .usage-content {
      h4 {
        margin-bottom: 12px;
        color: #303133;
      }

      .code-block {
        background-color: #f5f7fa;
        padding: 12px;
        border-radius: 4px;
        overflow-x: auto;
        font-size: 14px;
        line-height: 1.6;
        margin: 12px 0;
      }

      ul {
        margin-left: 20px;
        margin-top: 8px;

        li {
          margin-bottom: 8px;
          line-height: 1.8;

          code {
            background-color: #f5f7fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 13px;
            color: #e6a23c;
          }
        }
      }
    }
  }
}
</style>
