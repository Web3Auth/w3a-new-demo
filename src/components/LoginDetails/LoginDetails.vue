<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Avatar } from '@toruslabs/vue-components/Avatar'
import { Icon } from '@toruslabs/vue-components/Icon'
import { Button } from '@toruslabs/vue-components/Button'
import { Link } from '@toruslabs/vue-components/Link'
import { Drawer } from '@toruslabs/vue-components/Drawer'
import { getTruncateString } from '@/utils/common'

import { useWeb3authStore } from '@/store/web3authStore'
import { Card } from '@toruslabs/vue-components'

const web3Auth = useWeb3authStore()

const openConsole = ref(false)
const isCopied = ref(false)
const userInfo = computed(() => web3Auth.userInfo)
const account = ref('')

onMounted(async () => {
  account.value = web3Auth.accounts[0]
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
  <Card class="px-8 py-6 text-center w-full !rounded-2xl">
    <Avatar size="xl" class="text-2xl flex-shrink-0 w-[60px] h-[60px] mb-2">
      <img v-if="userInfo?.profileImage" :src="userInfo?.profileImage" class="w-full h-full" />
      <span v-else>
        {{ returnAvatarLetter(userInfo?.name || '') }}
      </span>
    </Avatar>
    <div>
      <h3 class="font-bold text-app-gray-800 mb-2">{{ userInfo?.name || '' }}</h3>
      <p class="text-xs text-app-gray-400 mb-1">
        {{ userInfo?.email ? userInfo?.email : userInfo?.name }}
      </p>
      <button @click="handleConsoleBtn">
        <Link class="text-xs">View User Info</Link>
      </button>
    </div>

    <hr class="h-px my-3 bg-app-gray-200 border-0" />

    <div class="space-y-2">
      <Button
        size="sm"
        class="gap-2 w-full border-app-gray-300"
        variant="secondary"
        @click="handleCopyAddress"
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
      <Button size="sm" class="gap-2 w-full" variant="secondary">Export Private Keys</Button>
    </div>
  </Card>
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
