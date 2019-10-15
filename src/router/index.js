import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/authentication/Register.vue'
import Signin from '@/components/authentication/Signin.vue'
import HomeUser from '@/views/HomeUser.vue'
import Home from '@/views/Home.vue'
import Users from '@/components/user/Users.vue'
import DependencyRegister from '@/components/dependency/DependencyRegister.vue'
import Dependencies from '@/components/dependency/Dependencies.vue'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },

        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/homeUser',
            name: 'HomeUser',
            component: HomeUser
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        },
        {
            path: '/dependencyRegister',
            name: 'DependencyRegister',
            component: DependencyRegister
        },
        {
            path: '/dependencies',
            name: 'Dependencies',
            component: Dependencies
        }
    ]


});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = sessionStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})