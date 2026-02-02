import { createRouter, createWebHistory } from 'vue-router'
import FrontPage from '../pages/FrontPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/front',
      name: 'front',
      component: FrontPage,
    },
  ],
})

export default router
