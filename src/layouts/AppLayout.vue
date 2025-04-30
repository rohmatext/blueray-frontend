<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import AppShell from '@/components/AppShell.vue';
import AppSidebar from '@/components/AppSidebar.vue';
</script>

<template>
    <AppShell>
        <AppSidebar />
        <AppContent>
            <slot />
        </AppContent>
    </AppShell>
</template>
