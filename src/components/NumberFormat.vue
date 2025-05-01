<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { CurrencyDisplay, useCurrencyInput } from 'vue-currency-input';

const { inputRef } = useCurrencyInput({
    locale: 'id',
    currency: 'IDR',
    currencyDisplay: CurrencyDisplay.hidden,
});
</script>
<template>
    <Input ref="inputRef" type="text" />
</template>
