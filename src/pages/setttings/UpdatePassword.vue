<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { BlockStack, Page } from '@/components/page';
import TitleBar from '@/components/page/TitleBar.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { useHead } from '@unhead/vue';
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';
import { useField, useForm } from 'vee-validate';
import { reactive, Ref } from 'vue';
import { toast } from 'vue-sonner';

useHead({
    title: 'Ganti Password',
});

const auth = useAuthStore();

const { errors, handleSubmit, isSubmitting, setErrors, resetForm } = useForm({
    initialValues: {
        current_password: '',
        password: '',
        password_confirmation: '',
    },
});

const { value: current_password }: { value: Ref<string> } = useField('current_password');
const { value: password }: { value: Ref<string> } = useField('password');
const { value: password_confirmation }: { value: Ref<string> } = useField('password_confirmation');

const visiblePassword = reactive({
    current_password: false,
    password: false,
    password_confirmation: false,
});

const toggleCurrentPassword = () => {
    visiblePassword.current_password = !visiblePassword.current_password;
};

const togglePassword = () => {
    visiblePassword.password = !visiblePassword.password;
};

const togglePasswordConfirmation = () => {
    visiblePassword.password_confirmation = !visiblePassword.password_confirmation;
};

const submit = handleSubmit(async (values) => {
    try {
        const { data } = await axios.patch('/api/password', values, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });

        toast.success(data.message);
        resetForm();
    } catch (err: any) {
        if (err.response.status !== 422) throw err;

        resetForm({
            errors: err.response.data.errors,
        });
    } finally {
    }
});
</script>

<template>
    <AppLayout>
        <Page class="max-w-md">
            <TitleBar title="Ganti Password" />
            <Card>
                <CardContent>
                    <form @submit.prevent="submit">
                        <BlockStack>
                            <BlockStack class="gap-2">
                                <Label for="current_password">Kata sandi</Label>
                                <div class="relative">
                                    <Input
                                        id="current_password"
                                        class="pr-8"
                                        :type="visiblePassword.current_password ? 'text' : 'password'"
                                        :tabindex="1"
                                        v-model="current_password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        @click="toggleCurrentPassword"
                                        class="text-muted-foreground absolute top-1/2 right-1 size-7 -translate-y-1/2"
                                        :tabindex="-1"
                                    >
                                        <EyeIcon v-if="!visiblePassword.current_password" />
                                        <EyeOffIcon v-else />
                                    </Button>
                                </div>
                                <InputError :message="errors.current_password" />
                            </BlockStack>

                            <BlockStack class="gap-2">
                                <Label for="password">Kata sandi</Label>
                                <div class="relative">
                                    <Input
                                        id="password"
                                        class="pr-8"
                                        :type="visiblePassword.password ? 'text' : 'password'"
                                        :tabindex="2"
                                        v-model="password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        @click="togglePassword"
                                        class="text-muted-foreground absolute top-1/2 right-1 size-7 -translate-y-1/2"
                                        :tabindex="-1"
                                    >
                                        <EyeIcon v-if="!visiblePassword.password" />
                                        <EyeOffIcon v-else />
                                    </Button>
                                </div>
                                <InputError :message="errors.password" />
                            </BlockStack>

                            <BlockStack class="gap-2">
                                <Label for="password_confirmation">Konfirmasi kata sandi</Label>
                                <div class="relative">
                                    <Input
                                        id="password_confirmation"
                                        class="pr-8"
                                        :type="visiblePassword.password_confirmation ? 'text' : 'password'"
                                        autofocus
                                        :tabindex="3"
                                        v-model="password_confirmation"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        @click="togglePasswordConfirmation"
                                        class="text-muted-foreground absolute top-1/2 right-1 size-7 -translate-y-1/2"
                                        :tabindex="-1"
                                    >
                                        <EyeIcon v-if="!visiblePassword.password_confirmation" />
                                        <EyeOffIcon v-else />
                                    </Button>
                                </div>
                                <InputError :message="errors.password_confirmation" />
                            </BlockStack>

                            <BlockStack class="flex-row gap-2">
                                <Button :tabindex="4" type="submit" :disabled="isSubmitting">
                                    <Loader :is-loading="isSubmitting" />
                                    Ganti password
                                </Button>
                            </BlockStack>
                        </BlockStack>
                    </form>
                </CardContent>
            </Card>
        </Page>
    </AppLayout>
</template>
