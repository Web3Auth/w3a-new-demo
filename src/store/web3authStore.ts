import { POLYGON_MUMBAI_CHAIN_ID, SUPPORTED_NETWORKS } from '@toruslabs/ethereum-controllers'
import { getDefaultAdapters } from '@web3auth/default-evm-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3Auth, type Web3AuthOptions } from '@web3auth/modal'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { BrowserProvider } from 'ethers'
import { WalletServicesConnectorPlugin } from '@web3auth/wallet-services-plugin'
import type { JsonRpcSigner } from 'ethers'

export const useWeb3Auth = defineStore('web3auth', () => {
  let web3Auth: Web3Auth | null = null
  let provider: BrowserProvider
  let walletServicesPlugin: WalletServicesConnectorPlugin | null = null

  const isLoggedIn = ref(false)
  const accounts: Ref<JsonRpcSigner[]> = ref([])
  const userInfo: Ref<any> = ref(null)

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
      chainConfig: { ...chainConfig, chainNamespace: 'eip155' },
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

    web3Auth = new Web3Auth(web3AuthOptions)

    const adapters = await getDefaultAdapters({ options: web3AuthOptions })

    adapters.forEach((adapter) => {
      web3Auth?.configureAdapter(adapter)
    })

    walletServicesPlugin = new WalletServicesConnectorPlugin({
      wsEmbedOpts: {},
      walletInitOptions: { whiteLabel: { showWidgetButton: true } }
    })

    await web3Auth.addPlugin(walletServicesPlugin)

    web3Auth.on('connected', () => {
      console.log('check: connected')
    })

    await web3Auth.initModal()

    provider = new BrowserProvider(web3Auth.provider!)
  }

  async function connectToWeb3Auth() {
    await web3Auth?.connect()
    console.log('walletServicesPlugin', walletServicesPlugin)

    if (web3Auth?.connected) {
      isLoggedIn.value = true
      accounts.value = await provider.listAccounts()
      userInfo.value = await web3Auth.getUserInfo()
    }
  }

  async function logoutWeb3Auth() {
    return web3Auth?.logout()
  }

  function showWalletUi() {
    console.log('walletServicesPlugin', walletServicesPlugin)
    walletServicesPlugin?.showWalletUi()
  }

  async function signedMessage() {
    const message = 'Example `personal_sign` message'
    const from = accounts.value[0].address
    const signedMessage = await provider?.send('personal_sign', [message, from])
    return signedMessage
  }

  return {
    web3Auth,
    isLoggedIn,
    accounts,
    userInfo,
    initializeWeb3Auth,
    connectToWeb3Auth,
    logoutWeb3Auth,
    showWalletUi,
    signedMessage
  }
})
