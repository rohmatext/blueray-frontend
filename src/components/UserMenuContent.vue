<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types';
import { LogOut } from 'lucide-vue-next';

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
    <DropdownMenuItem :as-child="true">
        <button class="block w-full" method="button" @click="handleLogout" as="button">
            <LogOut class="mr-2 h-4 w-4" />
            Log out
        </button>
    </DropdownMenuItem>
</template>
