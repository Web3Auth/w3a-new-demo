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
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          redirect: 'app/welcome'
        },
        {
          path: 'welcome',
          name: ROUTES.WELCOME,
          component: () => import('./views/Welcome.vue')
        },
        {
          path: 'wallet-ui',
          name: ROUTES.WALLET_UI,
          component: () => import('./views/WalletUi.vue')
        },
        {
          path: 'on-ramp',
          name: ROUTES.ON_RAMP,
          component: () => import('./views/OnRamp.vue')
        },
        {
          path: 'wallet-connect',
          name: ROUTES.WALLET_CONNECT,
          component: () => import('./views/WalletConnect.vue')
        },
        {
          path: 'nft-checkout',
          name: ROUTES.NFT_CHECKOUT,
          component: () => import('./views/NFTCheckout.vue')
        },
        {
          path: 'steps',
          name: ROUTES.STEPS,
          component: () => import('./views/Steps.vue')
        }
      ]
    }
  ]
})

trackRouter(router)

export default router
