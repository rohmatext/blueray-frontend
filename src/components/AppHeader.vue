<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
    <header
        class="border-siderbar-border/70 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4"
    >
        <div class="flex items-center gap-2">
            <SidebarTrigger class="-ml-1" />
        </div>
    </header>
</template>
