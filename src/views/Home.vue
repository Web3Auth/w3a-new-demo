<script setup lang="ts">
import { Button } from '@toruslabs/vue-components'
import Steps from '@/components/Steps'
import { ROUTES } from '@/constants/common'
import { useWeb3authStore } from '@/store/web3authStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const web3Auth = useWeb3authStore()
const router = useRouter()

function goToSteps() {
  router.push({ name: ROUTES.STEPS })
}

const showBackButton = computed(() => {
  return ![ROUTES.STEPS, ROUTES.WELCOME].includes(router.currentRoute.value.name as string)
})

onMounted(() => {
  if (!web3Auth.isLoggedIn) {
    router.push({ name: ROUTES.LOGIN })
  }
})
</script>

<template>
  <div class="flex-1 p-6 pt-0">
    <div v-if="showBackButton" class="!flex xl:!hidden">
      <Button
        variant="text"
        :pill="true"
        class="!text-gray-400 !px-6"
        @on-click="goToSteps"
      >
        <Icon name="chevron-left-solid-icon" /> Back to next steps
      </Button>
    </div>
    <div class="flex gap-6">
      <Steps class="hidden xl:flex bg-white shadow-xl rounded-2xl p-6" />
      <div class="flex flex-col flex-1 bg-white px-8 py-6 rounded-2xl shadow-lg overflow-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>
