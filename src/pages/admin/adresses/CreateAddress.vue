<script setup lang="ts">
import { Page, TitleBar } from '@/components/page';
import AppLayout from '@/layouts/AppLayout.vue';
import AddressForm from '@/pages/admin/adresses/AddressForm.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useHead } from '@unhead/vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

useHead({
    title: 'Tambah Alamat',
});

const router = useRouter();
const queryClient = useQueryClient();

const onSuccess = (message: string) => {
    toast.success(message);
    router.push({ name: 'admin.addresses' });
    queryClient.invalidateQueries({ queryKey: ['addresses'] });
};
</script>

<template>
    <AppLayout>
        <Page class="max-w-md">
            <TitleBar title="Tambah Alamat" :navigation="{ name: 'admin.addresses' }" />
            <AddressForm @on-success="onSuccess" />
        </Page>
    </AppLayout>
</template>
