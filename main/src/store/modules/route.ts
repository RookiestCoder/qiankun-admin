import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { pinia } from "../index"

export const useRouteInfoStore = defineStore('routeInfo', () => {

    const currentSub = ref('sub-vue')
    const currentPath = ref('changeGlobalStore')

    function changePath(value1: string, value2: string) {
        currentSub.value = value1
        currentPath.value = value2
    }


    return {
        currentSub, currentPath, changePath
    }
})


// 非setup
export function useRouteInfoStoreHook() {
    return useRouteInfoStore(pinia);
}