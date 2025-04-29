<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockStack } from '@/components/ui/page';
import { Separator } from '@/components/ui/separator';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useHead } from '@unhead/vue';
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

useHead({
    title: 'Login',
});

const visiblePassword = reactive({
    password: false,
});

const togglePassword = () => {
    visiblePassword.password = !visiblePassword.password;
};

const submit = () => {
    // Handle form submission
};
</script>
<template>
    <AuthLayout title="Login ke akun" description="Masukan email dan password untuk login ke akun">
        <form @submit.prevent="submit">
            <BlockStack>
                <BlockStack class="gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" autofocus :tabindex="1" placeholder="email@example.com" />
                    <InputError />
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
                    <Button :tabindex="3">Masuk</Button>
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
