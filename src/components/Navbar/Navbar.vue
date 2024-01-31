<script setup lang="ts">
import { STEP_DETAILS } from '@/constants/common'
import { useWeb3authStore } from '@/store/web3authStore'
import { Button, Icon } from '@toruslabs/vue-components'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Web3Auth
const web3Auth = useWeb3authStore()

const StepItems = STEP_DETAILS

const emits = defineEmits(['onRedirect', 'onMenuClick'])

const isMenuOpen = ref(false)

const handleDocsLink = () => {
  window.open('https://web3auth.io/docs', '_blank')
}

const getStepLogo = (url: string) => {
  return new URL(`../../assets/images/${url}.svg`, import.meta.url).href
}

const handleMenuClick = (index: number) => {
  isMenuOpen.value = false
  emits('onMenuClick', index)
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
</script>

<template>
  <div class="w-full relative">
    <div
      :class="[
        'p-6 flex items-center justify-between sm:bg-transparent w-full',
        { 'bg-white': web3Auth.isLoggedIn }
      ]"
    >
      <img
        src="@/assets/images/logo.svg"
        alt="web3auth demo logo"
        @click="emits('onRedirect')"
        class="cursor-pointer"
      />
      <Button v-if="web3Auth.isLoggedIn" pill class="!hidden xl:!flex" @on-click="logout">
        Logout
      </Button>
      <Button v-if="!web3Auth.isLoggedIn" pill @on-click="handleDocsLink()"> Documentation </Button>
      <Icon
        v-if="web3Auth.isLoggedIn"
        name="menu-alt-two-solid-icon"
        size="30"
        class="flex xl:hidden cursor-pointer"
        @click="isMenuOpen = !isMenuOpen"
      />
    </div>
    <div
      v-show="isMenuOpen && web3Auth.isLoggedIn"
      class="block xl:hidden absolute bg-white px-10 py-7 w-full rounded-b-2xl shadow-2xl z-10"
    >
      <Button variant="text" class="!text-black !justify-start" @on-click="isMenuOpen = false">
        <Icon name="chevron-left-solid-icon" class="-ml-2" /> Back
      </Button>
      <p class="text-lg font-bold mt-4">Next Steps</p>
      <ul class="flex flex-col gap-4 mt-4">
        <li
          v-for="(item, idx) in StepItems"
          :key="idx"
          class="flex items-center gap-4"
          @click="handleMenuClick(idx)"
        >
          <img :src="getStepLogo(item?.img)" class="w-7 h-7" />
          <h1 class="text-sm font-bold">{{ item?.heading1 || '' }} {{ item?.heading2 || '' }}</h1>
        </li>
      </ul>
      <!-- <Button variant="secondary" pill block class="mt-4" @on-click="handleMenuClick(-1)">
        View login time
      </Button> -->
      <Button pill block class="mt-4" @on-click="logout">Logout</Button>
    </div>
  </div>
</template>
