<script setup lang="ts">
import CurrencyInput from '@/components/CurrencyInput.vue';
import Loader from '@/components/Loader.vue';
import NumberFormat from '@/components/NumberFormat.vue';
import { BlockStack, Page, TitleBar } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import AddressFormDestinationModal from '@/pages/admin/orders/AddressFormDestinationModal.vue';
import AddressFormModal from '@/pages/admin/orders/AddressFormModal.vue';
import { useAuthStore } from '@/stores/auth';
import { ApiResponse } from '@/types';
import { Address } from '@/types/address';
import { useHead } from '@unhead/vue';
import { ChevronDown, Trash2Icon } from 'lucide-vue-next';
import { useField, useForm } from 'vee-validate';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

interface Courier {
    company: string;
    name: string;
    type: string;
}

interface Item {
    name: string;
    value: string;
    quantity: number;
    weight: number;
    description: string;
}

useHead({
    title: 'Buat Pesanan',
});

const router = useRouter();
const auth = useAuthStore();
const couriers = ref<Courier[]>([]);

const addresses = ref<Address[]>();

const { errors, handleSubmit, isSubmitting, setErrors } = useForm();
const itemsErrors = ref<{ [key: string]: string | string[] }>(Object.assign({}));

const { value: courier } = useField<string>('courier');
const { value: note } = useField<string>('note');
const { value: origin } = useField<Address>('origin');
const { value: destination } = useField<Omit<Address, 'id' | 'full_address'>>('destination');
const { value: items } = useField<Item[]>('items', (value) => !!value, {
    initialValue: [
        {
            name: '',
            value: '',
            quantity: 0,
            weight: 0,
            description: 'Test',
        },
    ],
});

const showModal = reactive<{
    destination: boolean;
    origin: boolean;
}>({
    destination: false,
    origin: false,
});

const toggleOriginSelect = ref<boolean>(false);

