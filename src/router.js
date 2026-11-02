import { createRouter, createWebHashHistory } from 'vue-router';
import DemosView from './views/DemosView.vue';

const routes = [
    { path: '/', name: 'demos', component: DemosView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

// Hash history: works on GitHub Pages without any server-side rewrite rules.
export default createRouter({ history: createWebHashHistory(), routes });
