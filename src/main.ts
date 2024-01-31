import './globals'
import '@toruslabs/vue-components/style.css'
import './assets/main.css'
import { createIcons } from '@toruslabs/vue-components'

import { createPinia } from 'pinia'

import router from './routes'
import icons from './icons'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router).use(createPinia()).use(createIcons(icons))

app.mount('#app')
