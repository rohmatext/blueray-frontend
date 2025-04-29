import About from '@/pages/About.vue';
import Login from '@/pages/Auth/Login.vue';
import Register from '@/pages/Auth/Register.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // // Add your authentication logic here
    // const isAuthenticated = true; // Replace with actual authentication check
    // if (to.meta.requiresAuth && !isAuthenticated) {
    //     next({ name: 'home' });
    // } else {
    //     next();
    // }
    next();
});

router.beforeEach((to, from, next) => {
    next();
});
export default router;
