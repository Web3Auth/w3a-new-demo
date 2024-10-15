import { reactive, watch } from 'vue'
import { setTheme } from '@/utils/common'
import { CustomConfig } from '@/utils/interface'
// import { useWeb3authStore } from '../store/web3authStore'
// import { useWeb3Auth } from '@web3auth/modal-vue-composables'

// const { isConnected, connect } = useWeb3Auth()
const config = reactive<CustomConfig>({
  dappName: '',
  addBrandLogo: false,
  logoUrl: 'https://images.web3auth.io/demo-logo.svg',
  useLogoAsLoader: false,
  selectedLanguage: 'en',
  isDark: false,
  primaryColor: '#0346ff',
  primaryTextColor: '#ffffff'
})

export default () => {
  function setActiveTheme() {
    config.isDark = !config.isDark
    setTheme(config.isDark)
  }
  return {
    config,
    setActiveTheme
  }
}
