<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

interface TitleBarProps {
    action?: any;
    title?: string;
    subtitle?: string;
    navigation?: string;
}

const props = defineProps<TitleBarProps>();

const classes = cn(typeof props.navigation === 'string' ? "grid [grid-template-areas:'navigation_action'_'title_title'] md:flex" : 'flex');
</script>

<template>
    <div class="relative py-4">
        <div :class="cn(`col-[auto_1fr] content-center items-center gap-y-2 md:gap-x-2`, classes, subtitle ? 'content-start' : '')">
            <div class="[grid-area:navigation]" v-if="navigation">
                <RouterLink :to="navigation">
                    <Button variant="ghost" size="icon" class="p-0 [&_svg]:size-5">
                        <ArrowLeft />
                    </Button>
                </RouterLink>
            </div>
            <div class="[grid-area:title]">
                <div class="flex items-center gap-2">
                    <h2 class="flex items-center gap-2 text-lg font-semibold">
                        <span v-if="$slots.default">
                            <slot />
                        </span>
                        <span v-else>{{ title }}</span>
                    </h2>
                    <div v-if="$slots['title-metadata']">
                        <slot name="title-metadata" />
                    </div>
                </div>
                <div v-if="subtitle">
                    <p class="text-muted-foreground text-sm">
                        {{ subtitle }}
                    </p>
                </div>
            </div>

            <div class="flex flex-auto items-center justify-end whitespace-nowrap [grid-area:action]" v-if="$slots.action">
                <div>
                    <slot name="action" />
                </div>
            </div>
        </div>
    </div>
</template>
