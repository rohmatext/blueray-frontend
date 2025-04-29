import { cva, VariantProps } from 'class-variance-authority';

export { default as BlockStack } from '@/components/ui/page/BlockStack.vue';
export { default as Page } from '@/components/ui/page/Page.vue';
export { default as TitleBar } from '@/components/ui/page/TitleBar.vue';

export type BlockStackVariants = VariantProps<typeof blockStackVariants>;
export type PageVariants = VariantProps<typeof pageVariants>;

export const blockStackVariants = cva('flex flex-col gap-6', {
    variants: {
        align: {
            default: '[align-items:initial]',
            start: 'items-start',
            end: 'items-end',
            center: 'items-center',
            baseline: 'items-baseline',
            stretch: 'items-stretch',
        },
        inlineAlign: {
            default: '[justify-content:initial]',
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            stretch: 'justify-stretch',
        },
    },
    defaultVariants: {
        align: 'default',
        inlineAlign: 'default',
    },
});

export const pageVariants = cva('mx-auto w-full', {
    variants: {
        maxWidth: {
            default: 'max-w-full',
            sm: 'max-w-screen-sm',
            md: 'max-w-screen-md',
            lg: 'max-w-screen-lg',
            xl: 'max-w-screen-xl',
            '2xl': 'max-w-screen-2xl',
        },
    },
    defaultVariants: {
        maxWidth: 'default',
    },
});
