<script setup lang="ts">
import { BlockStack, Page, TitleBar } from '@/components/page';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { ApiResponse } from '@/types';
import { Shipment } from '@/types/shipment';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useHead } from '@unhead/vue';
import { useDebounceFn } from '@vueuse/core';
import { Ellipsis } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { toast } from 'vue-sonner';
import TableSkeleton from './skeleton/TableSkeleton.vue';

useHead({
    title: 'Pesanan Pengiriman',
});

const auth = useAuthStore();
const search = ref<string>('');
const shipmentSelected = ref<Shipment>();
const queryClient = useQueryClient();

const fetchShipments = async (): Promise<Shipment[] | undefined> => {
    try {
        const response = await axios.get<ApiResponse<Shipment[]>>('/api/shipments', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            params: {
                search: search.value.length > 0 ? search.value : undefined,
            },
        });

        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const {
    isPending,
    data: shipments,
    isFetching,
} = useQuery({
    queryKey: ['shipments'],
    queryFn: fetchShipments,
});

const showDeleteDialog = (shipment: Shipment) => {
    shipmentSelected.value = shipment;
};

const onDeleteSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['shipments'] });
};

const onDeleteError = (message: string) => {
    toast.error(message);
};

watch(
    search,
    useDebounceFn(() => {
        queryClient.invalidateQueries({ queryKey: ['shipments'] });
    }, 300),
);
</script>

<template>
    <AppLayout>
        <Page max-width="lg">
            <TitleBar title="Pesanan Pengiriman">
                <template #action>
                    <Button as-child>
                        <RouterLink :to="{ name: 'user.orders.create' }">Buat Pesanan</RouterLink>
                    </Button>
                </template>
            </TitleBar>
            <BlockStack>
                <Card>
                    <CardContent>
                        <TableSkeleton v-if="isFetching || isPending" />
                        <Table v-else class="w-full">
                            <TableHeader>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Kurir</TableHead>
                                <TableHead>Penerima</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead class="w-10"></TableHead>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="row in shipments" :key="row.id">
                                    <TableCell class="whitespace-normal">{{ row.external_id }}</TableCell>
                                    <TableCell class="whitespace-normal">{{ row.courier_company }}</TableCell>
                                    <TableCell class="whitespace-normal">{{ row.destination_name }}</TableCell>
                                    <TableCell class="w-10">
                                        <Badge variant="secondary">{{ row.status }}</Badge>
                                    </TableCell>
                                    <TableCell class="w-10 align-top">
                                        <DropdownMenu :modal="false">
                                            <DropdownMenuTrigger as-child>
                                                <Button variant="ghost" class="p-0" size="icon">
                                                    <Ellipsis class="size-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem as-child>
                                                    <RouterLink :to="{ name: 'user.orders.detail', params: { id: row.id } }"> Detail </RouterLink>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableEmpty v-if="shipments?.length === 0" :colspan="4">Belum ada alaman</TableEmpty>
                        </Table>
                    </CardContent>
                </Card>
            </BlockStack>
        </Page>
    </AppLayout>
</template>
