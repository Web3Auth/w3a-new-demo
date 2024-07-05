<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Button } from '@toruslabs/vue-components/Button'
</script>
<template>
  <Card class="px-8 py-6 w-full !rounded-2xl">
    <div class="mb-4">
      <h3 class="font-semibold text-app-gray-900 dark:text-app-white mb-1">Experience Web3Auth, first hand</h3>
      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        Browse our full suite of features for your dApp with our docs. Access codes examples for
        these features by visiting our playground.
      </p>
    </div>

    <Button
      href="https://web3auth.io/docs"
      size="sm"
      class="gap-2 w-full"
      variant="secondary"
      target="_blank"
      rel="noopener noreferrer"
      >Read our docs</Button
    >
  </Card>
</template>

<style scoped></style>
