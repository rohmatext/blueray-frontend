import router from '@/router';
import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia.use(({ store }) => (store.router = markRaw(router))));

app.mount('#app');
