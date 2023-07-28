<template>
  <div
    class="w-[480px] bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center gap-8 h-auto overflow-auto"
  >
    <p class="text-xl font-bold flex self-start -mb-4">Next Steps</p>
    <StepsButton
      v-for="(item, idx) in StepItems"
      :key="idx"
      :item="item"
      @on-click="handleStepsClick(idx)"
      :is-selected="stepIdx === idx"
    />
  </div>
</template>

<script setup lang="ts">
import { STEP_DETAILS } from '@/constants/common'
import StepsButton from './StepsButton.vue'
import { ref } from 'vue'

const StepItems = STEP_DETAILS

const stepIdx = ref(-1)

const handleStepsClick = (idx: number) => {
  stepIdx.value = idx
  emits('onStepsClick', idx)
}

const emits = defineEmits(['onStepsClick'])
</script>

<style scoped></style>
