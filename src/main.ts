import router from '@/router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createHead } from '@unhead/vue/client';
import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();
const query = VueQueryPlugin;

app.use(router);
app.use(head);
app.use(query);
app.use(pinia.use(({ store }) => (store.router = markRaw(router))));

app.mount('#app');
