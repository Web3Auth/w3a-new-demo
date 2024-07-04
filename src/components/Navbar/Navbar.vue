<script setup lang="ts">
import { ROUTES } from '@/constants/common'
import { useWeb3authStore } from '@/store/web3authStore'
import { Button } from '@toruslabs/vue-components/Button'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
        'py-6 px-8 flex items-center justify-between bg-app-white dark:bg-app-gray-800 w-full'
      ]"
    >
      <img
        src="@/assets/images/logo.svg"
        alt="web3auth demo logo"
        class="cursor-pointer h-12 w-auto dark:hidden"
      />
      <img
        src="@/assets/images/logo-light.svg"
        alt="web3auth demo logo"
        class="cursor-pointer h-12 w-auto hidden dark:block"
      />
      <Button v-if="isLoginPage" pill @on-click="handleDocsLink" id="w3a-documentation">
        Documentation
      </Button>
      <Button v-else variant="secondary" @on-click="logout">Logout</Button>
    </div>
  </div>
</template>
