<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
</script>

<template>
    <div class="animate-pulse">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="h-6 rounded bg-neutral-200"></TableHead>
                    <TableHead class="hidden h-6 w-16 rounded bg-neutral-200 sm:table-cell"></TableHead>
                    <TableHead class="h-6 w-10 rounded bg-neutral-200"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="i in 10" :key="i">
                    <TableCell>
                        <div class="flex flex-row gap-2">
                            <div class="h-10 w-10 rounded-full bg-neutral-200"></div>
                            <div>
                                <div class="mt-1 h-4 w-20 rounded bg-neutral-200"></div>
                                <div class="mt-1 h-4 w-32 rounded bg-neutral-200"></div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell class="hidden sm:table-cell">
                        <div class="h-6 w-24 rounded bg-neutral-200"></div>
                    </TableCell>
                    <TableCell>
                        <div class="h-8 w-8 rounded bg-neutral-200"></div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>
