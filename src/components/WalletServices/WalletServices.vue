<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { useWeb3authStore } from '@/store/web3authStore'

const web3Auth = useWeb3authStore()
const signedMessage = ref<string>('')
const isSigningMessage = ref<boolean>(false)
const signingState = ref<'success' | 'error' | ''>('')

function openWalletServiceUi() {
  web3Auth.showWalletUi()
}

function openFiatOnramp() {
  web3Auth.initiateTopUpPlugin()
}

function connectToApplications() {
  web3Auth.initiateWalletConnect()
}

async function signMessage() {
  try {
    isSigningMessage.value = true
    signedMessage.value = (await web3Auth.signedMessage()) as string
    signingState.value = 'success'
  } catch (error) {
    console.error(error)
    signingState.value = 'error'
  } finally {
    isSigningMessage.value = false
    setTimeout(() => {
      signedMessage.value = ''
      signingState.value = ''
    }, 3000)
  }
}
</script>
<template>
  <Card
    class="px-8 py-6 text-center w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <h3 class="font-semibold text-app-gray-900 dark:text-app-white mb-1">Wallet Services</h3>
      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">Production-ready wallet UI</p>
    </div>
    <img
      class="mx-auto mb-6 w-[100px] h-[100px]"
      src="@/assets/images/wallet-services.svg"
      alt="Wallet Services"
    />

    <div class="space-y-2">
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @on-click="openWalletServiceUi"
        >Open Wallet UI</Button
      >
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @on-click="openFiatOnramp"
        >Use Fiat Onramp</Button
      >
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @on-click="connectToApplications"
        >Connect to Applications</Button
      >
      <Button
        v-if="signingState === ''"
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @on-click="signMessage"
        >Sign Personal Message</Button
      >
      <div
        v-else
        class="border p-2 border-app-gray-500 text-app-gray-500 flex flex-col items-center justify-center text-sm rounded-md min-h-9"
        :class="{
          'bg-app-green-100 text-app-green-500': signingState === 'success',
          'bg-app-red-100 text-app-red-800': signingState === 'error'
        }"
      >
        <div>
          {{ signingState === 'success' ? 'Signature Success!' : 'Signature Failed, Try again' }}
        </div>
        <div v-if="signedMessage" class="break-all text-xxs leading-tight mt-1">{{ signedMessage }}</div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
