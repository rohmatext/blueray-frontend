import routes from '@/router/routes';
import { useAuthStore } from '@/stores/auth';
import { Role, User } from '@/types';
import { useSessionStorage } from '@vueuse/core';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/*
 * guard route middleware
 */
router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    let user: User | null = auth.user;

    /**
     * Check if token is valid
     */
    if (auth.token && !auth.check()) {
        auth.setUser(null);
        auth.setToken(null);
        return next({ name: 'login' });
    }

    /**
     * Initialize user
     */
    if (!user && auth.token) {
        try {
            user = await auth.initUser();
            auth.setUser(user);
        } catch {
            auth.setUser(null);
            auth.setToken(null);
        }
    }

    /**
     * Check if user is authenticated
     */
    const isAuthenticated = !!auth.user;

    if (!isAuthenticated && to.meta.guard === 'auth') {
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
    const roles = (auth.user?.roles as Role[]) || [];
    const isAuthorized = roles.some((r: Role) => r.name === to.meta.role);

    if (isAuthenticated && to.path === '/dashboard') {
        return next({ name: roles.at(0)?.name });
    }

    if (isAuthenticated && to.meta.role && !isAuthorized) {
        return next({ name: 'not-found' });
    }

    next();
});

/*
 * Check if user is registered
 */
router.isReady().then(() => {
    const isRegistered = useSessionStorage('registered', true);
    if (isRegistered.value) {
        isRegistered.value = false;
    }
});

export default router;
