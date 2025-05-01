<script setup lang="ts">
import { Page, TitleBar } from '@/components/page';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import AddressForm from '@/pages/admin/adresses/AddressForm.vue';
import AddressFormSkeleton from '@/pages/admin/adresses/skeleton/AddressFormSkeleton.vue';
import { useAuthStore } from '@/stores/auth';
import { ApiResponse } from '@/types';
import { Address } from '@/types/address';
import { useQueryClient } from '@tanstack/vue-query';
import { useHead } from '@unhead/vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

useHead({
    title: 'Edit Alamat',
});

const router = useRouter();
const route = useRoute();
const queryClient = useQueryClient();

const auth = useAuthStore();
const address = ref<Address>();
const isLoading = ref<boolean>(false);

const fetchAddress = () => {
    isLoading.value = true;
    axios
        .get<ApiResponse<Address>>(`/api/addresses/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((res) => {
            address.value = res.data.data;
        })
        .catch((error: any) => {
            console.error(error);
            throw error;
        })
        .finally(() => {
            isLoading.value = false;
        });
};

onMounted(() => {
    fetchAddress();
});

const onSuccess = (message: string) => {
    toast.success(message);
    router.push({ name: 'admin.addresses' });
    queryClient.invalidateQueries({ queryKey: ['addresses'] });
};
</script>

<template>
    <AppLayout>
        <Page class="max-w-md">
            <TitleBar title="Edit Alamat" :navigation="{ name: 'admin.addresses' }" />
            <AddressFormSkeleton v-if="isLoading" />
            <AddressForm v-model="address" @on-success="onSuccess" v-else />
        </Page>
    </AppLayout>
</template>
