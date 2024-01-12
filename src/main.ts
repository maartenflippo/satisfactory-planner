import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import { createRouter, createWebHashHistory } from 'vue-router';
import PrimeVue from 'primevue/config';

import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeicons/primeicons.css";

import App from './App.vue';
import ProductionLineWrapper from './components/ProductionLineWrapper.vue';
import SelectOrCreateProductionLine from './components/SelectOrCreateProductionLine.vue';

// const routes = [
//     { path: "/", component: SelectOrCreateProductionLine },
//     { path: "/p/:slug", component: ProductionLineWrapper, props: true },
// ];
// 
// const router = createRouter({
//     // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
//     history: createWebHashHistory(),
//     routes,
// });

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
// app.use(router);
app.use(PrimeVue);

app.mount('#app');
