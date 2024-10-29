import './globals'
import './assets/main.css'

import { createGtm } from '@gtm-support/vue-gtm'
import { createIcons } from '@toruslabs/vue-components/icons'
import { createApp } from 'vue'

import App from './App.vue'
import icons from './icons'

const app = createApp(App)

app.use(createIcons(icons)).use(
  createGtm({
    id: 'GTM-NFBSNHL'
  })
)

app.mount('#app')
