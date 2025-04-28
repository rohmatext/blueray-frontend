<script setup lang="ts">
defineProps<{
    message?: string | string[];
}>();
</script>

<template>
    <div v-show="message">
        <p class="text-destructive text-sm">
            {{ message }}
        </p>
    </div>
</template>
