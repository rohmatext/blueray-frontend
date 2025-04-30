import Dashboard from '@/pages/Dashboard.vue';

export const AdminRoutes = [
    {
        path: '/admin',
        name: 'admin',
        component: Dashboard,
        meta: { guard: 'auth', role: 'admin' },
    },
    {
        path: '/admin/orders',
        name: 'admin.orders',
        component: Dashboard,
        meta: { guard: 'auth', role: 'admin' },
    },
    {
        path: '/admin/addresses',
        name: 'admin.addresses',
        component: Dashboard,
        meta: { guard: 'auth', role: 'admin' },
    },
    {
        path: '/admin/users',
        name: 'admin.users',
        component: Dashboard,
        meta: { guard: 'auth', role: 'admin' },
    },
];
