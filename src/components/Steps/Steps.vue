<template>
  <div class="w-full xl:w-[480px] overflow-auto">
    <p class="text-xl font-bold mb-5">Next Steps</p>
    <div class="flex flex-col gap-8"><StepsButton v-for="(item, idx) in StepItems" :key="idx" :item="item" /></div>
  </div>
</template>

<script setup lang="ts">
import { STEP_DETAILS } from '@/constants/common'
import StepsButton from './StepsButton.vue'

const StepItems = STEP_DETAILS
</script>

<style scoped></style>
