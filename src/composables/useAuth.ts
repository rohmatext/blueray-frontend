import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { ApiResponse, User } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

interface UseAuthOptions {
    guard?: 'auth' | 'guest';
    redirectIfAuthenticated?: string;
}

interface LoginForm {
    email: string;
    password: string;
    setErrors: (errors: Record<string, string[]>) => void;
    isLoading: (loading: boolean) => void;
}

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    setErrors: (errors: Record<string, string[]>) => void;
    isLoading: (loading: boolean) => void;
}

export const useAuth = ({ guard, redirectIfAuthenticated }: UseAuthOptions) => {
    const auth = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();

    const fetchUser = async (): Promise<User | undefined> => {
        try {
            const { data } = await axios.get<ApiResponse<User>>('api/profile');
            return data.data;
        } catch (error: any) {
            if (error.response?.status !== 409) throw error; // Validasi error
        }
    };

    const {
        data: user,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        retry: false,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
    });

    const login = async ({ setErrors, isLoading: setLoading, ...form }: LoginForm) => {
        setLoading(true);

        try {
            const { data } = await axios.post('api/login', form);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        } catch (err: any) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                console.error('Login failed:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ setErrors, isLoading: setLoading, ...props }: RegisterForm) => {
        setLoading(true);
        setErrors({}); // Reset errors

        try {
            await axios.post('api/register', props);
            router.push({ name: 'login', query: { registered: 'true' } });
        } catch (err: any) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                console.error('Registration failed:', err);
            }
        } finally {
            setLoading(false);
        }
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

    watch(
        () => [user.value, error],
        ([u, err]) => {
            if (guard === 'guest' && u) router.push({ name: redirectIfAuthenticated || 'home' });
            if (guard === 'auth' && err) logout();
        },
        { immediate: true },
    );

    watch(user, (newUser) => {
        if (newUser) {
            auth.setUser(newUser);
        }
    });

    return {
        user: computed(() => user.value || null),
        login,
        register,
        logout,
        isLoading,
    };
};
