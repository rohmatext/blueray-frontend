<script setup lang="ts">
import { BlockStack, Page, TitleBar } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import TableSkeleton from '@/pages/admin/users/skeleton/TableSkeleton.vue';
import { useAuthStore } from '@/stores/auth';
import { ApiResponse } from '@/types';
import { Address } from '@/types/address';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useHead } from '@unhead/vue';
import { useDebounceFn } from '@vueuse/core';
import { Ellipsis } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { toast } from 'vue-sonner';

useHead({
    title: 'Alamat',
});

const auth = useAuthStore();
const search = ref<string>('');
const addressSelected = ref<Address>();
const queryClient = useQueryClient();

const fetchAddreses = async (): Promise<Address[] | undefined> => {
    try {
        const response = await axios.get<ApiResponse<Address[]>>('/api/addresses', {
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
    data: addresses,
    isFetching,
} = useQuery({
    queryKey: ['addresses'],
    queryFn: fetchAddreses,
});

const showDeleteDialog = (address: Address) => {
    addressSelected.value = address;
};

const onDeleteSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['addresses'] });
};

const onDeleteError = (message: string) => {
    toast.error(message);
};

watch(
    search,
    useDebounceFn(() => {
        queryClient.invalidateQueries({ queryKey: ['addresses'] });
    }, 300),
);
</script>

<template>
    <AppLayout>
        <Page max-width="lg">
            <TitleBar title="Alamat">
                <template #action>
                    <Button as-child>
                        <RouterLink :to="{ name: 'admin.addresses.create' }"> Tambah Alamat </RouterLink>
                    </Button>
                </template>
            </TitleBar>
            <BlockStack>
                <Card>
                    <CardContent>
                        <TableSkeleton v-if="isFetching || isPending" />
                        <Table v-else class="w-full">
                            <TableHeader>
                                <TableHead class="hidden w-16 sm:table-cell">Pengirim</TableHead>
                                <TableHead class="hidden w-16 sm:table-cell">Kontak</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead class="w-10"></TableHead>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="row in addresses" :key="row.id">
                                    <TableCell class="hidden align-top sm:table-cell">{{ row.name }}</TableCell>
                                    <TableCell class="hidden align-top sm:table-cell">{{ row.phone }}</TableCell>
                                    <TableCell class="w-full align-top whitespace-normal">
                                        <div class="font-medium sm:hidden">{{ row.name }} ({{ row.phone }})</div>
                                        <div>
                                            <span class="mr-1">
                                                {{ row.full_address }}
                                            </span>
                                            <span v-if="row.note" class="text-muted-foreground">(Catatan: {{ row.note }})</span>
                                        </div>
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
                                                    <RouterLink :to="{ name: 'admin.addresses.edit', params: { id: row.id } }">
                                                        Edit alamat
                                                    </RouterLink>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem class="w-full" variant="destructive" as-child>
                                                    <button @click="showDeleteDialog(row)">Hapus</button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableEmpty v-if="addresses?.length === 0" :colspan="3">Belum ada pengguna</TableEmpty>
                        </Table>
                    </CardContent>
                </Card>
            </BlockStack>
        </Page>
    </AppLayout>

    <!-- <DeleteDialog @onSuccess="onDeleteSuccess" v-model="addressSelected" @onError="onDeleteError" /> -->
</template>
