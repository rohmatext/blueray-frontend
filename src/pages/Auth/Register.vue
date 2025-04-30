<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { Button } from '@/components/ui/button';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockStack } from '@/components/ui/page';
import { Separator } from '@/components/ui/separator';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { ValidationErrors } from '@/types';
import { useHead } from '@unhead/vue';
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

useHead({
    title: 'Daftar',
});

const auth = useAuthStore();

const errors = ref<ValidationErrors>({});
const isLoading = ref<boolean>(false);

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const visiblePassword = reactive({
    password: false,
    password_confirmation: false,
});

const togglePassword = () => {
    visiblePassword.password = !visiblePassword.password;
};

const togglePasswordConfirmation = () => {
    visiblePassword.password_confirmation = !visiblePassword.password_confirmation;
};

const submit = () => {
    auth.register({
        data: form,
        setErrors: (val) => (errors.value = val),
        setLoading: (val) => (isLoading.value = val),
        onError: (err) => console.error('Login failed:', err),
    });
};
</script>
<template>
    <AuthLayout title="Buat akun" description="Masukan detail akun pada form dibawah untuk membuat akun baru">
        <form @submit.prevent="submit">
            <BlockStack>
                <BlockStack class="gap-2">
                    <Label for="name">Nama lengkap</Label>
                    <Input id="name" type="text" :tabindex="1" autofocus v-model="form.name" />
                    <InputError />
                </BlockStack>

                <BlockStack class="gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" :tabindex="2" v-model="form.email" />
                    <InputError />
                </BlockStack>

                <BlockStack class="gap-2">
                    <Label for="password">Kata sandi</Label>
                    <div class="relative">
                        <Input
                            id="password"
                            class="pr-8"
                            :type="visiblePassword.password ? 'text' : 'password'"
                            :tabindex="3"
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
                    <InputError />
                </BlockStack>

                <BlockStack class="gap-2">
                    <Label for="password_confirmation">Konfirmasi kata sandi</Label>
                    <div class="relative">
                        <Input
                            id="password_confirmation"
                            class="pr-8"
                            :type="visiblePassword.password_confirmation ? 'text' : 'password'"
                            autofocus
                            :tabindex="4"
                            v-model="form.password_confirmation"
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
                    <InputError />
                </BlockStack>

                <BlockStack class="gap-2">
                    <Button :tabindex="5" type="submit" :disabled="isLoading">
                        <Loader :is-loading="isLoading" />
                        Daftar
                    </Button>
                </BlockStack>

                <Separator />

                <div class="text-muted-foreground text-center text-sm">
                    Sudah memiliki akun?
                    <RouterLink :to="{ name: 'login' }" :tabindex="6" class="text-primary font-semibold hover:underline">Masuk</RouterLink>
                </div>
            </BlockStack>
        </form>
    </AuthLayout>
</template>
