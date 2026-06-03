import { createRouter, createWebHistory } from 'vue-router'
import Tables from '@/views/Tables.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Tables',
      name: 'Tables',
      component: Tables,
    }
  ],
})

export default router
