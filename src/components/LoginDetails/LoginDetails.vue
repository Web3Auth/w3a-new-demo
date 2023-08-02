<template>
  <div>
    <CardHeading
      heading="Welcome, You’ve logged in!"
      btn-label="See how we scale for you"
      @on-click="handleHeadingBtnClick"
    />
    <div class="w-full min-[800px]:w-[80%] mx-auto mt-8 flex flex-col items-center justify-center">
      <h2 class="text-base text-gray-700">Time taken to login</h2>
      <h1 class="text-5xl sm:text-7xl font-bold text-blue-600 mt-4">1.010s</h1>
      <!-- Mobile -->
      <div
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
      </div>

      <Button
        variant="secondary"
        size="sm"
        class="items-center gap-2 !border-gray-300 text-sm font-medium !text-gray-800 flex min-[800px]:!hidden mt-4"
        block
      >
        See how we scale for you <Icon name="arrow-right-icon" />
      </Button>
      <!-- Desktop -->
      <div class="mt-8 items-center justify-between gap-8 w-full hidden min-[800px]:flex">
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
      </div>
      <Card class="mt-4 min-[800px]:mt-10 w-full p-4 sm:p-6 !rounded-2xl">
        <div class="flex items-center w-full gap-3 sm:gap-5 mb-4 sm:mb-6">
          <Avatar size="xl" :rounded="false" class="text-2xl min-w-[80px] min-h-[80px]">
            <img
              v-if="userInfo?.profileImage"
              :src="userInfo?.profileImage"
              class="w-full h-full"
            />
            <span v-else>
              {{ returnAvatarLetter(userInfo?.name) }}
            </span>
          </Avatar>
          <div class="flex flex-col w-full justify-between">
            <h1 class="text-2xl text-gray-600 font-bold mb-2">{{ userInfo?.name || '' }}</h1>
            <div class="flex flex-row items-center w-full gap-2">
              <p
                class="flex items-center justify-between w-full border px-3 py-2 border-gray-200 bg-gray-100 text-xs text-gray-500 font-medium rounded-2xl"
              >
                {{ getTruncateAddress(userInfo?.idToken) }}
                <Icon
                  :name="isCopied ? 'check-circle-solid-icon' : 'document-duplicate-icon'"
                  :class="['cursor-pointer', isCopied ? 'text-green-600' : 'text-gray-400']"
                  @click="handleCopyAddress"
                />
              </p>
              <p
                class="hidden sm:flex items-center gap-4 flex-1 border px-3 py-2 border-gray-200 bg-gray-100 text-xs text-gray-500 font-medium rounded-2xl"
              >
                <Icon
                  v-if="userInfo?.typeOfLogin === 'jwt'"
                  name="mail-icon"
                  class="text-gray-400"
                />
                <Icon :name="`${userInfo?.typeOfLogin}-icon`" class="text-gray-400" />
                {{ userInfo?.email ? userInfo?.email : userInfo?.name }}
              </p>
            </div>
          </div>
        </div>
        <p
          class="flex sm:hidden mb-4 items-center gap-4 flex-1 border px-3 py-2 border-gray-200 bg-gray-100 text-xs text-gray-500 font-medium rounded-2xl"
        >
          <Icon v-if="userInfo?.typeOfLogin === 'jwt'" name="mail-icon" class="text-gray-400" />
          <Icon :name="`${userInfo?.typeOfLogin}-icon`" class="text-gray-400" />
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
      <Button pill block class="mt-10 flex xl:!hidden" @on-click="emits('onViewSteps')"
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
          <blockquote class="text-xs break-words leading-relaxed">{{ userInfo }}</blockquote>
        </div>
        <Button block pill @on-click="openConsole = false">Close</Button>
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'

import { Avatar, Card, Icon, Button, Drawer } from '@toruslabs/vue-components'
import type { Web3AuthNoModal } from '@web3auth/no-modal'
import publicKeyToAddress from 'ethereum-public-key-to-address'

import CardHeading from '../CardHeading'

const openConsole = ref(false)
const isCopied = ref(false)

const emits = defineEmits(['onViewSteps'])

const handleHeadingBtnClick = () => {
  console.log('called btn label')
}

const userInfo: any = ref(null)
const web3auth = inject<Ref<Web3AuthNoModal | null>>('web3authDetails')

onMounted(async () => {
  if (!web3auth?.value) return
  userInfo.value = await web3auth.value.getUserInfo()
})

const handleConsoleBtn = async () => {
  if (userInfo.value) {
    openConsole.value = true
    return
  }
  if (!web3auth?.value) return
  userInfo.value = await web3auth?.value?.getUserInfo()
  openConsole.value = true
}

const handleCopyAddress = () => {
  isCopied.value = true
  navigator.clipboard.writeText(parseTokenAndReturnAddress(userInfo.value?.idToken))
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

const parseTokenAndReturnAddress = (token: string) => {
  if (!token) return null
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )
  console.log(JSON.parse(jsonPayload).wallets[0].public_key)
  return publicKeyToAddress(JSON.parse(jsonPayload)?.wallets[0]?.public_key || '')
}

const getTruncateAddress = (token: string) => {
  const address = parseTokenAndReturnAddress(token) || ''
  console.log(address, 'ADD')
  return `${address.substr(0, 10)}....${address.substr(address.length - 6)}`
}
</script>

<style scoped></style>
