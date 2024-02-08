import './globals'
import '@toruslabs/vue-components/style.css'
import './assets/main.css'
import { createIcons } from '@toruslabs/vue-components'
import VueGtag from 'vue-gtag'
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
  .use(
    VueGtag,
    {
      config: { id: 'G-065WFNK5DW' }
    },
    router
  )

app.mount('#app')
