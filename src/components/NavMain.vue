<script setup lang="ts">
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { RouterLink } from 'vue-router';

defineProps<{
    items: NavItem[];
}>();
</script>

<template>
    <SidebarGroup class="px-2 py-4">
        <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.label">
                <SidebarMenuButton as-child :tooltip="item.label">
                    <RouterLink :to="item.to">
                        <component :is="item.icon" />
                        <span>{{ item.label }}</span>
                    </RouterLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
