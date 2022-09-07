import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 使用按需导入
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import plugins from '@/plugins'


// 全局前置守卫
router.beforeEach((to, from) => {
    
    // if(to.name == 'login' || to.query.name || from.query.name) {
    //     next()
    // } else {
    //     next({
    //         name: 'login'
    //     })
    // }
})

router.beforeResolve((to, from) => {
    // console.log(to, from)
})

createApp(App)
    .use(store)
    .use(router)
    .use(plugins)
    .mount('#app')
