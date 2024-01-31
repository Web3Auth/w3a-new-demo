import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/app',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          redirect: 'app/welcome'
        },
        {
          path: 'welcome',
          name: 'Welcome',
          component: () => import('./views/Welcome.vue')
        },
        {
          path: 'mpc',
          name: 'Mpc',
          component: () => import('./views/Mpc.vue')
        },
        {
          path: 'wallet-ui',
          name: 'WalletUi',
          component: () => import('./views/WalletUi.vue')
        },
        {
          path: 'on-ramp',
          name: 'OnRamp',
          component: () => import('./views/OnRamp.vue')
        },
        {
          path: 'wallet-connect',
          name: 'WalletConnect',
          component: () => import('./views/WalletConnect.vue')
        }
      ]
    }
  ]
})

export default router
