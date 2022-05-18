import { createRouter, createWebHistory } from 'vue-router';
import DappTester from '../views/DappTester/DappTester.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'DappTester',
      component: DappTester
    }
  ]
});

export default router;
