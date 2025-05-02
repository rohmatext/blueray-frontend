<script setup lang="ts">
import { BlockStack } from '@/components/page';
import { Separator } from '@/components/ui/separator';
</script>

<template>
    <div class="animate-pulse">
        <BlockStack>
            <BlockStack class="flex-row flex-wrap gap-x-0 text-sm">
                <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                    <div class="my-1 h-3 w-1/2 rounded bg-neutral-200"></div>
                    <div class="my-1 h-4 w-full rounded bg-neutral-200"></div>
                </BlockStack>
                <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                    <div class="my-1 h-3 w-1/2 rounded bg-neutral-200"></div>
                    <div class="my-1 h-4 w-full rounded bg-neutral-200"></div>
                </BlockStack>
                <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                    <div class="my-1 h-3 w-1/2 rounded bg-neutral-200"></div>
                    <div class="my-1 h-4 w-full rounded bg-neutral-200"></div>
                </BlockStack>
                <BlockStack class="w-1/2 gap-1 sm:w-1/3 md:w-1/2 lg:w-1/3">
                    <div class="my-1 h-3 w-1/2 rounded bg-neutral-200"></div>
                    <div class="my-1 h-4 w-full rounded bg-neutral-200"></div>
                </BlockStack>
            </BlockStack>
            <Separator class="my-4" />
            <BlockStack class="text-sm sm:flex-row">
                <div class="flex-1 gap-1">
                    <div class="my-1 h-3 w-1/2 rounded bg-neutral-200"></div>
                    <div class="my-1 h-4 w-full rounded bg-neutral-200"></div>
                    <div class="my-1 h-4 w-full rounded bg-neutral-200"></div>
                </div>
                <div class="flex-1 gap-1">
                    <div class="my-1 h-3 w-1/2 rounded bg-neutral-200"></div>
                    <div class="my-1 h-4 w-full rounded bg-neutral-200"></div>
                    <div class="my-1 h-4 w-full rounded bg-neutral-200"></div>
                </div>
            </BlockStack>
        </BlockStack>
    </div>
</template>
