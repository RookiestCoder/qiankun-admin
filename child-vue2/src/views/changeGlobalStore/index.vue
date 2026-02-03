<template>
  <div class="subvue-changeGlobalStore">
    <div class="page-header">
      <div class="header-icon">
        <i class="el-icon-edit"></i>
      </div>
      <div class="header-content">
        <h2>修改全局参数</h2>
        <p>通过 Qiankun 全局状态管理修改用户信息</p>
      </div>
    </div>

    <div class="content-card">
      <div class="card-title">
        <i class="el-icon-user"></i>
        <span>用户信息设置</span>
      </div>

      <div class="form-section">
        <div class="form-label">
          <i class="el-icon-edit-outline"></i>
          <span>用户姓名</span>
        </div>
        <el-input v-model="input" placeholder="请输入用户姓名" class="custom-input" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>

        <div class="form-hint">
          <i class="el-icon-info"></i>
          <span>修改后将同步到主应用和其他子应用</span>
        </div>
      </div>

      <div class="action-buttons">
        <el-button type="primary" @click="handleSubmit" class="submit-btn" icon="el-icon-check">
          提交修改
        </el-button>
        <el-button @click="handleReset" class="reset-btn" icon="el-icon-refresh"> 重置 </el-button>
      </div>
    </div>

    <div class="info-card">
      <div class="info-header">
        <i class="el-icon-info"></i>
        <span>功能说明</span>
      </div>
      <div class="info-content">
        <div class="info-item">
          <i class="el-icon-success"></i>
          <span>支持跨应用状态同步</span>
        </div>
        <div class="info-item">
          <i class="el-icon-success"></i>
          <span>实时更新所有子应用</span>
        </div>
        <div class="info-item">
          <i class="el-icon-success"></i>
          <span>基于 Qiankun 全局状态管理</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'subvue-changeGlobalStore',
  data() {
    return {
      input: '',
    };
  },
  methods: {
    handleSubmit() {
      if (!this.input.trim()) {
        this.$message.warning('请输入用户姓名');
        return;
      }

      this.$setGlobalState({ userInfo: { name: this.input } });
      this.$message.success('修改成功！全局状态已更新');
    },
    handleReset() {
      this.input = '';
      this.$message.info('已重置');
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.subvue-changeGlobalStore {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;

  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 25px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    color: white;

    .header-icon {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      backdrop-filter: blur(10px);

      i {
        font-size: 28px;
      }
    }

    .header-content {
      h2 {
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 600;
      }

      p {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
      }
    }
  }

  .content-card {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    }

    .card-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f0f0;

      i {
        font-size: 20px;
        margin-right: 10px;
        color: #667eea;
      }
    }

    .form-section {
      .form-label {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 500;
        color: #606266;

        i {
          margin-right: 6px;
          color: #667eea;
        }
      }

      ::v-deep {
        .custom-input {
          .el-input__inner {
            height: 48px;
            line-height: 48px;
            border-radius: 8px;
            border: 2px solid #e4e7ed;
            transition: all 0.3s ease;

            &:focus {
              border-color: #667eea;
              box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
          }
        }
      }

      .form-hint {
        display: flex;
        align-items: center;
        margin-top: 12px;
        padding: 10px 15px;
        background: #f4f4f5;
        border-radius: 8px;
        font-size: 13px;
        color: #909399;

        i {
          margin-right: 8px;
          color: #667eea;
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 15px;
      margin-top: 30px;

      ::v-deep {
        .el-button {
          height: 44px;
          padding: 0 30px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.3s ease;

          &.submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }

            &:active {
              transform: translateY(0);
            }
          }

          &.reset-btn {
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
          }
        }
      }
    }
  }

  .info-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    .info-header {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 20px;

      i {
        font-size: 18px;
        margin-right: 8px;
        color: #667eea;
      }
    }

    .info-content {
      .info-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        font-size: 14px;
        color: #606266;

        i {
          font-size: 16px;
          margin-right: 10px;
          color: #67c23a;
        }

        &:not(:last-child) {
          border-bottom: 1px solid #f0f0f0;
        }
      }
    }
  }
}
</style>
