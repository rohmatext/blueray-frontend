<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>
<template>
    <div class="bg-background flex min-h-svh flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-md text-center">
            <div class="mx-auto mb-1 flex size-12 items-center justify-center rounded-md">
                <AppLogo class="size-12" />
            </div>
            <h1 class="text-foreground mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
                {{ title }}
            </h1>
            <p class="text-muted-foreground mt-4 text-lg">
                {{ description }}
            </p>
            <div class="mt-6">
                <Button asChild>
                    <RouterLink :to="{ name: 'home' }"> Ke beranda </RouterLink>
                </Button>
            </div>
        </div>
    </div>
</template>
