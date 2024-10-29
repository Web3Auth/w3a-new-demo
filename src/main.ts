import './globals'
import './assets/main.css'
import { createIcons } from '@toruslabs/vue-components/icons'
import { createGtm } from '@gtm-support/vue-gtm'

import icons from './icons'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(createIcons(icons)).use(
  createGtm({
    id: 'GTM-NFBSNHL'
  })
)

app.mount('#app')
