<template>
  <div class="child-vue2-layoutcom-bread">
    <div class="bread-icon">
      <i class="el-icon-location-outline"></i>
    </div>
    <el-breadcrumb separator="/" class="custom-breadcrumb">
      <el-breadcrumb-item :to="item.path" v-for="(item, index) in breadTree" :key="index">
        {{ item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'child-vue2-layoutcom-breadcrumb',
  data() {
    return {};
  },
  computed: {
    // 面包屑数组
    ...mapState(['breadTree']), // 获取整个对象
    breadTree() {
      return this.$store.state.breadTree;
    },
  },
  watch: {
    breadTree: {
      handler(newVal, oldVal) {
        console.log('newValnewValnewVal', newVal);
      },
      deep: true,
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.child-vue2-layoutcom-bread {
  height: 100%;
  background: white;
  padding: 0 30px;
  display: flex;
  align-items: center;
  margin: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .bread-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;

    i {
      font-size: 18px;
      color: white;
    }
  }

  ::v-deep {
    .custom-breadcrumb {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: #606266;
          font-weight: 500;
          transition: all 0.3s ease;

          &:hover {
            color: #667eea;
          }

          &.is-link {
            color: #909399;

            &:hover {
              color: #667eea;
            }
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            color: #667eea;
            font-weight: 600;
          }
        }

        .el-breadcrumb__separator {
          color: #dcdfe6;
          margin: 0 12px;
        }
      }
    }
  }
}
</style>
