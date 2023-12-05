<template>
  <div>
    <!-- Navbar -->
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
    <!-- Main -->
    <main
      v-if="!account"
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
        <WalletServiceDetails
          v-if="currentStep === 1"
          @open-wallet-service-ui="openWalletUi"
          @open-wallet-sign-message="signPersonalMsg"
        />
        <TopupDetails v-if="currentStep === 2" @initiate-top-up-plugin="openCheckout" />
        <WalletConnectDetails v-if="currentStep === 3" @open-wallet-connect="openWalletConnect" />
      </div>
      <!-- Small Screen -->
      <div
        v-if="!mbViewSteps"
        class="flex xl:hidden flex-col flex-1 bg-white p-5 rounded-2xl shadow-lg overflow-auto"
      >
        <LoginDetails v-if="currentStep === -1" @on-view-steps="mbViewSteps = true" />
        <OpenloginDetails v-if="currentStep === 0" />
        <WalletServiceDetails
          v-if="currentStep === 1"
          @open-wallet-service-ui="openWalletUi"
          @open-wallet-sign-message="signPersonalMsg"
        />
        <TopupDetails v-if="currentStep === 2" @initiate-top-up-plugin="openCheckout" />
        <WalletConnectDetails v-if="currentStep === 3" @open-wallet-connect="openWalletConnect" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'

import { BrowserProvider } from 'ethers'
import Web3 from 'web3'

import WsEmbed, { type UserInfo, type WS_EMBED_BUILD_ENV_TYPE } from '@web3auth/ws-embed'

import { SUPPORTED_NETWORKS, MAINNET_CHAIN_ID } from '@toruslabs/ethereum-controllers'

import { Button, Icon } from '@toruslabs/vue-components'
import type { SocialLoginObj } from 'node_modules/@toruslabs/vue-components/dist/common/LoginForm'

import Navbar from '@/components/Navbar'
import LoginForm from '@/components/LoginForm'
import Steps from '@/components/Steps'
import LoginDetails from '@/components/LoginDetails'
import OpenloginDetails from '@/components/OpenloginDetails'
import WalletServiceDetails from '@/components/WalletServiceDetails'
import TopupDetails from '@/components/TopupDetails'
import WalletConnectDetails from '@/components/WalletConnectDetails'

const buildEnvironment = process.env.VUE_APP_WS_EMBED_BUILD_ENV || 'testing'

const currentStep = ref(-1)
const mbViewSteps = ref(false)

const account = ref<string>('')
const userInfo = ref<(UserInfo & { typeOfLogin: string }) | null | undefined>(null)
const emailLoginHint = ref<string>('')
const isLoading = ref<boolean>(false)
const signedMessage = ref<string>('')

const chainId = ref<string>(MAINNET_CHAIN_ID)
const currentNetwork = ref<string>(SUPPORTED_NETWORKS[chainId.value].displayName)
const switchChainTo = ref<string>('0x1')

let wsEmbed: WsEmbed | null = null
let web3: Web3 | null = null
let ethersProvider: BrowserProvider | null = null

// Providers
provide('wsEmbed', wsEmbed)
provide('account', account)
provide('userInfo', userInfo)
provide('emailLoginHint', emailLoginHint)
provide('signedMessage', signedMessage)

onMounted(async () => {
  try {
    isLoading.value = true
    wsEmbed = new WsEmbed()
    await wsEmbed.init({
      showWidgetButton: false,
      buildEnv: buildEnvironment as WS_EMBED_BUILD_ENV_TYPE | 'testing',
      chainConfig: SUPPORTED_NETWORKS[MAINNET_CHAIN_ID],
      enableLogging: true
    })

    // Update provider on chain change
    wsEmbed.provider.on('chainChanged', async () => {
      if (wsEmbed?.provider) {
        // needs to update ethers provider if using ethers
        ethersProvider = new BrowserProvider(wsEmbed.provider, 'any')
      }
      getCurrentChain()
    })

    // Update provider on accountsChanged
    wsEmbed.provider.on('accountsChanged', async (accounts) => {
      if (account.value.length > 0 && accounts.length === 0) {
        account.value = ''
        isLoading.value = false
        return
      }

      if (wsEmbed?.communicationProvider.isLoggedIn) {
        login()
      }
    })

    ethersProvider = new BrowserProvider(wsEmbed.provider, 'any')
    web3 = new Web3()
    web3.setProvider(wsEmbed.provider)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const getCurrentChain = async () => {
  const currentChainId = (await wsEmbed?.provider.request({ method: 'eth_chainId' })) as string
  // const currentChainId = `0x${(await ethersProvider?.getNetwork())?.chainId.toString(16)}`;
  currentNetwork.value =
    SUPPORTED_NETWORKS[currentChainId]?.displayName || `Chain Id: ${currentChainId}`
  chainId.value = currentChainId
  switchChainTo.value = chainId.value !== '0x5' ? '0x5' : '0x1'
}

const login = async (loginObj?: SocialLoginObj) => {
  try {
    // Note: can pass loginProvider and login_hint as params if you want to preselect a provider and login identifier eg. email
    // const loginaccs = await torus?.login({ loginProvider: "google", login_hint: "sample@gmail.com" });
    // Passing empty will trigger showing the login modal showing all login provider options
    isLoading.value = true
    const obj = { loginProvider: loginObj?.icon as any, login_hint: emailLoginHint.value }
    const loginaccs = await wsEmbed?.login(obj)
    account.value = (loginaccs || [])[0] || ''
    localStorage.setItem('accountLocal', account.value)
    userInfo.value = (await wsEmbed?.getUserInfo()) as UserInfo & { typeOfLogin: string }
    isLoading.value = false
    getCurrentChain()
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
}

const logout = async () => {
  try {
    isLoading.value = true
    await wsEmbed?.logout()
  } catch (error) {
    console.error('Logout Error', error)
  }
}

const handleSteps = (idx: number) => {
  currentStep.value = idx
  if (idx === 3) {
    openWalletConnect()
  }
  if (idx === 2) {
    openCheckout()
  }
  if (idx === 1) {
    openWalletUi()
  }
  mbViewSteps.value = false
}

const handleEmailValue = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  emailLoginHint.value = value
}

const openWalletConnect = async () => {
  await wsEmbed?.showWalletConnectScanner()
}

const openWalletUi = async () => {
  await wsEmbed?.showWalletUi()
}

const openCheckout = async () => {
  await wsEmbed?.showCheckout()
}

const signPersonalMsg = async () => {
  try {
    const message = 'Some string'
    const signer = await ethersProvider?.getSigner()
    const msg = await signer?.signMessage(message)
    signedMessage.value = msg || ''
  } catch (error) {
    signedMessage.value = ''
    console.error('Failed', (error as Error).message)
  }
}
</script>

<style scoped>
.main-container {
  @media (min-width: 700px) {
    height: calc(100vh - 124px);
  }
}
</style>
