<script setup lang="ts">
import { Icon } from '@toruslabs/vue-components/Icon'
import { computed } from 'vue'

import useCustomConfig from '@/composables/use-custom-config'

const customConfig = useCustomConfig()
const config = computed(() => customConfig.config)
</script>

<template>
  <div class="mb-6 max-sm:z-[1000000]">
    <button
      type="button"
      class="flex items-center justify-center gap-2 rounded-full pl-2 pr-4 py-2 bg-app-gray-200 dark:bg-app-gray-800"
      @click="customConfig.setActiveTheme"
    >
      <div class="h-8 w-8 bg-app-white rounded-full flex justify-center items-center">
        <Icon
          class="text-app-gray-500"
          :name="config.value.isDark ? 'moon-solid-icon' : 'sun-solid-icon'"
          size="24"
        />
      </div>
      <div class="leading-none text-left text-sm text-app-gray-500 dark:text-app-gray-400">
        {{ config.value.isDark ? 'DARK' : 'LIGHT' }}<br />MODE
      </div>
    </button>
  </div>
</template>
