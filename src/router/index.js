import { createRouter, createWebHistory } from 'vue-router'
import { dashboardRoutes } from './dashboardRoutes'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    name: 'HomeLayout',
    redirect: '/dashboard',
    children: dashboardRoutes,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
