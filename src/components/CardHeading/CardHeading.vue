<template>
  <div class="flex items-center justify-between pb-6 border-b border-b-gray-300">
    <h1 class="text-lg sm:text-2xl text-gray-800 font-medium">{{ heading }}</h1>
    <div class="hidden md:flex">
      <Button
        v-if="showBtn"
        variant="secondary"
        size="sm"
        @on-click="emits('onClick')"
        class="items-center gap-2 !border-gray-300 text-sm font-medium !text-gray-800"
      >
        {{ btnLabel }} <Icon name="arrow-right-icon" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, Icon } from '@toruslabs/vue-components'

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

<style scoped></style>
