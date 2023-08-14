import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 添加路由守卫, 实现权限控制
router.beforeEach((to, from, next) => {
    // 1.如果访问的是注册或者登录, 那么就放行
    if(to.path === '/login' || to.path === '/register'){
        return next();
    }
    // 2.获取当前的登录状态
    const token = sessionStorage.getItem('token');
    // 3.如果访问的是其它路由地址, 那么就需要判断是否已经登录
    //   如果已经登录, 那么就放行, 如果没有登录, 那么就强制跳转到登录界面
    if(!token){
        return next('/login');
    }
    next();
})
export default router
