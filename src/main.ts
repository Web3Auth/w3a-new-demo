import './globals'
import './assets/main.css'
import { createIcons } from '@toruslabs/vue-components/icons'
import VueGtag from 'vue-gtag-next'
import { createGtm } from '@gtm-support/vue-gtm'

import { createPinia } from 'pinia'

import router from './routes'
import icons from './icons'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app
  .use(router)
  .use(createPinia())
  .use(createIcons(icons))
  .use(VueGtag, {
    property: { id: 'G-065WFNK5DW' }
  })
  .use(
    createGtm({
      id: 'GTM-W6THP68T',
      vueRouter: router
    })
  )

app.mount('#app')
