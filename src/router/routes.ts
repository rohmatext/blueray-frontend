import Login from '@/pages/auth/Login.vue';
import Register from '@/pages/auth/Register.vue';
import Dashboard from '@/pages/Dashboard.vue';
import NotFound from '@/pages/NotFound.vue';
import UpdatePassword from '@/pages/setttings/UpdatePassword.vue';
import UpdateProfile from '@/pages/setttings/UpdateProfile.vue';
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
        path: '/settings/account',
        name: 'settings.account',
        component: UpdateProfile,
        meta: { guard: 'auth' },
    },
    {
        path: '/settings/password',
        name: 'settings.password',
        component: UpdatePassword,
        meta: { guard: 'auth' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];

export default routes;
