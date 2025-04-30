import axios from '@/lib/axios';
import router from '@/router';
import { FormHandler, LoginForm, RegisterForm, User } from '@/types';
import { useLocalStorage, useSessionStorage } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { Ref } from 'vue';

const handleForm = async <T extends Record<string, unknown>>(url: string, { data, onSuccess, onError, setErrors, setLoading }: FormHandler<T>) => {
    setLoading(true);
    setErrors({});
    try {
        const response = await axios.post(url, data);
        onSuccess?.(response.data);
    } catch (err: any) {
        if (err.response?.status === 422) {
            setErrors(err.response.data.errors);
        } else {
            console.error('Failed submitting form:', err);
            onError?.(err);
        }
    } finally {
        setLoading(false);
    }
};

export const useAuthStore = defineStore('auth', {
    state: (): { user: User | null; token: Ref<string | null> } => ({
        user: null,
        token: useLocalStorage('token', null),
    }),
    actions: {
        async check() {
            if (!this.token) return false;

            try {
                await axios.get('/api/ping', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                return true;
            } catch (err) {
                this.setUser(null);
                this.setToken(null);
                return false;
            }
        },

        async initUser() {
            try {
                const { data } = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.setUser(data.data);
                return data.data;
            } catch (err) {
                this.setUser(null);
                this.setToken(null);
                return false;
            }
        },

        setUser(user: User | null) {
            this.user = user;
        },

        setToken(token: string | null) {
            this.token = token;
        },

        async login(form: FormHandler<LoginForm>) {
            handleForm<LoginForm>('api/login', {
                ...form,
                onSuccess: (res) => {
                    const result = res as { token: string };
                    this.setToken(result.token);
                    router.push({ name: 'dashboard' });
                },
            });
        },
        async register(form: FormHandler<RegisterForm>) {
            handleForm<RegisterForm>('api/register', {
                ...form,
                onSuccess: () => {
                    router.push({ name: 'login' });
                    const registered = useSessionStorage('registered', true);
                    registered.value = true;
                },
            });
        },
        async logout() {
            try {
                await axios.delete('api/logout', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                this.setUser(null);
                this.setToken(null);

                router.push({ name: 'login' });
            } catch (err) {
                console.error('Failed to log out:', err);
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
