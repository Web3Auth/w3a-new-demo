<script setup lang="ts">
import { Badge } from '@toruslabs/vue-components/Badge'
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import { computed } from 'vue'

import Divider from '../Divider'

const passkeys = computed((): { id: string; name: string; detail: string }[] => [])

const hasPasskeys = computed(() => passkeys.value.length > 0)

function deletePasskey(id: string) {
  console.log('delete passkey', id)
}
</script>
<template>
  <Card
    class="px-8 py-6 w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <h3 class="font-semibold text-app-gray-900 dark:text-app-white">Passkeys</h3>
        <!-- <Badge :variant="hasPasskeys ? 'success' : 'default'">{{
          hasPasskeys ? 'Enabled' : 'Disabled'
        }}</Badge> -->
        <Badge variant="default">Coming soon</Badge>
      </div>

      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">Link a passkey to your account</p>
    </div>

    <Button
      size="sm"
      class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white disabled:!text-app-gray-400"
      variant="secondary"
      disabled
      >Register a Passkey</Button
    >

    <Divider v-if="hasPasskeys" class="mt-4 mb-0" />

    <div v-if="hasPasskeys" class="divide-y divide-app-gray-200 dark:divide-app-gray-500">
      <div v-for="passkey in passkeys" :key="passkey.id" class="flex items-center py-4">
        <div class="mr-2">
          <Icon name="key-icon" class="text-app-gray-900 dark:text-app-white w-5 h-5" />
        </div>
        <div>
          <h4 class="text-sm font-semibold text-app-gray-900 dark:text-app-white">
            {{ passkey.name }}
          </h4>
          <p class="text-xs text-app-gray-400">{{ passkey.detail }}</p>
        </div>
        <div class="ml-auto">
          <Button icon rounded variant="text" @on-click="deletePasskey(passkey.id)">
            <Icon name="minus-circle-icon" class="text-app-gray-900 dark:text-app-white w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
