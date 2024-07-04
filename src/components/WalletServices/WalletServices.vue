<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { useWeb3authStore } from '@/store/web3authStore'

const web3Auth = useWeb3authStore()
const signedMessage = ref<string>('')
const signingMessage = ref<boolean>(false)

function openWalletServiceUi() {
  web3Auth.showWalletUi()
}

async function signMessage() {
  try {
    signingMessage.value = true
    signedMessage.value = (await web3Auth.signedMessage()) as string
  } catch (error) {
    console.error(error)
  } finally {
    signingMessage.value = false
    setTimeout(() => {
      signedMessage.value = ''
    }, 1000)
  }
}
</script>
<template>
  <Card class="px-8 py-6 text-center w-full !rounded-2xl">
    <div class="mb-4">
      <h3 class="font-semibold text-app-gray-900 mb-1">Wallet Services</h3>
      <p class="text-xs text-app-gray-500">Production-ready wallet UI</p>
    </div>
    <img
      class="mx-auto mb-6 w-[100px] h-[100px]"
      src="@/assets/images/wallet-services.svg"
      alt="Wallet Services"
    />

    <div class="space-y-2">
      <Button size="sm" class="gap-2 w-full" variant="secondary" @on-click="openWalletServiceUi"
        >Open Wallet UI</Button
      >
      <Button size="sm" class="gap-2 w-full" variant="secondary">Use Fiat Onramp</Button>
      <Button size="sm" class="gap-2 w-full" variant="secondary">Connect to Applications</Button>
      <Button size="sm" class="gap-2 w-full" variant="secondary" @on-click="signMessage"
        >Sign Personal Message</Button
      >
    </div>
  </Card>
</template>

<style scoped></style>
