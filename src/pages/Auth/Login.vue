<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockStack } from '@/components/ui/page';
import { Separator } from '@/components/ui/separator';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { LoginForm, ValidationErrors } from '@/types';
import { useHead } from '@unhead/vue';
import { useSessionStorage } from '@vueuse/core';
import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

const auth = useAuthStore();

useHead({
    title: 'Login',
});

const form = reactive<LoginForm>({
    email: '',
    password: '',
});

const registered = useSessionStorage('registered', true);

const errors = ref<ValidationErrors>({});
const isLoading = ref<boolean>(false);

const visiblePassword = reactive({
    password: false,
});

const togglePassword = () => {
    visiblePassword.password = !visiblePassword.password;
};

const submit = () => {
    auth.login({
        data: form,
        setErrors: (val) => (errors.value = val),
        setLoading: (val) => (isLoading.value = val),
        onError: (err) => console.error('Login failed:', err),
    });
};
</script>

<template>
    <AuthLayout title="Login ke akun" description="Masukan email dan password untuk login ke akun">
        <form @submit.prevent="submit">
            <BlockStack>
                <Alert v-if="registered">
                    <InfoIcon class="size-6" />
                    <AlertDescription> Silahkan login dengan email dan kata sandi yang telah didaftarkan sebelumnya. </AlertDescription>
                </Alert>
                <BlockStack class="gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" autofocus :tabindex="1" placeholder="email@example.com" v-model="form.email" />
                    <InputError :message="errors.email" />
                </BlockStack>

                <BlockStack class="gap-2">
                    <Label for="password">Kata sandi</Label>
                    <div class="relative">
                        <Input
                            id="password"
                            class="pr-8"
                            :type="visiblePassword.password ? 'text' : 'password'"
                            autofocus
                            :tabindex="2"
                            placeholder="Kata sandi"
                            v-model="form.password"
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
                    <Button :tabindex="3" :disabled="isLoading" type="submit">
                        <Loader :is-loading="isLoading" />
                        Masuk
                    </Button>
                </BlockStack>

                <Separator />

                <div class="text-muted-foreground text-center text-sm">
                    Tidak memiliki akun?
                    <RouterLink :to="{ name: 'register' }" :tabindex="4" class="text-primary font-semibold hover:underline">Daftar</RouterLink>
                </div>
            </BlockStack>
        </form>
    </AuthLayout>
</template>
