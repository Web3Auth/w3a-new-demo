<script setup lang="ts">
import { Badge } from '@toruslabs/vue-components/Badge'
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import { useI18n } from 'petite-vue-i18n'
import { computed } from 'vue'

import Divider from '../Divider'

const { t } = useI18n()

const passkeys = computed((): { id: string; name: string; detail: string }[] => [])

const hasPasskeys = computed(() => passkeys.value.length > 0)

function deletePasskey(_id: string) {}
</script>
<template>
  <Card
    class="w-full !rounded-2xl !border-0 px-8 py-6 !shadow-modal dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <div class="mb-1 flex items-center justify-between">
        <h3 class="font-semibold text-app-gray-900 dark:text-app-white">
          {{ t('dashboard.passkeys') }}
        </h3>
        <!-- <Badge :variant="hasPasskeys ? 'success' : 'default'">{{
          hasPasskeys ? 'Enabled' : 'Disabled'
        }}</Badge> -->
        <Badge variant="default">{{ t('dashboard.coming-soon') }}</Badge>
      </div>

      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        {{ t('dashboard.passkey-subtext') }}
      </p>
    </div>

    <Button
      size="sm"
      class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 disabled:!text-app-gray-400 dark:!text-app-white"
      variant="secondary"
      disabled
      >{{ t('dashboard.register-passkey') }}</Button
    >

    <Divider v-if="hasPasskeys" class="mb-0 mt-4" />

    <div v-if="hasPasskeys" class="divide-y divide-app-gray-200 dark:divide-app-gray-500">
      <div v-for="passkey in passkeys" :key="passkey.id" class="flex items-center py-4">
        <div class="mr-2">
          <Icon name="key-icon" class="size-5 text-app-gray-900 dark:text-app-white" />
        </div>
        <div>
          <h4 class="text-sm font-semibold text-app-gray-900 dark:text-app-white">
            {{ passkey.name }}
          </h4>
          <p class="text-xs text-app-gray-400">{{ passkey.detail }}</p>
        </div>
        <div class="ml-auto">
          <Button icon rounded variant="text" @on-click="deletePasskey(passkey.id)">
            <Icon name="minus-circle-icon" class="size-5 text-app-gray-900 dark:text-app-white" />
          </Button>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
