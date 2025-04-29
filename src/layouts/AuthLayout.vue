<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div class="w-full max-w-sm">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col items-center gap-4">
                    <RouterLink to="/" class="flex flex-col items-center gap-2">
                        <div class="mb-1 flex size-9 items-center justify-center rounded-md">
                            <img src="/vite.svg" alt="Logo" class="size-8" />
                        </div>
                        <span class="sr-only">
                            {{ title }}
                        </span>
                    </RouterLink>
                    <div class="space-y-2 text-center">
                        <h1 class="text-xl font-medium">{{ title }}</h1>
                        <p class="text-muted-foreground">{{ description }}</p>
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
