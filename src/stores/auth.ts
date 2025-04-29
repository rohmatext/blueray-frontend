import { User } from '@/types';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: (): { user: User | null } => ({
        user: null,
    }),
    actions: {
        setUser(user: User | null) {
            this.user = user;
        },
    },
});
