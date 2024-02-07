import { POLYGON_MUMBAI_CHAIN_ID, SUPPORTED_NETWORKS } from '@toruslabs/ethereum-controllers'
import { getDefaultExternalAdapters } from '@web3auth/default-evm-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3Auth, type Web3AuthOptions } from '@web3auth/modal'
import { defineStore } from 'pinia'
import { ref, shallowRef, triggerRef, computed } from 'vue'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin'
import { OpenloginAdapter, type OpenloginUserInfo } from '@web3auth/openlogin-adapter'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/common'

export const useWeb3authStore = defineStore('web3auth', () => {
  const web3Auth = shallowRef<Web3Auth | null>(null)
  const provider = shallowRef<BrowserProvider | null>(null)
  const walletServicesPlugin = shallowRef<WalletServicesPlugin | null>(null)

  const router = useRouter()

  const accounts = ref<JsonRpcSigner[]>([])
  const userInfo = ref<Partial<OpenloginUserInfo> | null>(null)

  async function initializeWeb3Auth() {
    const chainConfig = {
      ...SUPPORTED_NETWORKS[POLYGON_MUMBAI_CHAIN_ID],
      rpcTarget: 'https://polygon-mumbai.infura.io/v3/aacd62799a1a4b919aa46ce261c790f6'
    }

    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: { chainConfig },
      state: { chainId: POLYGON_MUMBAI_CHAIN_ID }
    })

    const web3AuthOptions: Web3AuthOptions = {
      enableLogging: true,
      chainConfig,
      clientId:
        'BJ57yveG_XBLqZUpjtJCnJMrord0AaXpd_9OSy4HzkxpnpPn6Co73h-vR6GEI1VogtW4yMHq13GNPKmVpliFXY0',
      privateKeyProvider: privateKeyProvider,
      uiConfig: {
        uxMode: 'redirect',
        logoDark: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        logoLight: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
      },
      web3AuthNetwork: 'sapphire_mainnet'
    }

    web3Auth.value = new Web3Auth(web3AuthOptions)

    // TODO: remove this in prod
    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: { buildEnv: 'testing' }
    })
    web3Auth.value.configureAdapter(openloginAdapter)

    const adapters = await getDefaultExternalAdapters({ options: web3AuthOptions })

    adapters.forEach((adapter) => {
      web3Auth.value?.configureAdapter(adapter)
    })

    walletServicesPlugin.value = new WalletServicesPlugin({
      wsEmbedOpts: {},
      walletInitOptions: { whiteLabel: { showWidgetButton: true } }
    })

    web3Auth.value.addPlugin(walletServicesPlugin.value)

    web3Auth.value.on('connected', async () => {
      console.log('check: connected')
    })

    await web3Auth.value.initModal()

    provider.value = new BrowserProvider(web3Auth.value?.provider!)
    console.log('logging', web3Auth.value?.connectedAdapterName)
    triggerRef(web3Auth)
    if (web3Auth.value?.connected) {
      accounts.value = provider.value ? await provider.value?.listAccounts() : []
      userInfo.value = await web3Auth.value.getUserInfo()
      router.push({ name: ROUTES.WELCOME })
    }
  }

  async function connectToWeb3Auth() {
    console.log('logging', web3Auth.value)
    const localProvider = await web3Auth.value?.connect()
    console.log(localProvider, 'available')
    // because it's shallow ref, have to trigger again
    triggerRef(web3Auth)
    if (web3Auth.value?.connected) {
      accounts.value = provider.value ? await provider.value?.listAccounts() : []
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
    const from = accounts.value[0].address
    const signedMessage = await provider.value?.send('personal_sign', [message, from])
    return signedMessage
  }

  async function showWalletUi() {
    return walletServicesPlugin.value?.showWalletUi()
  }

  function initiateTopUpPlugin() {
    return walletServicesPlugin.value?.showCheckout()
  }

  function initiateWalletConnect() {
    return walletServicesPlugin.value?.showWalletConnectScanner()
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
    initiateWalletConnect
  }
})
