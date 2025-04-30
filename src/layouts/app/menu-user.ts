import { Inbox, LayoutGrid, MapPin } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute();
const name = route.name as string;
const menu = [
    {
        label: 'Dashboard',
        icon: LayoutGrid,
        to: { name: 'user.dashboard' },
        active: name === 'user.dashboard',
    },
    {
        label: 'Pesanan',
        icont: Inbox,
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

export default menu;
