<script setup lang="ts">
import { ref } from 'vue'
import { Icon, Button } from '@toruslabs/vue-components'

import CardHeading from '../CardHeading'

import { getTruncateString } from '@/utils/common'
import { useWeb3authStore } from '@/store/web3authStore'

const web3Auth = useWeb3authStore()

const isCopied = ref(false)
const signedMessage = ref<string>('')

const handleCopyAddress = () => {
  isCopied.value = true
  navigator.clipboard.writeText(signedMessage?.value || '')
  setTimeout(() => {
    isCopied.value = false
  }, 1000)
}

function openWalletServiceUi() {
  web3Auth.showWalletUi()
}

async function openWalletSignMessage() {
  if (signedMessage.value) {
    handleCopyAddress()
    return
  }

  signedMessage.value = await web3Auth.signedMessage()
}
</script>

<template>
  <div>
    <CardHeading
      heading="Customizable Wallet UI built for you"
      btn-label="How customization works"
      :show-btn="false"
    />
    <div class="text-py-height border-b border-app-gray-300">
      <img src="@/assets/images/WhitelabelUI.svg" class="w-full mb-4" />
      <p class="text-lg font-normal text-mb-height">
        With Web3Auth’s customisable Wallet UI, smoothly integrated branding that fits your use-case
        by getting all these:
      </p>
      <ul class="text-base font-normal list-disc ml-8">
        <li>UI screens for displays/tokens</li>
        <li>Basic whitelabel-able transaction screens</li>
        <li>Customizable to your brand</li>
      </ul>
      <!-- <Button
        variant="secondary"
        size="sm"
        class="items-center gap-2 !border-app-gray-300 text-sm font-medium !text-app-gray-800 flex md:!hidden mt-6"
        block
      >
        How customization works <Icon name="arrow-right-icon" />
      </Button> -->
    </div>
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-8 w-full text-pt-height"
    >
      <div class="flex flex-col flex-1 pr-6 sm:border-r border-app-gray-200">
        <Icon name="color-swatch-solid-icon" class="!w-8 !h-8 text-app-gray-400" />
        <h4 class="text-xl text-app-gray-900 font-semibold mt-4">Experience UI</h4>
        <p class="text-sm font-normal text-app-gray-500 mb-4">
          Preview what your applications will look like with our whitelabel solution
        </p>
        <Button
          variant="secondary"
          size="xs"
          class="flex items-center gap-2 !border-app-gray-300 !text-xs font-medium !text-app-gray-800 !w-fit"
          @on-click="openWalletServiceUi"
        >
          Open UI
        </Button>
      </div>
      <div class="flex flex-col flex-1 mt-6 sm:mt-0 sm:pr-6">
        <Icon name="shield-exclamation-solid-icon" class="!w-8 !h-8 text-app-gray-400" />
        <h4 class="text-xl text-app-gray-900 font-semibold mt-4">Sign Personal Message</h4>
        <p class="text-sm font-normal text-app-gray-500 mb-8">
          Secure, fast transaction signing‍ on any platform.
        </p>
        <Button
          variant="secondary"
          size="xs"
          :class="[
            'flex items-center gap-2 !border-app-gray-300 !text-xs font-medium !text-app-gray-800 !w-fit',
            { 'cursor-copy': Boolean(signedMessage) }
          ]"
          @on-click="openWalletSignMessage"
        >
          {{ Boolean(signedMessage) ? getTruncateString(signedMessage || '') : 'Sign Message' }}
          <Icon
            v-if="Boolean(signedMessage)"
            :name="isCopied ? 'check-circle-solid-icon' : 'document-duplicate-icon'"
            :class="['cursor-pointer', isCopied ? 'text-app-success' : 'text-app-gray-400']"
          />
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-mb-height {
  margin-bottom: 16px;
  @media (min-height: 900px) {
    margin-bottom: 24px;
  }
}

.text-py-height {
  padding: 24px 0px;
  @media (min-height: 900px) {
    padding: 32px 0px;
  }
}

.text-pt-height {
  padding-top: 24px;
  @media (min-height: 900px) {
    padding-top: 32px;
  }
}
</style>
