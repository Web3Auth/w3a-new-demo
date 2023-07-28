import '@toruslabs/vue-components/dist/style.css'
import './assets/main.css'
import { createIcons } from '@toruslabs/vue-components'

import icons from './icons'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(createIcons(icons))

app.mount('#app')
