<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Link } from '@toruslabs/vue-components/Link'
import { useI18n } from 'petite-vue-i18n'

import DocsDetails from '@/components/DocsDetails'
import LoginDetails from '@/components/LoginDetails'
import MfaDetails from '@/components/MfaDetails'
import NftServices from '@/components/NftServices'
import Passkeys from '@/components/Passkeys'
import WalletServices from '@/components/WalletServices'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-1 p-4 sm:px-10 sm:py-6">
    <div class="columns-1 break-before-avoid sm:columns-2 lg:columns-3 xl:columns-4">
      <div class="mb-4 break-inside-avoid space-y-4">
        <LoginDetails />
        <Passkeys />
        <MfaDetails />
      </div>
      <div class="mb-4 break-inside-avoid lg:break-after-avoid xl:break-after-column">
        <WalletServices />
      </div>
      <div class="mb-4 break-inside-avoid xl:break-after-column">
        <NftServices />
      </div>
      <div class="break-inside-avoid space-y-4">
        <DocsDetails />
        <Card
          class="w-full !rounded-2xl !border-0 px-8 py-6 text-sm text-app-gray-800 !shadow-modal dark:!border-app-gray-800 dark:text-app-gray-400 dark:!shadow-dark"
          >{{ t('dashboard.have-any-que') }}
          <Link
            class="dark:text-app-primary-500"
            href="https://calendly.com/web3auth/meeting-with-web3auth"
            target="_blank"
            rel="noopener noreferrer"
            >{{ t('dashboard.demo-call') }}</Link
          >
          {{ t('dashboard.schedule-call') }}</Card
        >
      </div>
    </div>
  </div>
</template>
