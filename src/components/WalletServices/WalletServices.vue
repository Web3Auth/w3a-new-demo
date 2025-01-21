<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { IProvider, WALLET_ADAPTERS } from '@web3auth/base'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import { useWalletServicesPlugin } from '@web3auth/wallet-services-plugin-vue-composables'
import { useI18n } from 'petite-vue-i18n'
import { computed, ref } from 'vue'

import { signPersonalMessage } from '@/services/ethHandlers'

const { t } = useI18n()
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
      signedMessage.value = error
      signingState.value = 'error'
      return
    }
    signedMessage.value = signedData
    signingState.value = 'success'
  } catch {
    signingState.value = 'error'
  } finally {
    isSigningMessage.value = false
    setTimeout(() => {
      signedMessage.value = ''
      signingState.value = ''
    }, 5000)
  }
}
</script>
<template>
  <Card
    class="w-full !rounded-2xl !border-0 px-8 py-6 text-center !shadow-modal dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <h3 class="mb-1 font-semibold text-app-gray-900 dark:text-app-white">
        {{ t('dashboard.wallet-services') }}
      </h3>
      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        {{ t('dashboard.wallet-services-subtext') }}
      </p>
    </div>
    <img
      class="mx-auto mb-6 size-[100px] dark:hidden"
      src="@/assets/images/wallet-services.svg"
      alt="Wallet Services"
    />
    <img
      class="mx-auto mb-6 hidden size-[100px] dark:block"
      src="@/assets/images/wallet-services-dark.svg"
      alt="Wallet Services"
    />

    <div class="space-y-2">
      <div class="group relative">
        <div
          v-if="isDisabled"
          class="absolute bottom-[130%] left-1/2 hidden w-[180px] -translate-x-1/2 rounded-lg bg-app-light-surface1 px-4 py-2 text-center text-xs text-app-black shadow-md group-hover:block"
        >
          {{ t('dashboard.disabled-btn-text') }}
          <div
            class="absolute left-[calc(50%_-_8px)] top-full border-8 border-b-0 border-x-transparent border-t-app-white"
          ></div>
        </div>
        <Button
          size="sm"
          class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 disabled:!text-app-gray-400 dark:!text-app-white dark:disabled:!text-app-gray-500"
          variant="secondary"
          :disabled="isDisabled"
          @on-click="showWalletUI"
          >{{ t('dashboard.open-wallet-ui') }}</Button
        >
      </div>
      <div class="group relative">
        <div
          v-if="isDisabled"
          class="absolute bottom-[130%] left-1/2 hidden w-[180px] -translate-x-1/2 rounded-lg bg-app-light-surface1 px-4 py-2 text-center text-xs text-app-black shadow-md group-hover:block"
        >
          {{ t('dashboard.disabled-btn-text') }}
          <div
            class="absolute left-[calc(50%_-_8px)] top-full border-8 border-b-0 border-x-transparent border-t-app-white"
          ></div>
        </div>
        <Button
          size="sm"
          class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 disabled:!text-app-gray-400 dark:!text-app-white dark:disabled:!text-app-gray-500"
          variant="secondary"
          :disabled="isDisabled"
          @on-click="showCheckout"
          >{{ t('dashboard.onramp') }}</Button
        >
      </div>
      <div class="group relative">
        <div
          v-if="isDisabled"
          class="absolute bottom-[130%] left-1/2 hidden w-[180px] -translate-x-1/2 rounded-lg bg-app-light-surface1 px-4 py-2 text-center text-xs text-app-black shadow-md group-hover:block"
        >
          {{ t('dashboard.disabled-btn-text') }}
          <div
            class="absolute left-[calc(50%_-_8px)] top-full border-8 border-b-0 border-x-transparent border-t-app-white"
          ></div>
        </div>
        <Button
          size="sm"
          class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 disabled:!text-app-gray-400 dark:!text-app-white dark:disabled:!text-app-gray-500"
          variant="secondary"
          :disabled="isDisabled"
          @on-click="showWalletConnectScanner"
          >{{ t('dashboard.connect-app') }}</Button
        >
      </div>

      <div class="group relative">
        <div
          v-if="isDisabled"
          class="absolute bottom-[130%] left-1/2 hidden w-[180px] -translate-x-1/2 rounded-lg bg-app-light-surface1 px-4 py-2 text-center text-xs text-app-black shadow-md group-hover:block"
        >
          {{ t('dashboard.disabled-btn-text') }}
          <div
            class="absolute left-[calc(50%_-_8px)] top-full border-8 border-b-0 border-x-transparent border-t-app-white"
          ></div>
        </div>
        <Button
          size="sm"
          class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 disabled:!text-app-gray-400 dark:!text-app-white dark:disabled:!text-app-gray-500"
          variant="secondary"
          :disabled="isDisabled"
          @on-click="showSwap"
          >{{ t('dashboard.swap') }}</Button
        >
      </div>

      <Button
        v-if="signingState === ''"
        size="sm"
        class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 disabled:!text-app-gray-400 dark:!text-app-white dark:disabled:!text-app-gray-500"
        variant="secondary"
        @on-click="signMessage"
        >{{ t('dashboard.sign-personal-message') }}</Button
      >
      <div
        v-else
        class="flex min-h-9 flex-col items-center justify-center rounded-md border border-app-gray-500 p-2 text-sm text-app-gray-500"
        :class="{
          'bg-app-green-100 text-app-green-500': signingState === 'success',
          'bg-app-red-100 text-app-red-800': signingState === 'error'
        }"
      >
        <div>
          {{
            signingState === 'success' ? t('dashboard.sign-success') : t('dashboard.sign-failed')
          }}
        </div>
        <div v-if="signedMessage" class="mt-1 break-all text-xxs leading-tight">
          {{ signedMessage }}
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
