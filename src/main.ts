import router from '@/router';
import { createHead } from '@unhead/vue/client';
import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(router);
app.use(head);
app.use(pinia.use(({ store }) => (store.router = markRaw(router))));

app.mount('#app');
