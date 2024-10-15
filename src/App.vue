<script setup lang="ts">
import { Loader } from '@toruslabs/vue-components/Loader'
import Navbar from '@/components/Navbar'
import { computed, onMounted, ref, watch } from 'vue'
import { useWeb3Auth, Web3AuthProvider } from '@web3auth/modal-vue-composables'
import {
  CHAIN_NAMESPACES,
  ChainNamespaceType,
  IAdapter,
  IBaseProvider,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK
} from '@web3auth/base'
import { chainConfigs, clientIds, LOGIN_METHODS } from './constants/common'
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin'
import { Web3AuthOptions } from '@web3auth/modal'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { CoinbaseAdapter } from '@web3auth/coinbase-adapter'
import { TorusWalletAdapter } from '@web3auth/torus-evm-adapter'
import { SolanaWalletAdapter } from '@web3auth/torus-solana-adapter'
import { WalletConnectV2Adapter } from '@web3auth/wallet-connect-v2-adapter'
import { getInjectedAdapters as getInjectedEvmAdapters } from '@web3auth/default-evm-adapter'
import { getInjectedAdapters as getInjectedSolanaAdapters } from '@web3auth/default-solana-adapter'
import useCustomConfig from './composables/use-custom-config'
import { CustomConfig } from './utils/interface'

const { config } = useCustomConfig()
const externalAdapters = ref<IAdapter<unknown>[]>([])
const whitelabelConfig = ref<CustomConfig | null>(config)

const getExternalAdapterByName = async (name: string): Promise<IAdapter<unknown>[]> => {
  switch (name) {
    case 'coinbase':
      return [new CoinbaseAdapter()]
    case 'torus-evm':
      return [new TorusWalletAdapter()]
    case 'torus-solana':
      return [new SolanaWalletAdapter()]
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
    case 'injected-solana':
      return getInjectedSolanaAdapters({ options: options.value })
    default:
      return []
  }
}

const externalAdaptersData = async () => {
  let adapters: IAdapter<unknown>[] = []
  const adaptersList = ['coinbase', 'torus-evm', 'wallet-connect-v2', 'injected-evm']
  for (let i = 0; i <= adaptersList.length; i += 1) {
    const adaptersData: any = await getExternalAdapterByName(adaptersList[i])
    adapters = adapters.concat(adaptersData)
  }
  externalAdapters.value = adapters
}

onMounted(async () => {
  externalAdaptersData()
  console.log(config, 'DATA')
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

const privateKeyProvider = computed((): IBaseProvider<string> => {
  const chainConfig = chainConfigs[CHAIN_NAMESPACES.EIP155 as ChainNamespaceType].find(
    (x) => x.chainId === '0x1'
  )!
  return new EthereumPrivateKeyProvider({
    config: {
      chainConfig
    }
  })
})

watch(
  () => [
    config.dappName,
    config.addBrandLogo,
    config.isDark,
    config.logoUrl,
    config.logoUrl,
    config.primaryColor,
    config.primaryTextColor,
    config.selectedLanguage,
    config.useLogoAsLoader
  ],
  () => {
    console.log(config, 'CONFIG DATA')
    whitelabelConfig.value = { ...options.value.uiConfig, ...config }
  }
)

const options = computed((): Web3AuthOptions => {
  console.log(config, 'CONFIG DATA OPTIONS')
  return {
    clientId: clientIds[WEB3AUTH_NETWORK.TESTNET],
    privateKeyProvider: privateKeyProvider.value as IBaseProvider<string>,
    web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
    uiConfig: (whitelabelConfig.value as any) ?? undefined,
    enableLogging: true
  }
})

const configs = computed(() => {
  // eslint-disable-next-line no-console
  console.log(externalAdapters.value, options.value, walletPlugins.value, modalParams.value, 'FORM')
  return {
    adapters: externalAdapters.value,
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
