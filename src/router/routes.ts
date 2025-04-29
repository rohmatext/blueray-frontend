import About from '@/pages/About.vue';
import Login from '@/pages/Auth/Login.vue';
import Register from '@/pages/Auth/Register.vue';
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
