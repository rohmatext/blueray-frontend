import { NavItem } from '@/types';
import { Inbox, LayoutGrid, MapPin } from 'lucide-vue-next';
import { RouteLocationNormalizedLoaded } from 'vue-router';

const useUserMenu = () => {
    const menu: NavItem[] = [
        {
            label: 'Dashboard',
            icon: LayoutGrid,
            to: { name: 'user' },
            active: (route: RouteLocationNormalizedLoaded) => route.name === 'user',
        },
        {
            label: 'Pesanan',
            icon: Inbox,
            to: { name: 'user.orders' },
            active: (route: RouteLocationNormalizedLoaded) => route.name?.toString().startsWith('user.orders') || false,
        },
        {
            label: 'Alamat',
            icon: MapPin,
            to: { name: 'user.addresses' },
            active: (route: RouteLocationNormalizedLoaded) => route.name?.toString().startsWith('user.addresses') || false,
        },
    ];

    return menu;
};

export default useUserMenu;
