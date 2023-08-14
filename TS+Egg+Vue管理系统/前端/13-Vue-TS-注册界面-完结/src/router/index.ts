import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
