<script setup lang="ts">
import { BlockStack, Page, TitleBar } from '@/components/page';
import AppLayout from '@/layouts/AppLayout.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <AppLayout>
        <Page max-width="lg">
            <TitleBar title="Dashboard" />
            <BlockStack>Dashboard</BlockStack>
            <div>{{ route.name }}</div>
        </Page>
    </AppLayout>
</template>
