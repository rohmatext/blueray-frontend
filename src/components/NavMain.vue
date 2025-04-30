<script setup lang="ts">
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { RouterLink, useRoute } from 'vue-router';

const props = defineProps<{
    items: NavItem[];
}>();

const route = useRoute();
</script>

<template>
    <SidebarGroup class="p-2">
        <SidebarMenu>
            <SidebarMenuItem v-for="item in props.items" :key="item.label">
                <SidebarMenuButton as-child :tooltip="item.label" :is-active="item.active(route)">
                    <RouterLink :to="item.to">
                        <component :is="item.icon" />
                        <span>{{ item.label }}</span>
                    </RouterLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
