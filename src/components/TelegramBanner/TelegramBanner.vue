<script setup lang="ts">
import { Badge } from '@toruslabs/vue-components/Badge'
import { Icon } from '@toruslabs/vue-components/Icon'
import { useI18n } from 'petite-vue-i18n'

const { t } = useI18n()

const handleURL = () => {
  window.open('https://t.me/w3a_tg_mini_app_bot', '_blank')
}
</script>

<template>
  <button
    type="button"
    class="flex w-full cursor-pointer appearance-none items-center gap-x-2 rounded-[10px] bg-app-white p-4 dark:bg-app-gray-800 max-sm:z-[1000000] md:!w-[340px] lg:!w-[368px]"
    @click="handleURL"
  >
    <Badge variant="info" class="gap-x-1 rounded-[10px] p-2 sm:px-2.5 sm:py-1">
      <Icon
        name="sparkles-solid-icon"
        class="!h-4 !w-4 text-app-primary-600 dark:text-app-primary-400"
      />
      <p class="uppercase">New</p>
    </Badge>
    <p class="text-sm font-medium text-app-gray-900 dark:text-app-white">
      {{ t('login.telegram-banner') }}
    </p>

    <Icon name="chevron-right-solid-icon" class="ml-auto text-app-gray-900 dark:text-app-white" />
  </button>
</template>
