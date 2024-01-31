import { POLYGON_MUMBAI_CHAIN_ID, SUPPORTED_NETWORKS } from '@toruslabs/ethereum-controllers'
import { getDefaultAdapters } from '@web3auth/default-evm-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3Auth, type Web3AuthOptions } from '@web3auth/modal'
import { defineStore } from 'pinia'
import { computed, shallowRef, triggerRef } from 'vue'
import { BrowserProvider } from 'ethers'
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin'
import { WALLET_ADAPTERS } from '@web3auth/base'
import type { OpenloginAdapter } from '@web3auth/openlogin-adapter'

export const useWeb3authStore = defineStore('web3auth', () => {
  const web3Auth = shallowRef<Web3Auth | null>(null)
  const provider = shallowRef<BrowserProvider | null>(null)
  const walletServicesPlugin = shallowRef<WalletServicesPlugin | null>(null)

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
      if (adapter.name === WALLET_ADAPTERS.OPENLOGIN) {
        const openloginAdapter = adapter as OpenloginAdapter
        openloginAdapter.setAdapterSettings({ buildEnv: 'testing' })
      }
      web3Auth.value?.configureAdapter(adapter)
    })

    walletServicesPlugin.value = new WalletServicesPlugin({
      wsEmbedOpts: {},
      walletInitOptions: { whiteLabel: { showWidgetButton: true } }
    })

    web3Auth.value?.addPlugin(walletServicesPlugin.value)

    await web3Auth.value.initModal()

    provider.value = new BrowserProvider(web3Auth.value?.provider!)
    console.log('logging', web3Auth.value?.connectedAdapterName)
    triggerRef(web3Auth)
  }

  async function connectToWeb3Auth() {
    console.log('logging', web3Auth.value)
    const provider = await web3Auth.value?.connect()
    console.log(provider, 'available')
    // because it's shallow ref, have to trigger again
    triggerRef(web3Auth)
  }

  async function logoutWeb3Auth() {
    return web3Auth.value?.logout()
  }

  async function showWalletServicesUI() {
    return walletServicesPlugin.value?.showWalletUi()
  }

  const isLoggedIn = computed(() => {
    return web3Auth.value?.connected
  })

  return {
    isLoggedIn,
    initializeWeb3Auth,
    connectToWeb3Auth,
    logoutWeb3Auth,
    showWalletServicesUI
  }
})
