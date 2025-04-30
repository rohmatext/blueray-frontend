import router from '@/router';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createHead } from '@unhead/vue/client';
import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();
const queryClient = new QueryClient();

app.use(router);
app.use(head);
app.use(VueQueryPlugin, { queryClient });
app.use(pinia.use(({ store }) => (store.router = markRaw(router))));

app.mount('#app');
