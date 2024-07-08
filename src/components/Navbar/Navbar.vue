<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@toruslabs/vue-components/Button'
import { ROUTES } from '@/constants/common'
import { useWeb3authStore } from '@/store/web3authStore'

const router = useRouter()
const route = useRoute()

// Web3Auth
const web3Auth = useWeb3authStore()

const handleDocsLink = () => {
  window.open('https://web3auth.io/docs', '_blank')
}

const logout = async () => {
  console.log('logout')
  try {
    await web3Auth.logoutWeb3Auth()
  } catch (error) {
    console.log((error as Error).message)
  } finally {
    router.push({ name: 'Login' })
  }
}
const isLoginPage = computed(() => route.name === ROUTES.LOGIN)
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
        v-if="isLoginPage"
        @on-click="handleDocsLink"
        id="w3a-documentation"
        class="!h-9 sm:!h-10"
      >
        Documentation
      </Button>

      <Button v-if="!isLoginPage" variant="secondary" @on-click="logout">Logout</Button>
    </div>
  </div>
</template>
