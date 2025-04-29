<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Primitive, PrimitiveProps } from 'reka-ui';
import { HTMLAttributes } from 'vue';
import { blockStackVariants } from '.';

interface BlockStackProps extends PrimitiveProps {
    class?: HTMLAttributes['class'];
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch' | 'default';
    inlineAlign?: 'start' | 'center' | 'end' | 'stretch' | 'default';
    as?: 'div' | 'span' | 'ul' | 'ol' | 'li' | 'fieldset';
}

const props = withDefaults(defineProps<BlockStackProps>(), {
    as: 'div',
});
</script>

<template>
    <Primitive :as="as" :as-child="asChild" :class="cn(blockStackVariants({ align, inlineAlign }), props.class)">
        <slot />
    </Primitive>
</template>
