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
    messsage: string;
    [key: string]: unknown;
}
