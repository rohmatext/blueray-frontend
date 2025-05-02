<script setup lang="ts">
import { BlockStack, Page, TitleBar } from '@/components/page';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart } from '@/components/ui/chart-area';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';

const auth = useAuthStore();

const data = ref<{
    count: number;
    stats: { name: string; total: number; predicted: number }[];
}>(Object.assign({}));

const fetchStats = () => {
    axios
        .get('/api/stats', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((response) => {
            data.value = response.data.data;
        });
};
onMounted(fetchStats);
</script>

<template>
    <AppLayout>
        <Page max-width="lg">
            <TitleBar title="Dashboard" />
            <BlockStack>
                <Card>
                    <CardContent>
                        <div>
                            <div class="text-sm font-medium">Total Order</div>
                            <div class="text-3xl font-semibold">{{ data.count }}</div>
                        </div>
                    </CardContent>
                </Card>
                <AreaChart :data="data.stats" index="date" class="rounded-lg border" :categories="['count']" />
            </BlockStack>
        </Page>
    </AppLayout>
</template>
