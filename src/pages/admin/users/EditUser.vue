<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { BlockStack, Page, TitleBar } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import FormSkeleton from '@/pages/admin/users/skeleton/FormSkeleton.vue';
import { useAuthStore } from '@/stores/auth';
import { ValidationErrors } from '@/types';
import { useQueryClient } from '@tanstack/vue-query';
import { useHead } from '@unhead/vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

interface UserForm {
    name: string;
    email: string;
}

useHead({
    title: 'Edit Pengguna',
});

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

const errors = ref<ValidationErrors>({});
const isPageLoading = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const form = reactive<UserForm>({
    name: '',
    email: '',
});

const fetchUser = () => {
    if (!route.params.id) return;

    isPageLoading.value = true;
    axios
        .get(`/api/users/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((res) => {
            form.name = res.data.data.name;
            form.email = res.data.data.email;
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            isPageLoading.value = false;
        });
};

onMounted(() => {
    fetchUser();
});

const submit = () => {
    isLoading.value = true;
    axios
        .patch(`/api/users/${route.params.id}`, form, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((res) => {
            router.push({ name: 'admin.users' });
            toast.success(res.data.message);
            queryClient.invalidateQueries({ queryKey: ['users'] });
        })
        .catch((err) => {
            if (err.response.status !== 422) throw err;

            errors.value = err.response.data.errors;
        })
        .finally(() => {
            isLoading.value = false;
        });
};
</script>

<template>
    <AppLayout>
        <Page max-width="sm">
            <TitleBar title="Edit Pengguna" :navigation="{ name: 'admin.users' }" />
            <BlockStack>
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormSkeleton v-if="isPageLoading" />
                        <form @submit.prevent="submit" v-else>
                            <BlockStack>
                                <BlockStack class="gap-2">
                                    <Label for="name">Nama lengkap</Label>
                                    <Input id="name" type="text" autofocus :tabindex="1" v-model="form.name" />
                                    <InputError :message="errors.name" />
                                </BlockStack>

                                <BlockStack class="gap-2">
                                    <Label for="email">Email</Label>
                                    <Input id="email" type="email" :tabindex="2" placeholder="email@example.com" v-model="form.email" />
                                    <InputError :message="errors.email" />
                                </BlockStack>

                                <BlockStack class="flex-row">
                                    <Button :tabindex="3" type="submit" :disabled="isLoading">
                                        <Loader :is-loading="isLoading" />
                                        Simpan
                                    </Button>
                                </BlockStack>
                            </BlockStack>
                        </form>
                    </CardContent>
                </Card>
            </BlockStack>
        </Page>
    </AppLayout>
</template>
