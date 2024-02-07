<script setup lang="ts">
import { Icon, Card } from '@toruslabs/vue-components'
import Steps from '@/components/Steps'
import { ROUTES } from '@/constants/common'
import { useWeb3authStore } from '@/store/web3authStore'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const web3Auth = useWeb3authStore()
const router = useRouter()
const route = useRoute()

function goToSteps() {
  router.push({ name: ROUTES.STEPS })
}

const showBackButton = computed(() => {
  return ![ROUTES.STEPS, ROUTES.WELCOME].includes(router.currentRoute.value.name as string)
})

const isSteps = computed(() => route.name === ROUTES.STEPS)

onMounted(() => {
  if (!web3Auth.isLoggedIn) {
    router.push({ name: ROUTES.LOGIN })
  }
})
</script>

<template>
  <div class="flex-1 flex flex-col px-4 sm:px-6 pt-0 pb-12">
    <div v-if="showBackButton" class="!flex xl:!hidden">
      <button
        type="button"
        class="text-app-gray-400 hover:text-app-gray-500 mb-4 text-xs flex items-center"
        @click="goToSteps"
      >
        <Icon class="mr-2" name="chevron-left-solid-icon" /> Back to next steps
      </button>
    </div>
    <div class="flex flex-1 gap-6">
      <Card class="hidden xl:block !rounded-2xl">
        <Steps class="bg-white p-6" />
      </Card>
      <Card v-if="!isSteps" :class="[`flex-1 !rounded-2xl px-6 py-6 md:px-10 md:py-8`, isSteps ? 'hidden xl:flex' : '']">
        <router-view />
      </Card>
      <router-view v-if="isSteps" class="xl:hidden" />
    </div>
  </div>
</template>
