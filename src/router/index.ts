import {createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue'),
        children: [
            {
                path: 'blogs',
                name: 'blogs',
                meta: {
                    isShow: true,
                    title:"博客列表"
                },
                component: () => import('../views/bolgs.vue')
            },
            {
                path: 'forum',
                name: 'forum',
                meta: {
                    isShow: true,
                    title:"论坛列表"
                },
                component: () => import('../views/forum.vue')
            },
        ]
    }
]
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}
const router = createRouter(options)
export default router