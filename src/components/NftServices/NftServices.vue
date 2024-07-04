<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Button } from '@toruslabs/vue-components/Button'
</script>
<template>
  <Card class="px-8 py-6 w-full !rounded-2xl">
    <div class="mb-4 text-center">
      <h3 class="font-semibold text-app-gray-900 mb-2">NFT Services</h3>

      <p class="text-xs text-app-gray-500">Let your users to claim or buy NFT in seconds</p>
    </div>

    <img src="@/assets/images/nft-sample.svg" class="w-full h-auto mb-6" />

    <div class="space-y-2 mb-4">
      <Button size="sm" class="gap-2 w-full" variant="secondary">Mint free NFT airdrop</Button>
      <Button size="sm" class="gap-2 w-full" variant="secondary">NFT Checkout</Button>
    </div>

    <Button variant="text" size="sm" class="mx-auto">Try with our test credit cards</Button>
  </Card>
</template>

<style scoped></style>
