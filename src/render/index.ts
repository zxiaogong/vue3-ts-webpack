import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import * as Icons from "@element-plus/icons-vue";
import App from './App'
import router from '@router/router'
import store from '@store/main'
import 'element-plus/dist/index.css'
import '@theme/theme.less'
import '@theme/bootstrap/css/bootstrap.css'
//动态修改title
import VueWechatTitle from 'vue-wechat-title'

const app = createApp(App).use(VueWechatTitle).use(store).use(router).use(ElementPlus)

// 注册element-icon全局组件
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
});


app.mount('#app')