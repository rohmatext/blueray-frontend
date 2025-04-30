<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import { useHead } from '@unhead/vue';
import { RouterView } from 'vue-router';

useHead({
    titleTemplate: (title) => `${title ? title + ' - ' : ''}${import.meta.env.VITE_APP_NAME || 'Sendev'}`,
});
</script>

<template>
    <RouterView />
    <Toaster />
</template>
