import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import { createRouter, createWebHashHistory } from 'vue-router';
import PrimeVue from 'primevue/config';

import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeicons/primeicons.css";
import "./style.css"

import App from './App.vue';


const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(PrimeVue);

app.mount('#app');
