
import { createRouter, RouteRecordRaw, createWebHistory,createWebHashHistory } from 'vue-router'
/**声明数据类型 */

const routers: RouteRecordRaw[] = [
    {
        name: '',
        path: '/',
        meta: {
            title: "首页"
        },
        component: () => import('../page/home/index.vue')
    },
    {
        name: 'home',
        path: '/home',
        meta: {
            title: "首页"
        },
        component: () => import('../page/home/index.vue')
    }
];



const router = createRouter({
    history: createWebHistory(),     //路由模式
    routes: routers,
})

export default router

