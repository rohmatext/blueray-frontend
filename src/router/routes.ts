import Login from '@/pages/auth/Login.vue';
import Register from '@/pages/auth/Register.vue';
import Dashboard from '@/pages/Dashboard.vue';
import NotFound from '@/pages/NotFound.vue';
import { AdminRoutes } from './admin';
import { UserRoutes } from './user';

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
    ...UserRoutes,
    ...AdminRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];

export default routes;
