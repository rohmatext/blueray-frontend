import { LucideIcon } from 'lucide-vue-next';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Role {
    id: number;
    name: string;
}

export interface ApiResponse<T = unknown> {
    data: T;
    message: string;
    [key: string]: unknown;
}

export interface LoginForm {
    email: string;
    password: string;
    [key: string]: unknown;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    [key: string]: unknown;
}

export interface ValidationErrors {
    [key: string]: string[];
}

export interface FormHandler<T> {
    data: T;
    setErrors: (errors: ValidationErrors) => void;
    setLoading: (loading: boolean) => void;
    onSuccess?: (res: unknown) => void;
    onError?: (err: unknown) => void;
}

export interface NavItem {
    label: string;
    icon?: LucideIcon;
    to: string | NavRoute;
    active: (route: RouteLocationNormalizedLoaded) => boolean;
}

export interface NavRoute {
    name: string;
    params?: Record<string, string>;
    query?: Record<string, string>;
}
