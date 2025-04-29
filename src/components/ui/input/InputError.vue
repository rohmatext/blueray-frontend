<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    message?: string | string[];
}>();

const displayMessage = computed(() => {
    if (Array.isArray(props.message)) {
        return props.message.at(0);
    }
    return props.message;
});
</script>

<template>
    <div v-if="displayMessage">
        <p class="text-destructive text-sm">
            {{ displayMessage }}
        </p>
    </div>
</template>