const fetchCouriers = () => {
    axios
        .get('/api/shipments/couriers', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((response) => {
            couriers.value = response.data.data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

const fetchAddreses = () => {
    axios
        .get('/api/addresses', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((response) => {
            addresses.value = response.data.data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

onMounted(() => {
    fetchCouriers();
    fetchAddreses();
});

const onDestinationSuccess = (data: Omit<Address, 'id' | 'full_address'>) => {
    showModal.destination = false;
    destination.value = data;
};

const onOriginSuccess = (data: ApiResponse<Address>) => {
    showModal.origin = false;
    fetchAddreses();
    origin.value = data.data;
    toast.success(data.message);
    toggleOriginSelect.value = false;
};

const showDestination = () => {
    showModal.destination = true;
};

const showOrigin = () => {
    showModal.origin = true;
};

const onAddItem = () => {
    items.value.push({
        name: '',
        value: '',
        quantity: 0,
        weight: 0,
        description: 'Test',
    });
};

const onRemoveItem = (index: number) => {
    if (items.value.length === 1) {
        toast.error('Minimal satu item');
        return;
    }

    items.value.splice(index, 1);
};

const save = handleSubmit(async (values) => {
    console.log(values);
    try {
        setErrors({});
        const { data } = await axios.post('/api/shipments', values, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });
        toast.success(data.message);
        router.push({ name: 'admin.orders' });
    } catch (err: any) {
        if (err.response.status !== 422) throw err;

        itemsErrors.value = Object.assign({});
        for (const [key, value] of Object.entries(err.response.data.errors)) {
            if (!key.startsWith('items.')) continue;
            itemsErrors.value[key] = value as string | string[];
        }

        const errorsWithoutItems = Object.fromEntries(Object.entries(err.response.data.errors).filter(([key]) => !key.startsWith('items')));

        setErrors(errorsWithoutItems as any);
    }
});
</script>

<template>
    <AppLayout>
        <Page max-width="md">
            <TitleBar title="Buat Pesanan" :navigation="{ name: 'admin.orders' }" />

            <BlockStack>
                <Card>
                    <CardContent>
                        <BlockStack class="flex-row text-sm">
                            <div class="flex-1">
                                <BlockStack class="gap-1">
                                    <div>Pengirim</div>
                                    <div>
                                        <Select v-model="origin" :open="toggleOriginSelect" @update:open="toggleOriginSelect = $event">
                                            <SelectTrigger class="text-primary border-0 px-1 text-xl" name="origin">
                                                <SelectValue class="text-primary text-2xl" :placeholder="origin?.name || 'Pilih alamat'" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem v-for="(row, key) in addresses" :key="key" :value="row">
                                                    {{ row.name }} ({{ row.phone }})
                                                </SelectItem>
                                                <div class="py-2">
                                                    <button
                                                        class="hover:bg-secondary w-full cursor-pointer rounded-lg p-2 text-left text-sm text-sky-600"
                                                        variant="ghost"
                                                        @click="showOrigin"
                                                    >
                                                        Tambah
                                                    </button>
                                                </div>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div class="text-muted-foreground" v-if="origin">
                                        <div>
                                            {{ origin.phone }}
                                        </div>
                                        <div>
                                            {{ origin.full_address }} <span v-if="origin.note">{{ origin.note }}</span>
                                        </div>
                                    </div>
                                    <InputError :message="errors.origin" />
                                </BlockStack>
                            </div>
                            <div class="flex-1">
                                <BlockStack class="gap-1">
                                    <div>Penerima</div>
                                    <BUtton class="text-left text-2xl" @click="showDestination">
                                        {{ destination?.name || 'Tulis alamat' }}
                                        <ChevronDown class="text-muted-foreground inline size-4" />
                                    </BUtton>
                                    <div class="text-muted-foreground" v-if="destination">
                                        <div>{{ destination?.phone }}</div>
                                        <div>
                                            {{ destination?.address }}, {{ destination?.subdistrict }}, {{ destination?.city }},
                                            {{ destination?.province }}, {{ destination?.zip }}
                                            <span v-if="destination?.note">, {{ destination?.note }}</span>
                                        </div>
                                    </div>
                                    <InputError :message="errors.destination" />
                                </BlockStack>
                            </div>
                        </BlockStack>
                        <Separator class="my-4" />
                        <BlockStack class="flex-row text-sm">
                            <div class="flex-1">
                                <BlockStack class="gap-1">
                                    <Label for="courier">Kurir</Label>
                                    <Select v-model="courier">
                                        <SelectTrigger class="w-full" name="courier">
                                            <SelectValue class="w-full" placeholder="Pilih kurir" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem v-for="(row, key) in couriers" :key="key" :value="row.name">
                                                {{ row.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError :message="errors.courier" />
                                </BlockStack>
                            </div>
                            <div class="flex-1">
                                <BlockStack class="gap-1">
                                    <Label for="note">Catatan (optinal)</Label>
                                    <Input type="text" id="note" name="note" v-model="note" />
                                    <InputError :message="errors.note" />
                                </BlockStack>
                            </div>
                        </BlockStack>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produk</TableHead>
                                    <TableHead>Harga</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Berat</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <template v-for="(row, key) in items" :key="key">
                                    <TableRow
                                        :class="{
                                            'border-b-0':
                                                itemsErrors[`items.${key}.name`] ||
                                                itemsErrors[`items.${key}.value`] ||
                                                itemsErrors[`items.${key}.quantity`] ||
                                                itemsErrors[`items.${key}.weight`] ||
                                                itemsErrors[`items.${key}.description`],
                                        }"
                                    >
                                        <TableCell
                                            :class="{
                                                'pb-0':
                                                    itemsErrors[`items.${key}.name`] ||
                                                    itemsErrors[`items.${key}.value`] ||
                                                    itemsErrors[`items.${key}.quantity`] ||
                                                    itemsErrors[`items.${key}.weight`] ||
                                                    itemsErrors[`items.${key}.description`],
                                            }"
                                        >
                                            <Input v-model="row.name" />
                                        </TableCell>
                                        <TableCell
                                            :class="{
                                                'pb-0':
                                                    itemsErrors[`items.${key}.name`] ||
                                                    itemsErrors[`items.${key}.value`] ||
                                                    itemsErrors[`items.${key}.quantity`] ||
                                                    itemsErrors[`items.${key}.weight`] ||
                                                    itemsErrors[`items.${key}.description`],
                                            }"
                                        >
                                            <CurrencyInput v-model="row.value" />
                                        </TableCell>
                                        <TableCell
                                            :class="{
                                                'w-32': true,
                                                'pb-0':
                                                    itemsErrors[`items.${key}.name`] ||
                                                    itemsErrors[`items.${key}.value`] ||
                                                    itemsErrors[`items.${key}.quantity`] ||
                                                    itemsErrors[`items.${key}.weight`] ||
                                                    itemsErrors[`items.${key}.description`],
                                            }"
                                        >
                                            <NumberFormat v-model="row.quantity" />
                                        </TableCell>
                                        <TableCell
                                            :class="{
                                                'w-32': true,
                                                'pb-0':
                                                    itemsErrors[`items.${key}.name`] ||
                                                    itemsErrors[`items.${key}.value`] ||
                                                    itemsErrors[`items.${key}.quantity`] ||
                                                    itemsErrors[`items.${key}.weight`] ||
                                                    itemsErrors[`items.${key}.description`],
                                            }"
                                        >
                                            <NumberFormat v-model="row.weight" />
                                        </TableCell>
                                        <TableCell class="w-8 p-0">
                                            <Button variant="link" @click="onRemoveItem(key)">
                                                <Trash2Icon class="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        v-if="
                                            itemsErrors[`items.${key}.name`] ||
                                            itemsErrors[`items.${key}.value`] ||
                                            itemsErrors[`items.${key}.quantity`] ||
                                            itemsErrors[`items.${key}.weight`] ||
                                            itemsErrors[`items.${key}.description`]
                                        "
                                    >
                                        <TableCell colspan="5" class="pt-0">
                                            <InputError
                                                :message="
                                                    itemsErrors[`items.${key}.name`] ||
                                                    itemsErrors[`items.${key}.value`] ||
                                                    itemsErrors[`items.${key}.quantity`] ||
                                                    itemsErrors[`items.${key}.weight`] ||
                                                    itemsErrors[`items.${key}.description`]
                                                "
                                                class="mt-2"
                                            />
                                        </TableCell>
                                    </TableRow>
                                </template>
                            </TableBody>
                        </Table>
                        <Button variant="link" @click="onAddItem">Tambah Produk</Button>
                    </CardContent>
                </Card>
                <div>
                    <Button @click="save" :disabled="isSubmitting">
                        <Loader :is-loading="isSubmitting" />
                        Buat pesanan</Button
                    >
                </div>
            </BlockStack>
        </Page>
    </AppLayout>
    <AddressFormModal v-model:open="showModal.origin" title="Alamat pengirim" @on-success="onOriginSuccess" />
    <AddressFormDestinationModal v-model:open="showModal.destination" title="Alamat tujuan" @on-success="onDestinationSuccess" />
</template>
