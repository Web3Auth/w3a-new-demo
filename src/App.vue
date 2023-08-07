<template>
  <div>
    <Navbar
      @on-log-out="logout"
      @on-redirect="
        () => {
          currentStep = -1
          mbViewSteps = false
        }
      "
      @on-menu-click="(idx) => (currentStep = idx)"
    />
    <!-- Small Screen -->
    <Button
      v-if="!mbViewSteps && currentStep !== -1"
      variant="text"
      class="!flex xl:!hidden !text-gray-400 !px-6 mb-4 mt-6"
      @on-click="mbViewSteps = true"
    >
      <Icon name="chevron-left-solid-icon" /> Back to next steps
    </Button>
    <main
      v-if="!isLoggedIn"
      class="flex flex-col items-center justify-center h-[calc(100vh_-_120px)] px-6"
    >
      <LoginForm
        @on-email-login="login({ icon: 'email_passwordless' })"
        @on-social-login-click="login"
        @handle-email-password-less="handleEmailValue"
      />
    </main>
    <main
      :class="[
        'px-6 mb-6 mt-6 sm:mt-0 md:mb-0 flex gap-4 main-container',
        { 'sm:px-6 px-0': mbViewSteps && currentStep !== -1 }
      ]"
      v-else
    >
      <!-- Desktop -->
      <Steps @on-steps-click="handleSteps" class="hidden xl:flex" />
      <!-- Small Screen -->
      <Steps v-if="mbViewSteps" @on-steps-click="handleSteps" class="flex xl:hidden !w-full" />
      <!-- Desktop -->
      <div
        class="hidden xl:flex flex-col flex-1 bg-white px-8 py-6 rounded-2xl shadow-lg overflow-auto"
      >
        <LoginDetails v-if="currentStep === -1" @on-view-steps="mbViewSteps = true" />
        <OpenloginDetails v-if="currentStep === 0" />
        <WalletServiceDetails v-if="currentStep === 1" />
        <TopupDetails v-if="currentStep === 2" @initiate-top-up-plugin="initiateTopUpPlugin" />
        <WalletConnectDetails v-if="currentStep === 3" @open-wallet-connect="openWalletConnect" />
      </div>
      <!-- Small Screen -->
      <div
        v-if="!mbViewSteps"
        class="flex xl:hidden flex-col flex-1 bg-white p-5 rounded-2xl shadow-lg overflow-auto"
      >
        <LoginDetails v-if="currentStep === -1" @on-view-steps="mbViewSteps = true" />
        <OpenloginDetails v-if="currentStep === 0" />
        <WalletServiceDetails v-if="currentStep === 1" />
        <TopupDetails v-if="currentStep === 2" @initiate-top-up-plugin="initiateTopUpPlugin" />
        <WalletConnectDetails v-if="currentStep === 3" @open-wallet-connect="openWalletConnect" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'

import { CHAIN_NAMESPACES, WALLET_ADAPTERS, type SafeEventEmitterProvider } from '@web3auth/base'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { OpenloginAdapter, type LoginParams } from '@web3auth/openlogin-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin'

import type { SocialLoginObj } from '@toruslabs/vue-components/dist/types/common/LoginForm'

import { Button, Icon } from '@toruslabs/vue-components'

import Navbar from '@/components/Navbar'
import LoginForm from '@/components/LoginForm'
import Steps from '@/components/Steps'
import LoginDetails from '@/components/LoginDetails'
import OpenloginDetails from '@/components/OpenloginDetails'
import WalletServiceDetails from '@/components/WalletServiceDetails'
import TopupDetails from '@/components/TopupDetails'
import WalletConnectDetails from '@/components/WalletConnectDetails'

import { setTheme } from './utils/common'
import { CLIENT_ID } from './constants/common'

const clientId = CLIENT_ID

const currentStep = ref(-1)
const isLoggedIn = ref(false)
const loading = ref(false)
const loginProvider = ref('')
const emailLoginHint = ref('')
const userDetails = ref<any | null>(null)
const mbViewSteps = ref(false)

