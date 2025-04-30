<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>
<template>
    <Button>Hell</Button>
    <p>About</p>
    <Button asChild>
        <RouterLink to="/"> Go to Home </RouterLink>
    </Button>
</template>
