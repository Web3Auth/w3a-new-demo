import './globals'
import './assets/main.css'

import { createGtm } from '@gtm-support/vue-gtm'
import { createIcons } from '@toruslabs/vue-components/icons'
import { LANGUAGE_TYPE } from '@web3auth/auth-adapter'
import { createApp } from 'vue'

import App from './App.vue'
import icons from './icons'
import i18n, { loadLanguageAsync } from './plugins/i18n-setup'

const app = createApp(App)

app
  .use(i18n)
  .use(createIcons(icons))
  .use(
    createGtm({
      id: 'GTM-NFBSNHL'
    })
  )

loadLanguageAsync((localStorage.getItem('selectedLanguage') || 'en') as LANGUAGE_TYPE)

app.mount('#app')
