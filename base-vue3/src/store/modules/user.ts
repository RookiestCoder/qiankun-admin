import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { pinia } from '../index';

export const useUserStore = defineStore('userInfo', () => {
  const name = ref('张三');
  /** 模拟登录后由后端下发的访问令牌 */
  const token = ref('');
  /** 模拟登录后由后端下发的权限标识列表 */
  const permissions = ref<string[]>([]);

  function changeName(value: string) {
    name.value = value;
  }

  function setLoginState(payload: { token: string; permissions: string[]; displayName?: string }) {
    token.value = payload.token;
    permissions.value = payload.permissions;
    if (payload.displayName != null && payload.displayName !== '') {
      name.value = payload.displayName;
    }
  }

  function clearAuth() {
    token.value = '';
    permissions.value = [];
  }

  return { name, token, permissions, changeName, setLoginState, clearAuth };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(pinia);
}
