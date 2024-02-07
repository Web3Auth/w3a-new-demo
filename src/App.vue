<script setup lang="ts">
import { Loader } from '@toruslabs/vue-components/Loader'

import Navbar from '@/components/Navbar'
import { onBeforeMount, ref } from 'vue'
import { useWeb3authStore } from './store/web3authStore'

const web3Auth = useWeb3authStore()
const isLoading = ref(false)

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
</script>

<template>
  <div v-if="isLoading" class="h-screen flex justify-center items-center">
    <Loader :use-spinner="true" />
  </div>
  <div v-else class="h-screen flex flex-col">
    <Navbar />
    <router-view />
  </div>
</template>
