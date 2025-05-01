<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { useCurrencyInput } from 'vue-currency-input';

const { inputRef } = useCurrencyInput({
    locale: 'id',
    currency: 'IDR',
});
</script>
<template>
    <Input ref="inputRef" type="text" />
</template>
