import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {pinia} from "../index"
export const useUserStore = defineStore('userInfo', () => {
  const  name= ref('张三')

  function changeName(value: string) {
    name.value=value
  }
  return { name,changeName}
})


// 非setup
export function useUserStoreHook() {
  return useUserStore(pinia);
}