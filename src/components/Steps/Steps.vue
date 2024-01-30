<template>
  <div
    class="w-[380px] lg:w-[480px] bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center container-height h-auto overflow-auto"
  >
    <p class="text-xl font-bold flex self-start">Next Steps</p>
    <StepsButton v-for="(item, idx) in StepItems" :key="idx" :item="item" />
  </div>
</template>

<script setup lang="ts">
import { STEP_DETAILS } from '@/constants/common'
import StepsButton from './StepsButton.vue'

const StepItems = STEP_DETAILS
</script>

<style scoped>
.container-height {
  gap: 1.5rem;
  @media (min-height: 900px) {
    gap: 2rem;
  }
}
</style>
