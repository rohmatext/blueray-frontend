import Dashboard from '@/pages/Dashboard.vue';

export const UserRoutes = [
    {
        path: '/user',
        name: 'user',
        component: Dashboard,
        meta: { guard: 'auth', role: 'user' },
    },
    {
        path: '/user/orders',
        name: 'user.orders',
        component: Dashboard,
        meta: { guard: 'auth', role: 'user' },
    },
    {
        path: '/user/addresses',
        name: 'user.addresses',
        component: Dashboard,
        meta: { guard: 'auth', role: 'user' },
    },
];
