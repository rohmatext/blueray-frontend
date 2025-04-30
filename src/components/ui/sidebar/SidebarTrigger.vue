<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-vue-next';
import type { HTMLAttributes } from 'vue';
import { useSidebar } from './utils';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
    <Button data-sidebar="trigger" data-slot="sidebar-trigger" variant="ghost" size="icon" :class="cn('size-8', props.class)" @click="toggleSidebar">
        <Menu class="size-5" />
        <span class="sr-only">Toggle Sidebar</span>
    </Button>
</template>
