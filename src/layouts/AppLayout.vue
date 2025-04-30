<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppShell from '@/components/AppShell.vue';
import AppSidebar from '@/components/AppSidebar.vue';
</script>

<template>
    <AppShell>
        <AppSidebar />
        <AppContent>
            <AppHeader />
            <div class="px-6">
                <slot />
            </div>
        </AppContent>
    </AppShell>
</template>
