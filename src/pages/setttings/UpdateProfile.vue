<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { BlockStack, Page, TitleBar } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { User, ValidationErrors } from '@/types';
import { useHead } from '@unhead/vue';
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue-sonner';

interface UserForm {
    name: string;
    email: string;
}

useHead({
    title: 'Update Profile',
});

const auth = useAuthStore();
const errors = ref<ValidationErrors>({});
const isLoading = ref<boolean>(false);

const form = reactive<UserForm>({
    name: '',
    email: '',
});

onMounted(() => {
    const user: User | null = auth.user;
    form.name = user?.name || '';
    form.email = user?.email || '';
});

const submit = () => {
    isLoading.value = true;
    axios
        .patch(`/api/profile`, form, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((res) => {
            toast.success(res.data.message);
            auth.setUser({ ...auth.user, ...res.data.data });
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
            <TitleBar title="Update Profile" />
            <BlockStack>
                <Card>
                    <CardContent>
                        <form @submit.prevent="submit">
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
