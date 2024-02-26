<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-card class="lc-card">
      <div class="lcc-text">
        <h2>qiankun(Vue3基座)</h2>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="loginRules"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <div class="lf-item">
            <el-input
              ref="username"
              v-model="loginData.username"
              placeholder="用户名"
              name="username"
              size="large"
              class=""
              :prefix-icon="User"
            />
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <div class="lf-item">
            <el-input
              v-model="loginData.password"
              placeholder="密码"
              :type="passwordVisible === false ? 'password' : 'input'"
              name="password"
              @keyup.enter="handleLogin"
              size="large"
              :prefix-icon="Lock"
            >
              <template #suffix>
                <div
                  @click="passwordVisible = !passwordVisible"
                  style="cursor: pointer"
                >
                  <el-icon v-show="passwordVisible" class=""><Hide /></el-icon>
                  <el-icon v-show="!passwordVisible" class=""><View /></el-icon>
                </div>
              </template>
            </el-input>
          </div>
        </el-form-item>

        <!-- 登录按钮 -->
        <div class="lc-btn">
          <el-button
            type="primary"
            size="large"
            class=""
            @click.prevent="handleLogin"
            >登陆
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
  
  <script setup lang="ts">
import { User, View, Hide, Lock } from "@element-plus/icons-vue";
import { useSettingsStore, useUserStore } from "../../store/index";
import { computed, onMounted, ref } from "vue";
import router from "../../router";

// const userStore = useUserStore();
// const settingsStore = useSettingsStore();

const passwordVisible = ref(false); // 密码是否可见
const loginFormRef = ref(null); // 登录表单ref

const loginData = ref({
  username: "admin",
  password: "123456",
});

const loginRules = computed(() => {
  const prefix = "请输入";
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: `${prefix}用户名`,
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: any, callback: any) => {
          if (value.length < 6) {
            callback(new Error("The password can not be less than 6 digits"));
          } else {
            callback();
          }
        },
        message: `${prefix}密码`,
      },
    ],
  };
});

/**
 * 登录
 */
function handleLogin() {
  loginFormRef.value.validate((valid) => {
    if (valid) {
        history.pushState(null, '/', '/') // 没引入路由，所以不能用路由切换
        // router.push({ path: "/sub-vue/about" });
    }
  });
}

onMounted(() => {
});
</script>
  
  <style lang="less" scoped>
html.dark .login-container {
  background: url("@/assets/images/login-bg-dark.jpg") no-repeat center right;
}

.login-container {
  overflow-y: auto;
  background: url("@/assets/images/login-bg.jpg") no-repeat center right;
  width: 100%;
  height: 100%;
  .lc-card {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login-form {
      padding: 30px 10px;
      .lf-item {
        width: 100%;
      }
    }
    .lcc-text {
      text-align: center;
    }
    .lc-btn {
      margin-top: 30px;
      ::v-deep {
        .el-button--large {
          width: 100%;
        }
      }
    }
    .lc-tips {
      margin-top: 30px;
    }
  }
}
</style>
  