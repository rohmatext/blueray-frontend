<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, HTMLAttributes } from 'vue';
import { PageVariants, pageVariants } from '.';

const props = defineProps<{
    class?: HTMLAttributes['class'];
    maxWidth?: PageVariants['maxWidth'];
}>();

const delegatedProps = computed(() => {
    const { class: _, maxWidth, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <div
        v-bind="delegatedProps"
        :class="cn(pageVariants({ maxWidth }), props.class)"
    >
        <slot />
    </div>
</template>
