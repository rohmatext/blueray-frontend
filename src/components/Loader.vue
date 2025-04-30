<script setup lang="ts">
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-vue-next';
import { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'];
    isLoading?: boolean;
}>();
</script>

<template>
    <LoaderCircle :class="cn('size-4 animate-spin', props.class)" v-if="props.isLoading" />
</template>
