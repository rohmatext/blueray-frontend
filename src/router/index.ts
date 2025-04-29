import routes from '@/router/routes';
import { useAuthStore } from '@/stores/auth';
import { Role } from '@/types';
import { useQueryClient } from '@tanstack/vue-query';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/*
 * guard route middleware
 */
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const queryClient = useQueryClient();
    const isAuthenticated = !!auth.user;

    if (!isAuthenticated && to.meta.guard === 'auth') {
        queryClient.removeQueries({ queryKey: ['user'] });
        return next({ name: 'login' });
    }

    if (isAuthenticated && to.meta.guard === 'guest') {
        return next({ name: 'dashboard' });
    }

    next();
});

/*
 * role based middleware
 */
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const isAuthenticated = !!auth.user;
    const role: string | undefined = (auth.user?.roles as Role[])?.[0]?.name;

    if (isAuthenticated && to.meta.role && role !== to.meta.role) {
        return next({ name: 'not-found' });
    }

    next();
});

export default router;
