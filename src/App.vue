<script setup lang="ts">
import { Loader } from '@toruslabs/vue-components/Loader'
import Navbar from '@/components/Navbar'
import { computed } from 'vue'
import { Web3AuthProvider } from '@web3auth/modal-vue-composables'
import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  getChainConfig,
  IAdapter,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK
} from '@web3auth/base'
import { clientIds, LOGIN_METHODS } from './constants/common'
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin'
import { Web3AuthOptions } from '@web3auth/modal'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { WalletConnectV2Adapter } from '@web3auth/wallet-connect-v2-adapter'
import { getInjectedAdapters as getInjectedEvmAdapters } from '@web3auth/default-evm-adapter'
import useCustomConfig from './composables/use-custom-config'

const { config } = useCustomConfig()

const getExternalAdapterByName = (name: string): IAdapter<unknown>[] => {
  switch (name) {
    case 'wallet-connect-v2':
      return [
        new WalletConnectV2Adapter({
          adapterSettings: {
            walletConnectInitOptions: { projectId: 'd3c63f19f9582f8ba48e982057eb096b' }
          }
        })
      ]
    case 'injected-evm':
      return getInjectedEvmAdapters({ options: options.value })
    default:
      return []
  }
}

const externalAdaptersData = computed(() => {
  let adapters: IAdapter<unknown>[] = []
  const adaptersList = ['wallet-connect-v2', 'injected-evm']
  for (let i = 0; i <= adaptersList.length; i += 1) {
    const adaptersData: any = getExternalAdapterByName(adaptersList[i])
    adapters = adapters.concat(adaptersData)
  }
  return adapters
})

const modalParams = computed(() => {
  const modalConfig = {
    [WALLET_ADAPTERS.AUTH]: {
      label: 'auth',
      loginMethods: LOGIN_METHODS
    }
  }
  return modalConfig
})

const walletPlugins = computed(() => {
  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: true,
        logoDark: 'logo',
        logoLight: 'logo'
      }
    }
  })
  return [walletServicesPlugin]
})

const options = computed((): Web3AuthOptions => {
  const uiConfig: Web3AuthOptions['uiConfig'] = {
    appName: config.value.dappName,
    logoLight: config.value.addBrandLogo ? config.value.logoUrl : undefined,
    logoDark: config.value.addBrandLogo ? config.value.logoUrl : undefined,
    theme: {
      primary: config.value.primaryColor,
      onPrimary: config.value.primaryTextColor
    },
    mode: config.value.isDark ? 'dark' : 'light',
    defaultLanguage: config.value.selectedLanguage,
    useLogoLoader: config.value.useLogoAsLoader
  }
  const chainConfig = getChainConfig(CHAIN_NAMESPACES.EIP155, '0x1') as CustomChainConfig
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: {
      chainConfig
    }
  })
  return {
    chainConfig: chainConfig,
    clientId: clientIds[WEB3AUTH_NETWORK.TESTNET],
    privateKeyProvider,
    web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
    uiConfig: uiConfig,
    enableLogging: true
  }
})

const configs = computed(() => {
  return {
    adapters: externalAdaptersData.value,
    web3AuthOptions: options.value,
    modalConfig: modalParams.value,
    plugins: walletPlugins.value
  }
})
</script>

<template>
  <div v-if="false" class="h-screen flex justify-center items-center">
    <Loader :use-spinner="true" />
  </div>
  <div v-else class="min-h-screen flex flex-col">
    <Web3AuthProvider :config="configs">
      <Navbar />
      <router-view />
    </Web3AuthProvider>
  </div>
</template>
