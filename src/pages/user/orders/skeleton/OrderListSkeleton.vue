<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader } from '@/components/ui/table';
import TableRow from '@/components/ui/table/TableRow.vue';
</script>

<template>
    <div class="animate-pulse">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="h-6 w-1/3 rounded bg-neutral-200"></TableHead>
                    <TableHead class="h-6 w-1/3 rounded bg-neutral-200"></TableHead>
                    <TableHead class="h-6 w-1/3 rounded bg-neutral-200"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="i in 3" :key="i">
                    <TableCell class="h-6 w-1/3 rounded bg-neutral-200"></TableCell>
                    <TableCell class="h-6 w-1/3 rounded bg-neutral-200"></TableCell>
                    <TableCell class="h-6 w-1/3 rounded bg-neutral-200"></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>
