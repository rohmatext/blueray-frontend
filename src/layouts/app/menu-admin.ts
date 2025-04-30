import { Inbox, LayoutGrid, MapPin, UserRound } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute();
const name = route.name as string;
const menu = [
    {
        label: 'Dashboard',
        icon: LayoutGrid,
        to: { name: 'admin.dashboard' },
        active: name === 'admin.dashboard',
    },
    {
        label: 'Pesanan',
        icont: Inbox,
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
        active: name.startsWith('admin.addresses'),
    },
];

export default menu;
