import { createRouter, createWebHistory } from 'vue-router'
import Tables from '@/views/TablesView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/TablesView',
      name: 'Tables',
      component: Tables,
    }
  ],
})

export default router
