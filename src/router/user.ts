import CreateAddress from '@/pages/user/adresses/CreateAddress.vue';
import EditAddress from '@/pages/user/adresses/EditAddress.vue';
import ManageAddress from '@/pages/user/adresses/ManageAddress.vue';
import Dashboard from '@/pages/user/Dashboard.vue';
import CreateOrder from '@/pages/user/orders/CreateOrder.vue';
import DetailOrder from '@/pages/user/orders/DetailOrder.vue';
import ManageOrder from '@/pages/user/orders/ManageOrder.vue';

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
        component: ManageOrder,
        meta: { guard: 'auth', role: 'user' },
    },
    {
        path: '/user/orders/create',
        name: 'user.orders.create',
        component: CreateOrder,
        meta: { guard: 'auth', role: 'user' },
    },
    {
        path: '/user/orders/detail/:id',
        name: 'user.orders.detail',
        component: DetailOrder,
        meta: { guard: 'auth', role: 'user' },
    },
    {
        path: '/user/addresses',
        name: 'user.addresses',
        component: ManageAddress,
        meta: { guard: 'auth', role: 'user' },
    },
    {
        path: '/user/addresses/create',
        name: 'user.addresses.create',
        component: CreateAddress,
        meta: { guard: 'auth', role: 'user' },
    },
    {
        path: '/user/addresses/edit/:id',
        name: 'user.addresses.edit',
        component: EditAddress,
        meta: { guard: 'auth', role: 'user' },
    },
];
