<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Link } from '@toruslabs/vue-components/Link'
import { useI18n } from 'petite-vue-i18n'

const { t } = useI18n()
</script>
<template>
  <Card
    class="w-full !rounded-2xl !border-0 px-8 py-6 !shadow-modal dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <h3 class="mb-1 font-semibold text-app-gray-900 dark:text-app-white">
        {{ t('dashboard.experience-web3auth') }}
      </h3>
      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        {{ t('dashboard.web3auth-subtext') }}
        <Link
          href="https://pnp-modal-playground.vercel.app/"
          class="text-xs dark:text-app-primary-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('dashboard.playground') }}</Link
        >.
      </p>
    </div>
    <div class="space-y-2">
      <Button
        href="https://web3auth.io/docs"
        size="sm"
        class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('dashboard.read-docs') }}</Button
      >
      <Button
        href="https://web3auth.io/customers"
        size="sm"
        class="w-full gap-2 !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('dashboard.view-integrations') }}</Button
      >
    </div>
  </Card>
</template>

<style scoped></style>
