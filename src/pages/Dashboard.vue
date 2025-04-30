<script setup lang="ts">
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

const auth = useAuthStore();

const handleLogout = () => {
    auth.logout();
};
const route = useRoute();
</script>

<template>
    <AppLayout>
        <div>
            <div>
                <Button @click="handleLogout">Logout</Button>
            </div>
        </div>
    </AppLayout>
</template>
