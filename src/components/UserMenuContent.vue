<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types';
import { AsteriskSquare, LogOut, UserCog } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

interface Props {
    user: User | null;
}

const auth = useAuthStore();

const handleLogout = (e: Event) => {
    auth.logout();
};

defineProps<Props>();
</script>

<template>
    <DropdownMenuLabel class="p-0 font-normal">
        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo :user="user" :show-email="true" />
        </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
        <DropdownMenuItem :as-child="true">
            <RouterLink class="block w-full" :to="{ name: 'settings.account' }">
                <UserCog class="mr-1 size-4" />
                Pengaturan profile
            </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem :as-child="true">
            <RouterLink class="block w-full" :to="{ name: 'settings.password' }">
                <AsteriskSquare class="mr-1 size-4" />
                Ganti password
            </RouterLink>
        </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem :as-child="true">
        <button class="block w-full" method="button" @click="handleLogout" as="button">
            <LogOut class="mr-2 h-4 w-4" />
            Log out
        </button>
    </DropdownMenuItem>
</template>
