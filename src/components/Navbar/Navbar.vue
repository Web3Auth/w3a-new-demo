<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'

// Web3Auth
const { logout, isConnected } = useWeb3Auth()

const handleDocsLink = () => {
  window.open('https://web3auth.io/docs', '_blank')
}

const logoutApp = async () => {
  try {
    await logout()
  } catch (error) {
    console.error((error as Error).message)
  }
}
</script>

<template>
  <div class="w-full relative">
    <div
      :class="[
        'py-4 px-4 sm:py-6 sm:px-8 flex items-center justify-between bg-app-white dark:bg-app-gray-800 w-full'
      ]"
    >
      <img
        src="@/assets/images/logo.svg"
        alt="web3auth demo logo"
        class="cursor-pointer h-8 sm:!h-12 w-auto dark:hidden"
      />
      <img
        src="@/assets/images/logo-light.svg"
        alt="web3auth demo logo"
        class="cursor-pointer h-8 sm:!h-12 w-auto hidden dark:block"
      />
      <Button
        v-if="!isConnected"
        id="w3a-documentation"
        class="!h-9 sm:!h-10"
        @on-click="handleDocsLink"
      >
        Documentation
      </Button>
      <Button v-else variant="secondary" @on-click="logoutApp">Logout</Button>
    </div>
  </div>
</template>
