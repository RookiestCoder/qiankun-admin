<template>
  <div class="child-vue2-layoutcom-menu">
    <div class="svlm-logo">
      <div class="logo-icon">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="logo-text">
        <div class="app-name">Child Vue2</div>
        <div class="app-version">v2.0</div>
      </div>
    </div>

    <el-menu
      :default-active="currentPath"
      class="custom-menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="#b8c7ce"
      active-text-color="#ffffff"
    >
      <el-menu-item
        v-for="(item, index) in routes"
        :key="index"
        @click="$router.push(item.path)"
        :index="item.path"
        class="menu-item"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>

    <div class="menu-footer">
      <div class="footer-info">
        <i class="el-icon-info"></i>
        <span>Qiankun 微前端</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'child-vue2-layoutcom-menu',
  data() {
    return {
      routes: [
        { name: 'Web Components 案例', path: '/web-components-demo', icon: 'el-icon-cpu' },
        { name: '修改全局参数', path: '/changeGlobalStore', icon: 'el-icon-edit' },
        { name: '跳转子应用', path: '/junpSubImp', icon: 'el-icon-position' },
        { name: 'About Vue', path: '/about', icon: 'el-icon-info' },
      ],
    };
  },
  computed: {
    ...mapState(['currentPath']),
    currentPath() {
      return this.$store.state.currentPath;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.child-vue2-layoutcom-menu {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  .svlm-logo {
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      animation: rotate 10s linear infinite;
    }

    .logo-icon {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      position: relative;
      z-index: 1;

      img {
        width: 32px;
        height: 32px;
        animation: float 3s ease-in-out infinite;
      }
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;

      .app-name {
        font-size: 22px;
        font-weight: 700;
        color: white;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .app-version {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 2px;
      }
    }
  }

  ::v-deep {
    .custom-menu {
      flex: 1;
      border: none;
      padding: 10px 0;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }

      .menu-item {
        margin: 5px 10px;
        border-radius: 8px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        i {
          font-size: 18px;
          margin-right: 10px;
          transition: all 0.3s ease;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);

          i {
            transform: scale(1.2);
          }
        }

        &.is-active {
          background: linear-gradient(
            90deg,
            rgba(102, 126, 234, 0.3) 0%,
            rgba(118, 75, 162, 0.3) 100%
          );
          color: white;
          font-weight: 600;

          &::before {
            transform: scaleY(1);
          }

          i {
            color: #667eea;
          }
        }
      }
    }
  }

  .menu-footer {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .footer-info {
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;

      i {
        margin-right: 8px;
        font-size: 14px;
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
