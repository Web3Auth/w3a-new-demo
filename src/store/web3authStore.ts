import { POLYGON_MUMBAI_CHAIN_ID, SUPPORTED_NETWORKS } from '@toruslabs/ethereum-controllers'
import { getDefaultAdapters } from '@web3auth/default-evm-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3Auth, type Web3AuthOptions } from '@web3auth/modal'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { BrowserProvider } from 'ethers'
import { WalletServicesConnectorPlugin } from '@web3auth/wallet-services-plugin'
import { plugin } from 'postcss'

export const web3authStore = defineStore('web3auth', () => {
  const web3Auth = ref<Web3Auth | null>(null)
  const provider = ref<BrowserProvider | null>(null)
  const walletServicesPlugin = ref<WalletServicesConnectorPlugin | null>(null)

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

    web3Auth.value = new Web3Auth(web3AuthOptions)

    const adapters = await getDefaultAdapters({ options: web3AuthOptions })

    adapters.forEach((adapter) => {
      web3Auth.value?.configureAdapter(adapter)
    })

    walletServicesPlugin.value = new WalletServicesConnectorPlugin({
      wsEmbedOpts: {},
      walletInitOptions: { whiteLabel: { showWidgetButton: true } }
    })

    web3Auth.value?.addPlugin(walletServicesPlugin.value)

    await web3Auth.value.initModal()

    provider.value = new BrowserProvider(web3Auth.value?.provider!)
  }

  async function connectToWeb3Auth() {
    console.log('logging', web3Auth.value)
    // web3Auth.value?.connected
    await web3Auth.value?.connect()
    walletServicesPlugin.value?.showWalletUi()
  }

  async function logoutWeb3Auth() {
    return web3Auth.value?.logout()
  }

  return {
    web3Auth,
    initializeWeb3Auth,
    connectToWeb3Auth,
    logoutWeb3Auth
  }
})
