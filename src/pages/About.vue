<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { onMounted } from 'vue';

onMounted(() => {
    console.log(import.meta.env.VITE_BACKEND_URL);
});
</script>
<template>
    <Button>Hell</Button>
    <p>About</p>
    <Button asChild>
        <RouterLink to="/"> Go to Home </RouterLink>
    </Button>
</template>
