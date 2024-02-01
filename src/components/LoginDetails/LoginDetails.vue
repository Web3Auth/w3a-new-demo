<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Avatar, Card, Icon, Button, Drawer } from '@toruslabs/vue-components'
import {
  getCountryName,
  getBrowserName,
  getOSName,
  getTruncateString,
  LOGIN_PROCESS_TIME
} from '@/utils/common'

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
const loginTimeTaken = ref(0)

onMounted(async () => {
  countryName.value = (await getCountryName()) || ''
  browserName.value = getBrowserName()
  osName.value = getOSName()

  account.value = web3Auth.accounts[0].address

  loginTimeTaken.value = parseFloat(localStorage.getItem(LOGIN_PROCESS_TIME) || '0')
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
    <div class="w-full min-[800px]:w-[80%] mx-auto mt-8 flex flex-col items-center justify-center">
      <!-- <Button
        variant="secondary"
        size="sm"
        class="items-center gap-2 !border-gray-300 text-sm font-medium !text-gray-800 flex min-[800px]:!hidden mt-4"
        block
      >
        See how we scale for you <Icon name="arrow-right-icon" />
      </Button> -->
      <div class="mb-6 text-center">
        <div class="font-semibold text-app-gray-700 mb-3">Time taken to login</div>
        <div class="font-bold text-app-primary-600 text-7xl">{{ loginTimeTaken }}s</div>
      </div>
      <div class="grid grid-cols-3 w-full gap-8">
        <Card class="p-4 !rounded-2xl">
          <img src="@/assets/images/median-logo.svg" class="mb-3 h-12 w-12" />
          <div class="text-app-gray-400 text-lg">Median</div>
          <div class="text-app-gray-600 text-2xl font-bold">1.006s</div>
        </Card>
        <Card class="p-4 !rounded-2xl">
          <img src="@/assets/images/fifty-percent-logo.svg" class="mb-3 h-12 w-12" />
          <div class="text-app-gray-400 text-lg">50th Percentile</div>
          <div class="text-app-gray-600 text-2xl font-bold">0.91s</div>
        </Card>
        <Card class="p-4 !rounded-2xl">
          <img src="@/assets/images/high-logo.svg" class="mb-4 h-12 w-12" />
          <div class="text-app-gray-400 text-lg">95th Percentile</div>
          <div class="text-app-gray-600 text-2xl font-bold">1.780s</div>
        </Card>
      </div>
      <Card class="mt-4 w-full p-4 sm:p-6 !rounded-2xl">
        <div class="flex items-center w-full gap-3 sm:gap-5 mb-4 sm:mb-6">
          <Avatar
            size="xl"
            :rounded="false"
            class="text-2xl w-[80px] h-[60px] sm:min-w-[80px] sm:min-h-[80px]"
          >
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
            <h1 class="text-base sm:text-2xl text-gray-600 font-bold mb-2">
              {{ userInfo?.name || '' }}
            </h1>
            <div class="flex flex-row items-center w-full gap-2">
              <div
                class="flex items-center justify-between w-full border px-3 py-2 border-gray-200 bg-gray-100 text-xs text-gray-500 font-medium rounded-2xl"
              >
                {{ getTruncateString(account || '') }}
                <div class="relative">
                  <div
                    v-if="isCopied"
                    class="absolute bottom-[150%] left-1/2 -translate-x-1/2 bg-app-white py-2 px-4 rounded-lg text-black text-sm text-center w-max shadow-md"
                  >
                    Copied
                    <div
                      class="absolute border-8 border-b-0 border-r-transparent border-t-white border-l-transparent top-[100%] left-[calc(50%_-_8px)]"
                    ></div>
                  </div>
                  <Icon
                    :name="isCopied ? 'check-circle-solid-icon' : 'document-duplicate-icon'"
                    :class="['cursor-pointer', isCopied ? 'text-green-600' : 'text-gray-400']"
                    @click="handleCopyAddress"
                  />
                </div>
              </div>
              <p
                class="hidden sm:flex items-center gap-2 flex-1 border px-3 py-2 border-gray-200 bg-gray-100 text-xs text-gray-500 font-medium rounded-2xl"
              >
                <Icon
                  v-if="userInfo?.typeOfLogin === 'jwt'"
                  name="mail-icon"
                  class="text-gray-400"
                />
                <Icon v-else :name="`${userInfo?.typeOfLogin}-icon`" class="text-gray-400" />
                {{ userInfo?.email ? userInfo?.email : userInfo?.name }}
              </p>
            </div>
          </div>
        </div>
        <p
          class="flex sm:hidden mb-4 items-center gap-2 flex-1 border px-3 py-2 border-gray-200 bg-gray-100 text-xs text-gray-500 font-medium rounded-2xl"
        >
          <Icon v-if="userInfo?.typeOfLogin === 'jwt'" name="mail-icon" class="text-gray-400" />
          <Icon else :name="`${userInfo?.typeOfLogin}-icon`" class="text-gray-400" />
          {{ userInfo?.email ? userInfo?.email : userInfo?.name }}
        </p>
        <Button
          variant="secondary"
          size="xs"
          class="flex items-center gap-2 !border-gray-300 !text-xs font-medium !text-gray-800"
          block
          @on-click="handleConsoleBtn"
        >
          View User Info in Console <Icon name="arrow-right-icon" />
        </Button>
      </Card>
      <div
        class="rounded-xl border border-gray-200 py-4 px-6 flex flex-col sm:flex-row items-start sm:items-center w-full mt-4"
      >
        <div
          class="flex items-center gap-5 flex-1 max-sm:pb-6 max-sm:border-b sm:border-r border-gray-200"
        >
          <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <img src="@/assets/images/desktop-computer.svg" class="h-6 w-6" />
          </div>
          <div class="flex flex-col items-start gap-2">
            <p class="text-lg text-gray-400 font-normal">Device</p>
            <p class="text-sm sm:text-sm text-gray-600 font-medium">
              {{ browserName }} on {{ osName }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-5 flex-1 max-sm:pt-6 sm:pl-6">
          <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <img src="@/assets/images/globe.svg" class="h-6 w-6" />
          </div>
          <div class="flex flex-col items-start gap-2">
            <p class="text-lg text-gray-400 font-normal">Location</p>
            <p class="text-sm sm:text-sm text-gray-600 font-medium">{{ countryName }}</p>
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
        <h3 class="text-center text-base text-gray-600">User Info Console</h3>
        <div
          class="rounded-2xl p-4 bg-gray-100 flex flex-col flex-1 my-6 h-full w-full overflow-x-auto"
        >
          <pre class="text-sm break-words leading-relaxed">{{ userInfo }}</pre>
        </div>
        <Button block pill @on-click="openConsole = false">Close</Button>
      </div>
    </template>
  </Drawer>
</template>

<style scoped></style>
