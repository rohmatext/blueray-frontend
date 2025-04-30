import About from '@/pages/About.vue';
import Login from '@/pages/auth/Login.vue';
import Register from '@/pages/auth/Register.vue';
import Dashboard from '@/pages/Dashboard.vue';
import NotFound from '@/pages/NotFound.vue';

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
        meta: { guard: 'guest' },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { guard: 'guest' },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { guard: 'auth' },
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: { guard: 'auth' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];

export default routes;
