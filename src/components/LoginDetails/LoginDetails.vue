<script setup lang="ts">
import { Card } from '@toruslabs/vue-components'
import { Avatar } from '@toruslabs/vue-components/Avatar'
import { Button } from '@toruslabs/vue-components/Button'
import { Drawer } from '@toruslabs/vue-components/Drawer'
import { Icon } from '@toruslabs/vue-components/Icon'
import { Link } from '@toruslabs/vue-components/Link'
import { IProvider } from '@web3auth/base'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import { useI18n } from 'petite-vue-i18n'
import { onMounted, ref, watch } from 'vue'

import Divider from '@/components/Divider'
import { getAccounts } from '@/services/ethHandlers'
import { getTruncateString } from '@/utils/common'

const openConsole = ref(false)
const isCopied = ref(false)
const account = ref<string | undefined>('')
const { userInfo, provider } = useWeb3Auth()
const { t } = useI18n()

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
  return `${name.split(' ')[0].charAt(0).toUpperCase()}${name.split(' ')[1].charAt(0).toUpperCase()}`
}
</script>
<template>
  <Card
    class="w-full !rounded-2xl !border-0 px-8 py-6 text-center !shadow-modal dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <Avatar size="xl" class="mb-2 size-[60px] shrink-0 text-lg">
      <img
        v-if="userInfo?.profileImage"
        alt="profile-image"
        :src="userInfo?.profileImage"
        class="size-full"
      />
      <span v-else class="text-app-gray-900 dark:text-app-white">
        {{ returnAvatarLetter(userInfo?.name || '') }}
      </span>
    </Avatar>
    <div>
      <h3 class="mb-2 font-bold text-app-gray-800 dark:text-app-white">
        {{ userInfo?.name || '' }}
      </h3>
      <p class="mb-1 text-xs text-app-gray-400">
        {{ userInfo?.email ? userInfo?.email : userInfo?.name }}
      </p>
      <button type="button" class="leading-none" @click="handleConsoleBtn">
        <Link class="text-xs dark:text-app-primary-500">{{ t('dashboard.userInfo') }}</Link>
      </button>
    </div>

    <Divider />

    <div class="space-y-2">
      <Button
        size="sm"
        class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @click="handleCopyAddress"
      >
        {{ getTruncateString(account || '') }}
        <div class="relative">
          <div
            v-if="isCopied"
            class="text-black absolute bottom-[150%] left-1/2 w-max -translate-x-1/2 rounded-lg bg-app-white px-4 py-2 text-center text-sm shadow-md dark:bg-app-gray-600"
          >
            {{ t('dashboard.copied') }}
            <div
              class="absolute left-[calc(50%_-_8px)] top-full border-8 border-b-0 border-x-transparent border-t-app-white dark:border-t-app-gray-600"
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
      <div class="flex h-full flex-1 flex-col p-5">
        <h3 class="text-center text-base text-app-gray-600 dark:text-app-white">
          {{ t('dashboard.userInfo-console') }}
        </h3>
        <div
          class="my-6 flex size-full flex-1 flex-col overflow-x-auto rounded-2xl bg-app-gray-100 p-4 dark:bg-app-dark-surface2"
        >
          <pre class="text-wrap break-words text-sm leading-relaxed dark:text-app-white">{{
            userInfo
          }}</pre>
        </div>
        <Button block @on-click="openConsole = false"> {{ t('dashboard.close') }}</Button>
      </div>
    </template>
  </Drawer>
</template>

<style scoped></style>
