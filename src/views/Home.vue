<template>
  <div class="flex flex-1 p-6 pt-0 gap-6">
    <Steps />
    <div class="flex flex-col flex-1 bg-white px-8 py-6 rounded-2xl shadow-lg overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Steps from '@/components/Steps'
import { ROUTES } from '@/constants/common'
import { useWeb3authStore } from '@/store/web3authStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const web3Auth = useWeb3authStore()
const router = useRouter()

// we wait for login to finish
onMounted(() => {
  if (!web3Auth.isLoggedIn) {
    router.push({ name: ROUTES.LOGIN })
  }
})
</script>
