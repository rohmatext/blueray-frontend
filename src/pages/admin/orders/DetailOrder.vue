<script setup lang="ts">
import { BlockStack, Page, TitleBar } from '@/components/page';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import { formatDate } from '@/lib/format-date';
import { formatCurrency } from '@/lib/format-price';
import { useAuthStore } from '@/stores/auth';
import { Shipment, ShipmentItem, Tracking } from '@/types/shipment';
import { useHead } from '@unhead/vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import OrderDetailSkeleton from './skeleteon/OrderDetailSkeleton.vue';
import OrderTrackingListSkeleton from './skeleteon/OrderTrackingListSkeleton.vue';

useHead({
    title: 'Detail Pesanan',
});

const route = useRoute();
const auth = useAuthStore();

const shipment = ref<Shipment>(Object.assign({}));
const items = ref<ShipmentItem[]>([]);
const tracking = ref<Tracking>(Object.assign({}));
const isLoading = ref<boolean>(false);

const fetchOrder = async () => {
    isLoading.value = true;
    try {
        const { data: response } = await axios.get(`/api/shipments/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });

        const { data: track } = await axios.get(`/api/shipments/trackings/${response.data.shipment.tracking_id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });

        shipment.value = response.data.shipment;
        items.value = response.data.shipment.items;
        tracking.value = track.data;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchOrder();
});
</script>

<template>
    <AppLayout>
        <Page max-width="lg">
            <TitleBar title="Detail Pesanan" :navigation="{ name: 'admin.orders' }">
                <template #titleMetadata>
                    <Badge variant="secondary">{{ shipment.status }}</Badge>
                </template>
            </TitleBar>
            <BlockStack class="lg:flex-row">
                <BlockStack class="flex-1 lg:w-2/3">
                    <Card>
                        <CardContent>
                            <OrderDetailSkeleton v-if="isLoading" />
                            <div v-else>
                                <BlockStack>
                                    <BlockStack class="flex-row flex-wrap gap-x-0 text-sm">
                                        <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                                            <div class="text-muted-foreground">Order ID</div>
                                            <div class="font-semibold">{{ shipment.external_id }}</div>
                                        </BlockStack>
                                        <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                                            <div class="text-muted-foreground">Tracking ID</div>
                                            <div class="font-semibold">{{ shipment.tracking_id }}</div>
                                        </BlockStack>
                                        <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                                            <div class="text-muted-foreground">Tanggal order</div>
                                            <div class="font-semibold">{{ formatDate(shipment.created_at as string, 'shortDateTime') }}</div>
                                        </BlockStack>
                                        <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                                            <div class="text-muted-foreground">Kurir</div>
                                            <div class="font-semibold">
                                                {{ shipment.courier_company?.toUpperCase() }} {{ shipment.courier_type?.toUpperCase() }}
                                            </div>
                                        </BlockStack>
                                        <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                                            <div class="text-muted-foreground">Ongkos kirim</div>
                                            <div class="font-semibold">
                                                {{ formatCurrency(shipment.price) }}
                                            </div>
                                        </BlockStack>
                                        <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                                            <div class="text-muted-foreground">Link Tracking</div>
                                            <div class="font-semibold">
                                                <a :href="shipment.courier_link" target="_blank" class="underline"> Klik disini </a>
                                            </div>
                                        </BlockStack>
                                    </BlockStack>
                                </BlockStack>

                                <Separator class="my-4" />

                                <BlockStack class="text-sm sm:flex-row">
                                    <BlockStack class="flex-1 gap-1">
                                        <div class="text-muted-foreground">Alamat Pengiriman</div>
                                        <div class="font-medium">
                                            {{ tracking?.origin?.contact_name }}
                                        </div>
                                        <div>
                                            {{ tracking?.origin?.address }}
                                        </div>
                                    </BlockStack>
                                    <BlockStack class="flex-1 gap-1">
                                        <div class="text-muted-foreground">Alamat Penerima</div>
                                        <div class="font-medium">{{ tracking?.destination?.contact_name }}</div>
                                        <div>{{ tracking?.destination?.address }}</div>
                                    </BlockStack>
                                </BlockStack>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <OrderDetailSkeleton v-if="isLoading" />
                            <Table v-else>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Produk</TableHead>
                                        <TableHead>Harga</TableHead>
                                        <TableHead>Qty</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow v-for="item in items" :key="item.id">
                                        <TableCell>{{ item.name }}</TableCell>
                                        <TableCell>{{ formatCurrency(item.value) }}</TableCell>
                                        <TableCell class="w-10">{{ item.quantity }}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </BlockStack>

                <BlockStack class="lg:w-1/3">
                    <Card>
                        <CardContent class="text-sm">
                            <CardTitle>Tracking Resi</CardTitle>
                            <OrderTrackingListSkeleton v-if="isLoading" />
                            <BlockStack class="mt-4 gap-2" v-else>
                                <div class="rounded-lg border p-2" v-for="(history, key) in tracking.history" :key="key">
                                    <div class="font-medium">{{ formatDate(history.updated_at as string, 'shortDateTime') }}</div>
                                    <div class="text-muted-foreground">{{ history.note }}</div>
                                </div>
                            </BlockStack>
                        </CardContent>
                    </Card>
                </BlockStack>
            </BlockStack>
        </Page>
    </AppLayout>
</template>
