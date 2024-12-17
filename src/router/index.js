/*
 * @Author: kexiao 3493821365@qq.com
 * @Date: 2024-08-04 12:21:54
 * @LastEditors: kexiao 3493821365@qq.com
 * @LastEditTime: 2024-11-02 16:05:15
 * @FilePath: /tradingview-vue/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
            name: 'home',
            title: '2.0模版',
            requireLogin: false,
        },
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/Test.vue'),
        meta: {
            name: 'test',
            title: '2.0模版',
            requireLogin: false,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: {
            name: 'login',
            title: '2.0模版',
            requireLogin: false,
        },
    },
    {
        path: '/order-list',
        name: 'order-list',
        component: () => import('../views/Order.vue'),
        meta: {
            name: 'order',
            title: '2.0模版',
            requireLogin: false,
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/settings/index.vue'),
        meta: {
            name: 'settings',
            title: '2.0模版',
            requireLogin: false,
        },
    },
    {
        path: '/trading',
        name: '量化交易服务',
        component: () => import('../views/services/trading/index.vue'),
        meta: {
            name: 'trading',
            title: '2.0模版',
            requireLogin: false,
        },
    },
    {
        path: '/platform',
        name: '平台服务',
        component: () => import('../views/services/platform/index.vue'),
        meta: {
            name: 'platform',
            title: '2.0模版',
            requireLogin: false,
        },
    },
    {
        path: '/collector',
        name: 'collector',
        component: () => import('../views/services/collector/index.vue'),
        meta: {
            name: 'collector',
            title: '2.0模版',
            requireLogin: false,
        },
    },
]

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL, //默认值: "/" , 应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/" https://router.vuejs.org/zh/api/#base
    routes,
})

//路由守卫
// router.beforeEach((to, from, next) => {
//      // 进度条
//      NProgress.start() // 显示进度条
//      NProgress.set(0.4) // 设置百分比
//      NProgress.inc() // 稍微增加

//     if (to.matched.some(record => record.meta.requireLogin)) {
//         if (!to.meta.requireLogin) {
//             next();
//         } else {
//             let token = localStorage.getItem('token');
//             if (!token) {
//                 next({ path: '/login', query: { redirect: to.fullPath } });
//             } else {
//                 next();
//             }
//         }
//     } else {
//         next()
//     }

// })
// router.afterEach(() => {
//     NProgress.done();//完成进度(进度条消失)
// });

export default router
