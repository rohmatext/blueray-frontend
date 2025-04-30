import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { ApiResponse, User } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Form Types
 */
type LoginForm = {
    email: string;
    password: string;
};

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type ValidationErrors = Record<string, string[]>;

type FormHandler<T> = {
    data: T;
    setErrors: (errors: ValidationErrors) => void;
    setLoading: (loading: boolean) => void;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
};

/**
 * Auth Composable
 */
export const useAuth = () => {
    const auth = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();

    /**
     * Fetch authenticated user
     */
    const fetchUser = async (): Promise<User | undefined> => {
        try {
            const { data } = await axios.get<ApiResponse<User>>('api/profile');
            return data.data;
        } catch (error: any) {
            if (error.response?.status !== 409) throw error;
        }
    };

    const {
        data: user,
        error,
        isLoading: isLoadingUser,
    } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        retry: false,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
    });

    /**
     * Generic form handler
     */
    const handleForm = async <T extends Record<string, unknown>>(
        url: string,
        { data, onSuccess, onError, setErrors, setLoading }: FormHandler<T>,
    ) => {
        setLoading(true);
        setErrors({});

        try {
            await axios.post(url, data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onSuccess?.();
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

    const login = (form: FormHandler<LoginForm>) => {
        handleForm<LoginForm>('api/login', {
            ...form,
            onSuccess: () => {
                router.push({ name: 'dashboard' });
            },
        });
    };

    const register = (form: FormHandler<RegisterForm>) => {
        handleForm<RegisterForm>('api/register', {
            ...form,
            onSuccess: () => {
                router.push({ name: 'login', query: { registered: 'true' } });
            },
        });
    };

    const logout = async () => {
        try {
            await axios.post('api/logout');
        } catch (err) {
            console.error('Failed to log out:', err);
        } finally {
            auth.setUser(null);
            queryClient.removeQueries({ queryKey: ['user'] });
            router.push({ name: 'login' });
        }
    };

    /**
     * Sync with pinia store
     */
    watch(user, (newUser) => {
        if (newUser) {
            auth.setUser(newUser);
        }
    });

    return {
        user: computed(() => user.value || null),
        error,
        login,
        register,
        logout,
        isLoadingUser,
    };
};
