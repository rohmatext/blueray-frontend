<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';
</script>

<template>
    <SidebarProvider>
        <slot />
    </SidebarProvider>
</template>
