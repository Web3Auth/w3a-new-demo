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
        <WalletServiceDetails v-if="currentStep === 1" @open-wallet-service-ui="openWalletUi" />
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
        <WalletServiceDetails v-if="currentStep === 1" @open-wallet-service-ui="openWalletUi" />
        <TopupDetails v-if="currentStep === 2" @initiate-top-up-plugin="openCheckout" />
        <WalletConnectDetails v-if="currentStep === 3" @open-wallet-connect="openWalletConnect" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import Torus from '@web3auth/embed'

import { Button, Icon } from '@toruslabs/vue-components'
import type { SocialLoginObj } from '@toruslabs/vue-components/dist/types/common/LoginForm'

import Navbar from '@/components/Navbar'
import LoginForm from '@/components/LoginForm'
import Steps from '@/components/Steps'
import LoginDetails from '@/components/LoginDetails'
import OpenloginDetails from '@/components/OpenloginDetails'
import WalletServiceDetails from '@/components/WalletServiceDetails'
import TopupDetails from '@/components/TopupDetails'
import WalletConnectDetails from '@/components/WalletConnectDetails'

import { setTheme } from './utils/common'
import { SUPPORTED_NETWORKS, CHAINS } from './constants/common'

const currentStep = ref(-1)
const loginProvider = ref('')
const emailLoginHint = ref('')
const mbViewSteps = ref(false)

const account = ref<string>('')
let torus = ref<Torus | null>(null)
const isLoading = ref<boolean>(false)

provide('torus', torus)
provide('emailLoginHint', emailLoginHint)
provide('loginProvider', loginProvider)
provide('account', account)

onMounted(async () => {
  try {
    isLoading.value = true
    torus.value = new Torus()
    await torus.value.init({
      showTorusButton: true,
      network: SUPPORTED_NETWORKS[CHAINS.MAINNET],
      buildEnv: 'development',
      enableLogging: true
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(!isDark)
  }
})

const login = async (loginObj: SocialLoginObj) => {
  isLoading.value = true
  const loginAcc = await torus.value?.login({
    loginProvider: loginObj.icon as any,
    login_hint: emailLoginHint.value
  })
  account.value = (loginAcc || [])[0] || ''
  isLoading.value = false
  console.log('Logged in Successfully!')
}

const logout = async () => {
  try {
    await torus.value?.logout()
    account.value = ''
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
  await torus.value?.showWalletConnectScanner()
}

const openWalletUi = async () => {
  await torus.value?.showWalletUi()
}

const openCheckout = async () => {
  await torus.value?.showCheckout()
}
</script>

<style scoped>
.main-container {
  @media (min-width: 700px) {
    height: calc(100vh - 124px);
  }
}
</style>
