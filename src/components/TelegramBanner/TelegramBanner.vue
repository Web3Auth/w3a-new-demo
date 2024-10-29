<script setup lang="ts">
import { Badge } from '@toruslabs/vue-components/Badge'
import { Icon } from '@toruslabs/vue-components/Icon'

const handleURL = () => {
  window.open('https://t.me/w3a_tg_mini_app_bot', '_blank')
}
</script>

<template>
  <div
    class="rounded-[10px] flex gap-x-2 items-center bg-app-white dark:bg-app-gray-800 w-full lg:!w-[368px] p-4 cursor-pointer"
    @click="handleURL"
  >
    <Badge variant="info" class="gap-x-1 p-2 sm:px-2.5 sm:py-1 rounded-[10px]">
      <Icon
        name="sparkles-solid-icon"
        class="text-app-primary-600 dark:text-app-primary-400 !w-4 !h-4"
      />
      <p class="uppercase">New</p>
    </Badge>
    <p class="text-sm text-app-gray-900 dark:text-app-white font-medium">
      Try out our Telegram MiniApp
    </p>
    <button class="ml-auto" @click="handleURL">
      <Icon name="chevron-right-solid-icon" class="text-app-gray-900 dark:text-app-white" />
    </button>
  </div>
</template>
