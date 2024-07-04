import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from './constants/common'
import { trackRouter } from 'vue-gtag-next'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.LOGIN,
      component: () => import('./views/Login.vue')
    },
    {
      path: '/app',
      name: ROUTES.HOME,
      component: () => import('./views/Home.vue')
    }
  ]
})

trackRouter(router)

export default router
