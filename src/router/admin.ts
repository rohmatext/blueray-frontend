import CreateAddress from '@/pages/admin/adresses/CreateAddress.vue';
import EditAddress from '@/pages/admin/adresses/EditAddress.vue';
import ManageAddress from '@/pages/admin/adresses/ManageAddress.vue';
import EditUser from '@/pages/admin/users/EditUser.vue';
import ManageUser from '@/pages/admin/users/ManageUser.vue';
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
        component: ManageAddress,
        meta: { guard: 'auth', role: 'admin' },
    },
    {
        path: '/admin/addresses/create',
        name: 'admin.addresses.create',
        component: CreateAddress,
        meta: { guard: 'auth', role: 'admin' },
    },
    {
        path: '/admin/addresses/edit/:id',
        name: 'admin.addresses.edit',
        component: EditAddress,
        meta: { guard: 'auth', role: 'admin' },
    },
    {
        path: '/admin/users',
        name: 'admin.users',
        component: ManageUser,
        meta: { guard: 'auth', role: 'admin' },
    },
    {
        path: '/admin/users/:id',
        name: 'admin.users.edit',
        component: EditUser,
        meta: { guard: 'auth', role: 'admin' },
    },
];
