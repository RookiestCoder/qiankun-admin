import {globalState} from "./src/qiankun/globalState"


const microApps = [
    {
        name: 'sub-vue',
        entry: process.env.VUE_APP_SUB_VUE,
        activeRule: '/sub-vue',
        icon: 'Vue.png'
    },
    {
        name: 'sub-react',
        entry: process.env.VUE_APP_SUB_REACT,
        activeRule: '/sub-react',
        icon: 'React.png'

    },
    {
        name: 'sub-html',
        entry: process.env.VUE_APP_SUB_HTML,
        activeRule: '/sub-html',
        icon: 'html.png'
    }
]

const apps = microApps.map(item => {
    return {
        ...item,
        container: '#subapp-viewport', // 子应用挂载的div
        // container: '#subapp-viewport', // 子应用挂载的div
        props: {
            routerBase: item.activeRule, // 下发基础路由
            globalState:globalState,    //全局数据
        }
    }
})



export default apps
