import { initGlobalState } from "qiankun";
import { useUserStoreHook, useRouteInfoStoreHook } from "../store/index";
const userStore = useUserStoreHook()
const routeInfo = useRouteInfoStoreHook()


export const globalState = {
    //用户信息
    userInfo: { name: '张三' },
    //路由信息
    routeInfo:{currentSub:'sub-vue',currentPath:'changeGlobalStore'},
    //全局配置
    globalSettings: {},
    time: '',
}

// 初始化全局下发的数据
export const qiankunActions = initGlobalState(globalState);

qiankunActions.onGlobalStateChange((state, prev) => {
    for (const key in state) {
        if (key == 'userInfo') {
            // useUserStore.commit('changeName',state[key])
            userStore.changeName(state[key].name)
        }
        if (key == 'routeInfo') {
            routeInfo.changePath(state[key].currentSub, state[key].currentPath)
        }
    }
})




