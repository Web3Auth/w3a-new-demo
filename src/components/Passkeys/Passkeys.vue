<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Button } from '@toruslabs/vue-components/Button'
import { Badge } from '@toruslabs/vue-components/Badge'
import { Icon } from '@toruslabs/vue-components/Icon'
import Divider from '../Divider'
import { computed } from 'vue'

const hasPasskeys = computed(() => false)
</script>
<template>
  <Card class="px-8 py-6 w-full !rounded-2xl">
    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <h3 class="font-semibold text-app-gray-900 dark:text-app-white">Passkeys</h3>
        <Badge :variant="hasPasskeys ? 'success' : 'default'">{{
          hasPasskeys ? 'Enabled' : 'Disabled'
        }}</Badge>
      </div>

      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">Link a passkey to your account</p>
    </div>

    <Button size="sm" class="gap-2 w-full" variant="secondary">Register a Passkey</Button>

    <Divider class="mt-4 mb-0" />

    <div class="divide-y divide-app-gray-200 dark:divide-app-gray-500">
      <div class="flex items-center py-4">
        <div class="mr-2">
          <Icon name="key-icon" class="text-app-gray-900 dark:text-app-white w-5 h-5" />
        </div>
        <div>
          <h4 class="text-sm font-semibold text-app-gray-900 dark:text-app-white">Passkey #1</h4>
          <p class="text-xs text-app-gray-400">Passkey 31/05/24 10:42:40</p>
        </div>
        <div class="ml-auto">
          <Icon name="minus-circle-icon" class="text-app-gray-900 dark:text-app-white w-5 h-5" />
        </div>
      </div>
      <div class="flex items-center py-4">
        <div class="mr-2">
          <Icon name="key-icon" class="text-app-gray-900 dark:text-app-white w-5 h-5" />
        </div>
        <div>
          <h4 class="text-sm font-semibold text-app-gray-900 dark:text-app-white">Passkey #2</h4>
          <p class="text-xs text-app-gray-400">Passkey 31/05/24 10:42:40</p>
        </div>
        <div class="ml-auto">
          <Icon name="minus-circle-icon" class="text-app-gray-900 dark:text-app-white w-5 h-5" />
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
