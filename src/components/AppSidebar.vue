<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import useAdminMenu from '@/composables/menus/useAdminMenu';
import useUserMenu from '@/composables/menus/useUserMenu';
import { useAuthStore } from '@/stores/auth';
import { NavItem, Role } from '@/types';
import AppLogo from './AppLogo.vue';
import NavMain from './NavMain.vue';
import NavUser from './NavUser.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Acme';
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
                    <SidebarMenuButton class="mt-1 py-5" as-child>
                        <RouterLink :to="{ name: 'dashboard' }" class="flex w-full items-center py-2">
                            <AppLogo class="size-6" />
                            <h1 class="ml-2 text-lg font-semibold">{{ appName }}</h1>
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
