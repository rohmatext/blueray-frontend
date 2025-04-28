<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    console.log(import.meta.env.VITE_BACKEND_URL);
});
</script>
<template>
    <p>About</p>
</template>
