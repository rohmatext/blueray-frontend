<script setup lang="ts">
import { HTMLAttributes } from 'vue';
import { SidebarInset } from './ui/sidebar';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
    <SidebarInset :class="props.class">
        <slot />
    </SidebarInset>
</template>
