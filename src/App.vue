<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useHead } from '@unhead/vue';
import { RouterView } from 'vue-router';

useHead({
    titleTemplate: (title) => `${title ? title + ' - ' : ''}${import.meta.env.VITE_APP_NAME || 'Sendev'}`,
});
useAuth();
</script>

<template>
    <div>
        <RouterView />
    </div>
</template>
