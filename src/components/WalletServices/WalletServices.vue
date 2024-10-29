<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { IProvider, WALLET_ADAPTERS } from '@web3auth/base'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import { useWalletServicesPlugin } from '@web3auth/wallet-services-plugin-vue-composables'
import { computed, ref } from 'vue'

import { signPersonalMessage } from '@/services/ethHandlers'

const signedMessage = ref<string>('')
const isSigningMessage = ref<boolean>(false)
const signingState = ref<'success' | 'error' | ''>('')
const { web3Auth, provider } = useWeb3Auth()
const {
  isPluginConnected,
  showCheckout,
  showSwap,
  showWalletConnectScanner,
  showWalletUI,
  plugin
} = useWalletServicesPlugin()

const isDisabled = computed(
  () => web3Auth.value?.connectedAdapterName !== WALLET_ADAPTERS.AUTH || !isPluginConnected
)

async function signMessage() {
  try {
    isSigningMessage.value = true
    const { signedMessage: signedData, error } = await signPersonalMessage(
      web3Auth.value?.connectedAdapterName === WALLET_ADAPTERS.AUTH
        ? (plugin.value?.wsEmbedInstance.provider as IProvider)
        : (provider.value as IProvider)
    )
    if (error) {
      console.error(error)
      signedMessage.value = error
      signingState.value = 'error'
      return
    }
    signedMessage.value = signedData
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
      class="dark:hidden mx-auto mb-6 w-[100px] h-[100px]"
      src="@/assets/images/wallet-services.svg"
      alt="Wallet Services"
    />
    <img
      class="hidden dark:block mx-auto mb-6 w-[100px] h-[100px]"
      src="@/assets/images/wallet-services-dark.svg"
      alt="Wallet Services"
    />

    <div class="space-y-2">
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white disabled:!text-app-gray-400"
        variant="secondary"
        :disabled="isDisabled"
        @on-click="showWalletUI"
        >Open Wallet UI</Button
      >
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white disabled:!text-app-gray-400"
        variant="secondary"
        :disabled="isDisabled"
        @on-click="showCheckout"
        >Use Fiat Onramp</Button
      >
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white disabled:!text-app-gray-400"
        variant="secondary"
        :disabled="isDisabled"
        @on-click="showWalletConnectScanner"
        >Connect to Applications</Button
      >
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white disabled:!text-app-gray-400"
        variant="secondary"
        :disabled="isDisabled"
        @on-click="showSwap"
        >Swap</Button
      >
      <Button
        v-if="signingState === ''"
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white disabled:!text-app-gray-400"
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
        <div v-if="signedMessage" class="break-all text-xxs leading-tight mt-1">
          {{ signedMessage }}
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
