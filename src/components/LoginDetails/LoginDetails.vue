<script setup lang="ts">
import { Card } from '@toruslabs/vue-components'
import { Avatar } from '@toruslabs/vue-components/Avatar'
import { Button } from '@toruslabs/vue-components/Button'
import { Drawer } from '@toruslabs/vue-components/Drawer'
import { Icon } from '@toruslabs/vue-components/Icon'
import { Link } from '@toruslabs/vue-components/Link'
import { IProvider } from '@web3auth/base'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import { onMounted, ref, watch } from 'vue'

import Divider from '@/components/Divider'
import { getAccounts } from '@/services/ethHandlers'
import { getTruncateString } from '@/utils/common'

const openConsole = ref(false)
const isCopied = ref(false)
const account = ref<string | undefined>('')
const { userInfo, provider } = useWeb3Auth()

onMounted(async () => {
  const address = await getAccounts(provider.value as IProvider)
  account.value = address
})

watch(provider, async (newProvider) => {
  if (newProvider) {
    const address = await getAccounts(newProvider as IProvider)
    account.value = address
  }
})

const handleConsoleBtn = () => {
  if (userInfo.value) {
    openConsole.value = true
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
  }
  return `${name.split(' ')[0].charAt(0).toUpperCase()}${name
    .split(' ')[1]
    .charAt(0)
    .toUpperCase()}`
}
</script>
<template>
  <Card
    class="px-8 py-6 text-center w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <Avatar size="xl" class="text-lg flex-shrink-0 w-[60px] h-[60px] mb-2">
      <img
        v-if="userInfo?.profileImage"
        alt="profile-image"
        :src="userInfo?.profileImage"
        class="w-full h-full"
      />
      <span v-else>
        {{ returnAvatarLetter(userInfo?.name || '') }}
      </span>
    </Avatar>
    <div>
      <h3 class="font-bold text-app-gray-800 dark:text-app-white mb-2">
        {{ userInfo?.name || '' }}
      </h3>
      <p class="text-xs text-app-gray-400 mb-1">
        {{ userInfo?.email ? userInfo?.email : userInfo?.name }}
      </p>
      <button type="button" class="leading-none" @click="handleConsoleBtn">
        <Link class="text-xs dark:text-app-primary-500">View User Info</Link>
      </button>
    </div>

    <Divider />

    <div class="space-y-2">
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @click="handleCopyAddress"
      >
        {{ getTruncateString(account || '') }}
        <div class="relative">
          <div
            v-if="isCopied"
            class="absolute bottom-[150%] left-1/2 -translate-x-1/2 bg-app-white dark:bg-app-gray-600 py-2 px-4 rounded-lg text-black text-sm text-center w-max shadow-md"
          >
            Copied
            <div
              class="absolute border-8 border-b-0 border-r-transparent border-t-app-white dark:border-t-app-gray-600 border-l-transparent top-[100%] left-[calc(50%_-_8px)]"
            ></div>
          </div>
          <div>
            <Icon
              size="16"
              :name="isCopied ? 'check-circle-solid-icon' : 'document-duplicate-icon'"
              :class="[
                'cursor-pointer',
                isCopied ? 'text-app-success' : 'text-app-gray-800 dark:!text-app-white'
              ]"
            />
          </div>
        </div>
      </Button>
      <!-- <Button size="sm" class="gap-2 w-full" variant="secondary">Export Private Keys</Button> -->
    </div>
  </Card>
  <Drawer
    :open="openConsole"
    :backdrop-close-icon="false"
    placement="right"
    :classes="{
      container: '!w-full sm:!w-[421px] border-l border-app-gray-200 dark:border-app-gray-500',
      backdropContainer: 'opacity-0',
      sidebarCloseBtn: '!top-4 !right-4'
    }"
    sidebar-close-icon
    @on-close="openConsole = false"
  >
    <template #sidebar>
      <div class="p-5 flex flex-col flex-1 h-full">
        <h3 class="text-center text-base text-app-gray-600 dark:text-app-white">
          User Info Console
        </h3>
        <div
          class="rounded-2xl p-4 bg-app-gray-100 dark:bg-app-dark-surface2 flex flex-col flex-1 my-6 h-full w-full overflow-x-auto"
        >
          <pre class="text-sm break-words leading-relaxed text-wrap dark:text-app-white">{{
            userInfo
          }}</pre>
        </div>
        <Button block @on-click="openConsole = false">Close</Button>
      </div>
    </template>
  </Drawer>
</template>

<style scoped></style>
