<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import LoginDetails from '@/components/LoginDetails'
import WalletServices from '@/components/WalletServices'
import DocsDetails from '@/components/DocsDetails'
import MfaDetails from '@/components/MfaDetails'
import NftServices from '@/components/NftServices'
import Passkeys from '@/components/Passkeys'
</script>

<template>
  <div class="flex-1 flex py-4 px-4 sm:py-6 sm:px-10">
    <div class="w-full gap-4 grid grid-cols-4">
      <div class="space-y-4">
        <LoginDetails />
        <Passkeys />
        <MfaDetails />
      </div>
      <div class="space-y-4">
        <WalletServices />
      </div>
      <div class="space-y-4">
        <NftServices />
      </div>
      <div class="space-y-4">
        <DocsDetails />
        <Card class="px-8 py-6 text-sm text-app-gray-800 w-full !rounded-2xl"
          >Have any questions?
          <a class="text-app-primary-600 hover:underline" href="tel:+">Schedule a demo call</a> with
          our team today</Card
        >
      </div>
    </div>
  </div>
</template>
