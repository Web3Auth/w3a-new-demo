import { LANGUAGE_TYPE } from '@web3auth/auth-adapter'
import { ref } from 'vue'

import { setTheme } from '@/utils/common'
import { CustomConfig } from '@/utils/interface'

const selectedLanguage = localStorage.getItem('selectedLanguage') as LANGUAGE_TYPE

const config = ref<CustomConfig>({
  dappName: '',
  addBrandLogo: false,
  logoUrl: 'https://images.web3auth.io/demo-logo.svg',
  useLogoAsLoader: false,
  selectedLanguage: selectedLanguage || 'en',
  isDark: false,
  primaryColor: '#0346ff',
  primaryTextColor: '#ffffff'
})

export default () => {
  function setActiveTheme() {
    config.value.isDark = !config.value.isDark
    setTheme(config.value.isDark)
  }
  return {
    config,
    setActiveTheme
  }
}
