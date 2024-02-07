<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Avatar } from '@toruslabs/vue-components/Avatar'
import { Icon } from '@toruslabs/vue-components/Icon'
import { Button } from '@toruslabs/vue-components/Button'
import { Drawer } from '@toruslabs/vue-components/Drawer'
import { getCountryName, getBrowserName, getOSName, getTruncateString } from '@/utils/common'

import CardHeading from '../CardHeading'
import { useWeb3authStore } from '@/store/web3authStore'
import { ROUTES } from '@/constants/common'
import { useRouter } from 'vue-router'

const web3Auth = useWeb3authStore()
const router = useRouter()

const openConsole = ref(false)
const isCopied = ref(false)
const countryName = ref('')
const browserName = ref('')
const osName = ref('')
const userInfo = computed(() => web3Auth.userInfo)
const account = ref('')

onMounted(async () => {
  countryName.value = (await getCountryName()) || ''
  browserName.value = getBrowserName()
  osName.value = getOSName()

  account.value = web3Auth.accounts[0].address
})

const handleConsoleBtn = async () => {
  if (userInfo.value) {
    openConsole.value = true
    return
  }
}

const handleCopyAddress = () => {
  isCopied.value = true
  navigator.clipboard.writeText(account?.value || '')
  setTimeout(() => {
    isCopied.value = false
  }, 1000)
}

const onViewSteps = () => {
  router.push({ name: ROUTES.STEPS })
}

const returnAvatarLetter = (name: string) => {
  if (!name) return 'W3A'
  if (name.includes('@')) {
    return `${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}`
  } else {
    return `${name.split(' ')[0].charAt(0).toUpperCase()}${name
      .split(' ')[1]
      .charAt(0)
      .toUpperCase()}`
  }
}
</script>
<template>
  <div>
    <CardHeading
      heading="Welcome, You’ve logged in!"
      btn-label="See how we scale for you"
      :show-btn="false"
    />
    <div class="max-w-xl mx-auto">
      <div class="px-4 py-6 border border-app-gray-300 rounded-2xl">
        <div class="flex items-center w-full gap-3 sm:gap-5 mb-4 sm:mb-6">
          <Avatar size="xl" :rounded="false" class="text-2xl flex-shrink-0 w-[80px] h-[80px]">
            <img
              v-if="userInfo?.profileImage"
              :src="userInfo?.profileImage"
              class="w-full h-full"
            />
            <span v-else>
              {{ returnAvatarLetter(userInfo?.name || '') }}
            </span>
          </Avatar>
          <div class="flex flex-col w-full justify-between">
            <h1 class="text-2xl text-app-gray-600 font-bold mb-2">
              {{ userInfo?.name || '' }}
            </h1>
            <div class="flex flex-row items-center w-full gap-2">
              <Button
                size="sm"
                class="gap-2 w-full md:w-fit"
                :pill="true"
                variant="tertiary"
                @on-click="handleCopyAddress"
              >
                {{ getTruncateString(account || '') }}
                <div class="relative">
                  <div
                    v-if="isCopied"
                    class="absolute bottom-[150%] left-1/2 -translate-x-1/2 bg-app-white py-2 px-4 rounded-lg text-black text-sm text-center w-max shadow-md"
                  >
                    Copied
                    <div
                      class="absolute border-8 border-b-0 border-r-transparent border-t-app-white border-l-transparent top-[100%] left-[calc(50%_-_8px)]"
                    ></div>
                  </div>
                  <Icon
                    :name="isCopied ? 'check-circle-solid-icon' : 'document-duplicate-icon'"
                    :class="['cursor-pointer', isCopied ? 'text-app-success' : 'text-app-gray-400']"
                  />
                </div>
              </Button>
              <div
                class="hidden sm:flex items-center gap-2 flex-1 px-3 py-2 bg-app-gray-200 text-app-gray-500 text-xs font-medium rounded-2xl"
              >
                <Icon
                  v-if="userInfo?.typeOfLogin === 'jwt'"
                  name="mail-icon"
                  class="text-app-gray-400"
                />
                <Icon v-else :name="`${userInfo?.typeOfLogin}-icon`" class="text-app-gray-400" />
                {{ userInfo?.email ? userInfo?.email : userInfo?.name }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex mb-4 sm:hidden items-center gap-2 flex-1 px-3 py-2 bg-app-gray-200 text-app-gray-500 text-xs font-medium rounded-2xl"
        >
          <Icon v-if="userInfo?.typeOfLogin === 'jwt'" name="mail-icon" class="text-app-gray-400" />
          <Icon v-else :name="`${userInfo?.typeOfLogin}-icon`" class="text-app-gray-400" />
          {{ userInfo?.email ? userInfo?.email : userInfo?.name }}
        </div>
        <Button
          variant="secondary"
          size="xs"
          class="flex items-center gap-2 !border-app-gray-300 !text-xs font-medium !text-app-gray-800"
          block
          @on-click="handleConsoleBtn"
        >
          View User Info in Console <Icon name="arrow-right-icon" />
        </Button>
      </div>
      <div
        class="rounded-xl border border-app-gray-200 py-4 px-6 flex flex-col sm:flex-row items-start sm:items-center w-full mt-4"
      >
        <div
          class="flex items-center gap-5 flex-1 w-full max-sm:pb-6 max-sm:border-b sm:border-r border-app-gray-200"
        >
          <div class="w-14 h-14 rounded-full bg-app-gray-100 flex items-center justify-center">
            <img src="@/assets/images/desktop-computer.svg" class="h-6 w-6" />
          </div>
          <div class="flex flex-col items-start gap-2">
            <p class="text-lg text-app-gray-400 font-normal">Device</p>
            <p class="text-sm sm:text-sm text-app-gray-600 font-medium">
              {{ browserName }} on {{ osName }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-5 flex-1 max-sm:pt-6 sm:pl-6">
          <div class="w-14 h-14 rounded-full bg-app-gray-100 flex items-center justify-center">
            <img src="@/assets/images/globe.svg" class="h-6 w-6" />
          </div>
          <div class="flex flex-col items-start gap-2">
            <p class="text-lg text-app-gray-400 font-normal">Location</p>
            <p class="text-sm sm:text-sm text-app-gray-600 font-medium">{{ countryName }}</p>
          </div>
        </div>
      </div>
      <Button pill block class="mt-10 flex xl:!hidden" @on-click="onViewSteps"
        >View next steps</Button
      >
    </div>
  </div>
  <Drawer
    :open="openConsole"
    :backdrop-close-icon="false"
    placement="right"
    :classes="{
      container: '!w-full sm:!w-[421px] border-l border-app-gray-200',
      backdropContainer: 'opacity-0',
      sidebarCloseBtn: '!top-4 !right-4'
    }"
    sidebar-close-icon
    @on-close="openConsole = false"
  >
    <template #sidebar>
      <div class="p-5 flex flex-col flex-1 h-full">
        <h3 class="text-center text-base text-app-gray-600">User Info Console</h3>
        <div
          class="rounded-2xl p-4 bg-app-gray-100 flex flex-col flex-1 my-6 h-full w-full overflow-x-auto"
        >
          <pre class="text-sm break-words leading-relaxed text-wrap">{{ userInfo }}</pre>
        </div>
        <Button block pill @on-click="openConsole = false">Close</Button>
      </div>
    </template>
  </Drawer>
</template>

<style scoped></style>
