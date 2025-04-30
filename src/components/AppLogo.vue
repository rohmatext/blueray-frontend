<script setup lang="ts">
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
<template>
    <img src="/vite.svg" alt="Logo" :class="cn('size-8', props.class)" />
</template>
