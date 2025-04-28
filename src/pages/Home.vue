<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<template>
    <p>Home</p>
    <div>
        {{ router.currentRoute.value.fullPath }}
    </div>
</template>
