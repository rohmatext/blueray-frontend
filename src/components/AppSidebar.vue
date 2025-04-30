<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import useAdminMenu from '@/composables/menus/useAdminMenu';
import useUserMenu from '@/composables/menus/useUserMenu';
import { useAuthStore } from '@/stores/auth';
import { NavItem, Role } from '@/types';
import AppLogo from './AppLogo.vue';
import NavMain from './NavMain.vue';
import NavUser from './NavUser.vue';

const { user } = useAuthStore();

const roles: Role[] = user?.roles as Role[];
const currentRole = roles.at(0)?.name as string;

const mainNavItems: NavItem[] = currentRole === 'admin' ? useAdminMenu() : useUserMenu();
</script>

<template>
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton class="py-5">
                        <RouterLink :to="{ name: 'dashboard' }" class="inline-block w-full">
                            <AppLogo class="size-6" />
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
