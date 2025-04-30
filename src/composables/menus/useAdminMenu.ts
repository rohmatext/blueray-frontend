import { Inbox, LayoutGrid, MapPin, UserRound } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const useAdminMenu = () => {
    const route = useRoute();
    const name = route.name?.toString() || '';

    const menu = [
        {
            label: 'Dashboard',
            icon: LayoutGrid,
            to: { name: 'admin' },
            active: name === 'admin',
        },
        {
            label: 'Pesanan',
            icon: Inbox,
            to: { name: 'admin.orders' },
            active: name.startsWith('admin.orders'),
        },
        {
            label: 'Alamat',
            icon: MapPin,
            to: { name: 'admin.addresses' },
            active: name.startsWith('admin.addresses'),
        },
        {
            label: 'Pengguna',
            icon: UserRound,
            to: { name: 'admin.users' },
            active: name.startsWith('admin.users'),
        },
    ];

    return menu;
};

export default useAdminMenu;
