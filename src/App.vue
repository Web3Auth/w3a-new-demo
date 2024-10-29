<script setup lang="ts">
import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  getChainConfig,
  IAdapter,
  WEB3AUTH_NETWORK
} from '@web3auth/base'
import { getInjectedAdapters as getInjectedEvmAdapters } from '@web3auth/default-evm-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthOptions } from '@web3auth/modal'
import { Web3AuthProvider } from '@web3auth/modal-vue-composables'
import { WalletConnectV2Adapter } from '@web3auth/wallet-connect-v2-adapter'
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin'
import { WalletServicesProvider } from '@web3auth/wallet-services-plugin-vue-composables'
import { computed } from 'vue'

import Navbar from '@/components/Navbar'

import useCustomConfig from './composables/use-custom-config'
import Root from './views/Root.vue'

const { config } = useCustomConfig()

const chainConfig = getChainConfig(CHAIN_NAMESPACES.EIP155, '0x1') as CustomChainConfig

const externalAdaptersData = computed(() => {
  const adapters: IAdapter<unknown>[] = [
    new WalletConnectV2Adapter({
      adapterSettings: {
        walletConnectInitOptions: { projectId: 'd3c63f19f9582f8ba48e982057eb096b' }
      }
    })
  ]
  adapters.push(...getInjectedEvmAdapters({ options: options.value }))
  return adapters
})

const walletPlugin = new WalletServicesPlugin({
  walletInitOptions: {
    whiteLabel: {
      showWidgetButton: true,
      logoDark: 'https://images.web3auth.io/web3auth-logo-w-light.svg', // logo used on dark mode
      logoLight: 'https://images.web3auth.io/web3auth-logo-w.svg'
    }
  }
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
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: {
      chainConfig
    }
  })
  return {
    chainConfig,
    clientId:
      'BNI_pZZpoH4tqzbDDMKwfLOWujTif_kek4h9QEN271Gu0JheYDPEUHNKMl5Nnw5PGOjK-SOxp1RpUdG9TJufMZk',
    privateKeyProvider,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    uiConfig,
    enableLogging: true
  }
})

const configs = computed(() => {
  return {
    adapters: externalAdaptersData.value,
    web3AuthOptions: options.value,
    plugins: [walletPlugin]
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Web3AuthProvider :config="configs">
      <WalletServicesProvider>
        <Navbar />
        <Root />
      </WalletServicesProvider>
    </Web3AuthProvider>
  </div>
</template>
