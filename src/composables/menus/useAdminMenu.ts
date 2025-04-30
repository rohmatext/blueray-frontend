import { NavItem } from '@/types';
import { Inbox, LayoutGrid, MapPin, UserRound } from 'lucide-vue-next';
import { RouteLocationNormalizedLoaded } from 'vue-router';

const useAdminMenu = () => {
    const menu: NavItem[] = [
        {
            label: 'Dashboard',
            icon: LayoutGrid,
            to: { name: 'admin' },
            active: (route: RouteLocationNormalizedLoaded) => route.name === 'admin',
        },
        {
            label: 'Pesanan',
            icon: Inbox,
            to: { name: 'admin.orders' },
            active: (route: RouteLocationNormalizedLoaded) => route.name?.toString().startsWith('admin.orders') || false,
        },
        {
            label: 'Alamat',
            icon: MapPin,
            to: { name: 'admin.addresses' },
            active: (route: RouteLocationNormalizedLoaded) => route.name?.toString().startsWith('admin.addresses') || false,
        },
        {
            label: 'Pengguna',
            icon: UserRound,
            to: { name: 'admin.users' },
            active: (route: RouteLocationNormalizedLoaded) => route.name?.toString().startsWith('admin.users') || false,
        },
    ];

    return menu;
};

export default useAdminMenu;
