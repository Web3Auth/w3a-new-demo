<template>
  <div class="flex">
    <div class="w-[380px] lg:w-[480px] ">
      <Steps @on-steps-click="handleSteps" />
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Steps from '@/components/Steps'

function handleSteps() {
  console.log('handleSteps')
}
</script>
