<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Link } from '@toruslabs/vue-components/Link'
</script>
<template>
  <Card
    class="px-8 py-6 w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <h3 class="font-semibold text-app-gray-900 dark:text-app-white mb-1">
        Experience Web3Auth, first hand
      </h3>
      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        Browse our full suite of features for your dApp with our docs. Access codes examples for
        these features by visiting our
        <Link
          href="https://pnp-modal-playground.vercel.app/"
          class="text-xs dark:text-app-primary-500"
          target="_blank"
          rel="noopener noreferrer"
          >playground</Link
        >.
      </p>
    </div>
    <div class="space-y-2">
      <Button
        href="https://web3auth.io/docs"
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        target="_blank"
        rel="noopener noreferrer"
        >Read our docs</Button
      >
      <Button
        href="https://web3auth.io/customers"
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        target="_blank"
        rel="noopener noreferrer"
        >View Live Integrations</Button
      >
    </div>
  </Card>
</template>

<style scoped></style>
