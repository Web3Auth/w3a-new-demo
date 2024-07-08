<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Link } from '@toruslabs/vue-components/Link'
import LoginDetails from '@/components/LoginDetails'
import WalletServices from '@/components/WalletServices'
import DocsDetails from '@/components/DocsDetails'
import MfaDetails from '@/components/MfaDetails'
import NftServices from '@/components/NftServices'
import Passkeys from '@/components/Passkeys'
</script>

<template>
  <div class="flex-1 flex py-4 px-4 sm:py-6 sm:px-10">
    <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 break-before-avoid">
      <div class="break-inside-avoid space-y-4 mb-4">
        <LoginDetails />
        <Passkeys />
        <MfaDetails />
      </div>
      <div class="break-inside-avoid lg:break-after-avoid xl:break-after-column mb-4">
        <WalletServices />
      </div>
      <div class="break-inside-avoid xl:break-after-column mb-4">
        <NftServices />
      </div>
      <div class="break-inside-avoid space-y-4">
        <DocsDetails />
        <Card class="px-8 py-6 text-sm text-app-gray-800 dark:text-app-gray-400 w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
          >Have any questions?
          <Link
            class="dark:text-app-primary-500"
            href="https://calendly.com/web3auth/meeting-with-web3auth"
            target="_blank"
            rel="noopener noreferrer"
            >Schedule a demo call</Link
          >
          with our team today</Card
        >
      </div>
    </div>
  </div>
</template>
