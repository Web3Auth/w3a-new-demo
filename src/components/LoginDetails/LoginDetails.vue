<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Avatar, Card, Icon, Button, Drawer } from '@toruslabs/vue-components'
import { getCountryName, getBrowserName, getOSName, getTruncateString } from '@/utils/common'

import CardHeading from '../CardHeading'
import { useWeb3authStore } from '@/store/web3authStore'

const web3Auth = useWeb3authStore()

const openConsole = ref(false)
const isCopied = ref(false)
const countryName: any = ref(null)
const browserName: any = ref(null)
const osName: any = ref(null)
const userInfo: any = ref(null)
const account: any = ref(null)

onMounted(async () => {
  countryName.value = await getCountryName()
  browserName.value = getBrowserName()
  osName.value = getOSName()

  account.value = web3Auth.accounts[0].address
  userInfo.value = web3Auth.userInfo
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
      <!-- <h2 class="text-base text-gray-700">Time taken to login</h2>
      <h1 class="text-5xl sm:text-7xl font-bold text-blue-600 mt-4">1.010s</h1> -->
      <!-- Mobile -->
      <!-- <div
        class="w-full sm:auto px-5 py-4 border border-gray-300 rounded-2xl flex min-[800px]:hidden gap-4 mt-6 justify-center"
      >
        <div class="text-xs font-normal text-gray-400 text-center">
          <p>Average</p>
          <p class="text-xl font-bold text-gray-600">1.006s</p>
        </div>
        <div class="w-[1px] h-auto bg-gray-300" />
        <div class="text-xs font-normal text-gray-400 text-center">
          <p>50 Percentile</p>
          <p class="text-xl font-bold text-gray-600">0.910s</p>
        </div>
        <div class="w-[1px] h-auto bg-gray-300" />
        <div class="text-xs font-normal text-gray-400 text-center">
          <p>90 Percentile</p>
          <p class="text-xl font-bold text-gray-600">1.780s</p>
        </div>
      </div> -->

      <Button
        variant="secondary"
        size="sm"
        class="items-center gap-2 !border-gray-300 text-sm font-medium !text-gray-800 flex min-[800px]:!hidden mt-4"
        block
      >
        See how we scale for you <Icon name="arrow-right-icon" />
      </Button>
      <!-- Desktop -->
      <!-- <div class="mt-8 items-center justify-between gap-8 w-full hidden min-[800px]:flex">
        <Card class="flex flex-col flex-1 p-5 !rounded-2xl">
          <img src="@/assets/images/median-logo.svg" class="h-12 w-12 mb-4" />
          <p class="text-lg text-gray-400 font-normal mb-1">Median</p>
          <p class="text-2xl text-gray-600 font-bold">1.006s</p>
        </Card>
        <Card class="flex flex-col flex-1 p-5 !rounded-2xl">
          <img src="@/assets/images/fifty-percent-logo.svg" class="h-12 w-12 mb-4" />
          <p class="text-lg text-gray-400 font-normal mb-1">50th Percentile</p>
          <p class="text-2xl text-gray-600 font-bold">0.91s</p>
        </Card>
        <Card class="flex flex-col flex-1 p-5 !rounded-2xl">
          <img src="@/assets/images/high-logo.svg" class="h-12 w-12 mb-4" />
          <p class="text-lg text-gray-400 font-normal mb-1">95th Percentile</p>
          <p class="text-2xl text-gray-600 font-bold">1.780s</p>
        </Card>
      </div> -->
      <Card class="mt-4 min-[800px]:mt-10 w-full p-4 sm:p-6 !rounded-2xl">
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
        class="rounded-xl border border-gray-200 py-4 px-6 flex flex-col sm:flex-row items-start sm:items-center w-full mt-7"
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
      <!-- <Button pill block class="mt-10 flex xl:!hidden" @on-click="emits('onViewSteps')"
        >View next steps</Button
      > -->
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
