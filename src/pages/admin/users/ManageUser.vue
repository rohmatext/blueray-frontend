<script setup lang="ts">
import { BlockStack, Page, TitleBar } from '@/components/page';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getInitials } from '@/composables/useInitials';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import { formatDate } from '@/lib/format-date';
import DeleteDialog from '@/pages/admin/users/DeleteDialog.vue';
import TableSkeleton from '@/pages/admin/users/skeleton/TableSkeleton.vue';
import { useAuthStore } from '@/stores/auth';
import { ApiResponse, User } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useHead } from '@unhead/vue';
import { useDebounceFn } from '@vueuse/core';
import { Ellipsis } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { toast } from 'vue-sonner';

useHead({
    title: 'Pengguna',
});

const auth = useAuthStore();
const search = ref<string>('');
const userSelected = ref<User>();
const queryClient = useQueryClient();

const fetchUsers = async (): Promise<User[] | undefined> => {
    try {
        const response = await axios.get<ApiResponse<User[]>>('/api/users', {
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
    data: users,
    isFetching,
} = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
});

const showDeleteDialog = (user: User) => {
    userSelected.value = user;
};

const onDeleteSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['users'] });
};

const onDeleteError = (message: string) => {
    toast.error(message);
};

watch(
    search,
    useDebounceFn(() => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }, 300),
);
</script>

<template>
    <AppLayout>
        <Page max-width="lg">
            <TitleBar title="Pengguna" />
            <BlockStack>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Input class="max-w-72 font-normal" placeholder="Cari pengguna" v-model="search" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TableSkeleton v-if="isFetching || isPending" />
                        <Table v-else>
                            <TableHeader>
                                <TableHead>Pengguna</TableHead>
                                <TableHead class="hidden w-16 sm:table-cell">Terdaftar</TableHead>
                                <TableHead class="w-10"></TableHead>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="user in users" :key="user.id">
                                    <TableCell>
                                        <div class="flex flex-row gap-2">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {{ getInitials(user.name) }}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div class="font-medium">
                                                    {{ user.name }}
                                                </div>
                                                <div class="text-muted-foreground text-sm">
                                                    {{ user.email }}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell class="hidden sm:table-cell">{{ formatDate(user.created_at) }} </TableCell>
                                    <TableCell>
                                        <DropdownMenu :modal="false">
                                            <DropdownMenuTrigger as-child>
                                                <Button variant="ghost" class="p-0" size="icon">
                                                    <Ellipsis class="size-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem as-child>
                                                    <RouterLink :to="{ name: 'admin.users.edit', params: { id: user.id } }">
                                                        Edit Pengguna
                                                    </RouterLink>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem class="w-full" variant="destructive" as-child>
                                                    <button @click="showDeleteDialog(user)">Hapus</button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableEmpty v-if="users?.length === 0" :colspan="3">Belum ada pengguna</TableEmpty>
                        </Table>
                    </CardContent>
                </Card>
            </BlockStack>
        </Page>
    </AppLayout>

    <DeleteDialog @onSuccess="onDeleteSuccess" v-model="userSelected" @onError="onDeleteError" />
</template>
