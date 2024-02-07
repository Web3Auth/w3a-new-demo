<script setup lang="ts">
import { Button, Divider, Icon } from '@toruslabs/vue-components'

withDefaults(
  defineProps<{
    heading: string
    btnLabel: string
    showBtn?: boolean
  }>(),
  {
    heading: 'Welcome, You’ve logged in!',
    btnLabel: 'See how we scale for you',
    showBtn: true
  }
)
const emits = defineEmits(['onClick'])
</script>

<template>
  <div class="mb-6 sm:mb-10">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg sm:text-2xl text-app-gray-800 font-medium">{{ heading }}</h1>
      <div class="hidden md:flex">
        <Button
          v-if="showBtn"
          variant="secondary"
          size="sm"
          @on-click="emits('onClick')"
          class="items-center gap-2 !border-app-gray-300 text-sm font-medium !text-app-gray-800"
        >
          {{ btnLabel }} <Icon name="arrow-right-icon" />
        </Button>
      </div>
    </div>
    <Divider class="mx-0" />
  </div>
</template>

<style scoped></style>
