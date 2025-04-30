<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import menu from '@/layouts/app/menu-admin';
import { useAuthStore } from '@/stores/auth';
import { NavItem, Role } from '@/types';
import AppLogo from './AppLogo.vue';
import NavMain from './NavMain.vue';
import NavUser from './NavUser.vue';

const mainNavItems: NavItem[] = menu;

const { user } = useAuthStore();
console.log((user?.roles as Role[]).at(0)?.name);
</script>

<template>
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton class="py-5">
                        <RouterLink :to="{ name: 'dashboard' }" class="inline-block w-full">
                            <AppLogo class="size-8" />
                        </RouterLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
