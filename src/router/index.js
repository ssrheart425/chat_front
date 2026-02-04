import { createRouter, createWebHistory } from 'vue-router'
import FrontPage from '../pages/FrontPage.vue'
import SendMessagePage from '../pages/SendMessagePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FrontPage,
    },
    {
      path: '/send',
      name: 'send',
      component: SendMessagePage,
    },
  ],
})

export default router
