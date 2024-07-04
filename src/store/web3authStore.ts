import { MAINNET_CHAIN_ID, SUPPORTED_NETWORKS } from '@toruslabs/ethereum-controllers'
import { SafeEventEmitterProvider } from '@toruslabs/openlogin-jrpc'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { defineStore } from 'pinia'
import { ref, shallowRef, triggerRef, computed } from 'vue'
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin'
import {
  OpenloginAdapter,
  OpenloginLoginParams,
  type OpenloginUserInfo
} from '@web3auth/openlogin-adapter'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/common'
import { WALLET_ADAPTERS } from '@web3auth/base'

export const useWeb3authStore = defineStore('web3auth', () => {
  const web3Auth = shallowRef<Web3AuthNoModal | null>(null)
  const provider = shallowRef<SafeEventEmitterProvider | null>(null)
  const walletServicesPlugin = shallowRef<WalletServicesPlugin | null>(null)

  const router = useRouter()

  const accounts = ref<string[]>([])
  const userInfo = ref<Partial<OpenloginUserInfo> | null>(null)

  async function initializeWeb3Auth() {
    const chainConfig = {
      ...SUPPORTED_NETWORKS[MAINNET_CHAIN_ID]
    }

    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: { chainConfig },
      state: { chainId: MAINNET_CHAIN_ID }
    })

    web3Auth.value = new Web3AuthNoModal({
      enableLogging: true,
      chainConfig,
      clientId:
        'BNI_pZZpoH4tqzbDDMKwfLOWujTif_kek4h9QEN271Gu0JheYDPEUHNKMl5Nnw5PGOjK-SOxp1RpUdG9TJufMZk',
      web3AuthNetwork: 'sapphire_mainnet',
      privateKeyProvider: privateKeyProvider
    })

    const openloginAdapter = new OpenloginAdapter({
      privateKeyProvider
    })
    web3Auth.value.configureAdapter(openloginAdapter)

    walletServicesPlugin.value = new WalletServicesPlugin({
      walletInitOptions: {
        confirmationStrategy: 'modal',
        whiteLabel: {
          logoLight: 'https://images.web3auth.io/web3auth-logo-w.svg',
          logoDark: 'https://images.web3auth.io/web3auth-logo-w-light.svg',
          mode: 'light'
        }
      }
    })

    web3Auth.value.addPlugin(walletServicesPlugin.value)

    web3Auth.value.on('connected', async () => {
      console.log('check: connected')
    })

    await web3Auth.value.init()

    provider.value = web3Auth.value?.provider!
    console.log('logging', web3Auth.value?.connectedAdapterName)
    triggerRef(web3Auth)
    if (web3Auth.value?.connected) {
      accounts.value = provider.value
        ? ((await provider.value?.request<never, string[]>({ method: 'eth_accounts' })) as string[])
        : []
      userInfo.value = await web3Auth.value.getUserInfo()
      router.push({ name: ROUTES.WELCOME })
    }
  }

  async function connectToWeb3Auth({
    loginProvider,
    login_hint = ''
  }: {
    loginProvider: OpenloginLoginParams['loginProvider']
    login_hint?: OpenloginLoginParams['login_hint']
  }) {
    console.log('logging', web3Auth.value)
    const localProvider = await web3Auth.value!.connectTo<OpenloginLoginParams>(
      WALLET_ADAPTERS.OPENLOGIN,
      { loginProvider, login_hint }
    )
    console.log(localProvider, 'available')
    // because it's shallow ref, have to trigger again
    triggerRef(web3Auth)
    if (web3Auth.value?.connected) {
      accounts.value = provider.value
        ? ((await provider.value?.request<never, string[]>({ method: 'eth_accounts' })) as string[])
        : []
      userInfo.value = await web3Auth.value.getUserInfo()
      router.push({ name: ROUTES.WELCOME })
    }
  }

  async function logoutWeb3Auth() {
    await web3Auth.value?.logout()
    // todo: connected is not changing after social login logout
    triggerRef(web3Auth)
  }

  async function signedMessage() {
    const message = 'Example `personal_sign` message'
    const from = accounts.value[0]
    const signedMessage = await walletServicesPlugin.value?.proxyProvider?.request<
      [string, string],
      string
    >({
      method: 'personal_sign',
      params: [message, from]
    })
    return signedMessage
  }

  async function showWalletUi() {
    return walletServicesPlugin.value?.showWalletUi()
  }

  function initiateTopUpPlugin() {
    if (!walletServicesPlugin.value) return console.error('Wallet Services Plugin not initialized')
    return walletServicesPlugin.value.showCheckout()
  }

  function initiateWalletConnect() {
    if (!walletServicesPlugin.value) return console.error('Wallet Services Plugin not initialized')
    return walletServicesPlugin.value.showWalletConnectScanner()
  }

  async function enableMfa() {
    return web3Auth.value?.enableMFA()
  }

  const isLoggedIn = computed(() => {
    return web3Auth.value?.connected
  })

  return {
    web3Auth,
    accounts,
    userInfo,
    isLoggedIn,
    initializeWeb3Auth,
    connectToWeb3Auth,
    logoutWeb3Auth,
    showWalletUi,
    signedMessage,
    initiateTopUpPlugin,
    initiateWalletConnect,
    enableMfa
  }
})
