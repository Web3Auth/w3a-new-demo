<script setup lang="ts">
import { Loader } from '@toruslabs/vue-components/Loader'

import Navbar from '@/components/Navbar'
import { onBeforeMount, ref } from 'vue'
import { useWeb3authStore } from './store/web3authStore'
import { useRouter } from 'vue-router'

const web3Auth = useWeb3authStore()
const isLoading = ref(false)
const router = useRouter()

onBeforeMount(async () => {
  isLoading.value = true
  try {
    await web3Auth.initializeWeb3Auth()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const handleLogoRedirect = () => {
  router.push('/')
}
</script>

<template>
  <div v-if="isLoading" class="h-screen flex justify-center items-center">
    <Loader :use-spinner="true" />
  </div>
  <div v-else class="min-h-screen flex flex-col">
    <Navbar @on-redirect="handleLogoRedirect" />
    <router-view />
  </div>
</template>
