import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import RoutPage from '@/pages/RoutPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'MainPage', component: MainPage, path: '/' },
  { name: 'rout', component: RoutPage, path: '/rout/:id' },
];

const router = new VueRouter({
  routes,
});

export default router;
