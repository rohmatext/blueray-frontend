import { Inbox, LayoutGrid, MapPin } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const useUserMenu = () => {
    const route = useRoute();
    const name = route.name?.toString() || '';
    const menu = [
        {
            label: 'Dashboard',
            icon: LayoutGrid,
            to: { name: 'user' },
            active: name === 'user',
        },
        {
            label: 'Pesanan',
            icon: Inbox,
            to: { name: 'user.orders' },
            active: name.startsWith('user.orders'),
        },
        {
            label: 'Alamat',
            icon: MapPin,
            to: { name: 'user.addresses' },
            active: name.startsWith('user.addresses'),
        },
    ];

    return menu;
};

export default useUserMenu;
