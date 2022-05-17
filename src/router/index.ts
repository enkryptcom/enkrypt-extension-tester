import { createRouter, createWebHistory } from 'vue-router';
import DappTester from '../views/DappTester/DappTester.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DappTester',
      component: DappTester
    }
  ]
});

export default router;
