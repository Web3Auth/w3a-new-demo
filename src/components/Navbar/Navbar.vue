<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import { useI18n } from 'petite-vue-i18n'

// Web3Auth
const { logout, isConnected } = useWeb3Auth()
const { t } = useI18n()

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
  <div class="relative w-full">
    <div
      :class="[
        'flex w-full items-center justify-between bg-app-white p-4 dark:bg-app-gray-800 sm:px-8 sm:py-6'
      ]"
    >
      <img
        src="@/assets/images/logo.svg"
        alt="web3auth demo logo"
        class="h-8 w-auto cursor-pointer dark:hidden sm:!h-12"
      />
      <img
        src="@/assets/images/logo-light.svg"
        alt="web3auth demo logo"
        class="hidden h-8 w-auto cursor-pointer dark:block sm:!h-12"
      />
      <Button
        v-if="!isConnected"
        id="w3a-documentation"
        class="!h-9 sm:!h-10"
        @on-click="handleDocsLink"
      >
        {{ t('login.documentation') }}
      </Button>
      <Button v-else variant="secondary" @on-click="logoutApp">{{ t('login.logout') }}</Button>
    </div>
  </div>
</template>
