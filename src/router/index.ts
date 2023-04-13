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
        redirect:"index/blogs",
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
            {
                path: 'blogeditor',
                name: 'blogeditor',
                meta: {
                    isShow: true,
                    title:"博客编辑"
                },
                component: () => import('../views/blogEditor.vue')
            },
        ]
    }
]
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}
const router = createRouter(options)
router.beforeEach((to, from, next)=>{
    const uid: string | null = localStorage.getItem('uid')
    if (!uid&&to.path!=='/'){
        next('/')
    }else {
        next()
    }
})
export default router