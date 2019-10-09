import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/authentication/Register.vue'
import Signin from '@/components/authentication/Signin.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Signin',
            component: Signin
          }
    ]
})