const torusWalletPlugin = ref<TorusWalletConnectorPlugin | null>(null)
let provider = ref<SafeEventEmitterProvider | null>(null)
let web3authNoModal = ref<Web3AuthNoModal | null>(null)

provide('isLoggedIn', isLoggedIn)
provide('userInfo', userDetails)
provide('web3authDetails', web3authNoModal)
provide('emailLoginHint', emailLoginHint)
provide('providerDetails', provider)
provide('loginProvider', loginProvider)

onMounted(async () => {
  try {
    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x1',
      rpcTarget: 'https://rpc.ankr.com/eth',
      displayName: 'Ethereum Mainnet',
      blockExplorer: 'https://etherscan.io',
      ticker: 'ETH',
      tickerName: 'Ethereum'
    }

    const web3auth = new Web3AuthNoModal({
      clientId,
      chainConfig,
      web3AuthNetwork: 'cyan'
    })

    const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } })

    const openloginAdapter = new OpenloginAdapter({
      loginSettings: {
        mfaLevel: 'none'
      },
      adapterSettings: {
        uxMode: 'redirect'
      },
      privateKeyProvider
    })
    web3auth.configureAdapter(openloginAdapter)

    const torusPlugin = new TorusWalletConnectorPlugin({
      torusWalletOpts: {},
      walletInitOptions: {
        whiteLabel: {
          theme: { isDark: true, colors: { primary: '#00a8ff' } },
          logoDark: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
          logoLight: 'https://web3auth.io/images/w3a-D-Favicon-1.svg'
        },
        useWalletConnect: true,
        enableLogging: true,
        showTorusButton: false
      }
    })

    await web3auth.addPlugin(torusPlugin)
    await web3auth.init()

    loading.value = true
    isLoggedIn.value = false

    web3authNoModal.value = web3auth
    provider.value = web3auth.provider
    torusWalletPlugin.value = torusPlugin

    if (web3auth.provider && web3auth.connected) {
      isLoggedIn.value = true
    }
  } catch (error) {
    loading.value = false
    isLoggedIn.value = false
  } finally {
    loading.value = false
  }

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  setTheme(!isDark)
})

const handleSteps = (idx: number) => {
  currentStep.value = idx
  mbViewSteps.value = false
}

const handleEmailValue = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  emailLoginHint.value = value
}

const login = async (loginObj: SocialLoginObj) => {
  if (!web3authNoModal.value) {
    console.log('web3auth not initialized yet')
    return
  }

  const socialConfig: LoginParams = {
    loginProvider: loginObj.icon || ''
  }

  const emailConfig: LoginParams = {
    loginProvider: loginObj.icon || '',
    extraLoginOptions: {
      login_hint: emailLoginHint.value
    }
  }

  loginProvider.value = loginObj.icon || ''

  const config = loginObj.icon === 'email_passwordless' ? emailConfig : socialConfig

  const web3authProvider = await web3authNoModal.value.connectTo(WALLET_ADAPTERS.OPENLOGIN, config)
  provider.value = web3authProvider
  isLoggedIn.value = true

  userDetails.value = await web3authNoModal.value.getUserInfo()

  console.log('Logged in Successfully!')
}

const logout = async () => {
  if (!web3authNoModal.value) {
    console.log('web3auth not initialized yet')
    return
  }
  await web3authNoModal.value.logout()
  provider.value = null
  isLoggedIn.value = false
}

const initiateTopUpPlugin = async () => {
  if (!torusWalletPlugin.value) {
    console.log('torus plugin not initialized yet')
    return
  }
  torusWalletPlugin.value.initiateTopup('moonpay', {
    selectedAddress: '0x8cFa648eBfD5736127BbaBd1d3cAe221B45AB9AF',
    selectedCurrency: 'USD',
    fiatValue: 100,
    selectedCryptoCurrency: 'ETH',
    chainNetwork: 'mainnet'
  })
}

const openWalletConnect = async () => {
  if (!torusWalletPlugin.value) {
    console.log('torus plugin not initialized yet')
    return
  }
  await torusWalletPlugin.value.showWalletConnectScanner()
}
</script>

<style scoped>
.main-container {
  @media (min-width: 700px) {
    height: calc(100vh - 124px);
  }
}
</style>
