<template>
  <button
    :class="[
      'appearance-none cursor-pointer text-left w-full flex items-center rounded-2xl border border-gray-300 p-6 bg-white',
      { 'border-indigo-600': isSelected }
    ]"
    @click="emits('onClick')"
  >
    <img :src="getStepLogo()" />
    <div class="ml-10">
      <p class="text-lg font-bold text-gray-900">{{ item.heading1 }}</p>
      <p class="text-lg font-bold text-gray-900 -mt-1">{{ item.heading2 }}</p>
      <p class="text-xs font-normal text-gray-600 mt-2">{{ item.subHeading }}</p>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    item: { img: string; heading1: string; heading2: string; subHeading: string }
    isSelected: boolean
  }>(),
  {}
)
const emits = defineEmits(['onClick'])

const getStepLogo = () => {
  return new URL(`../../assets/images/${props.item.img}.svg`, import.meta.url).href
}
</script>

<style scoped></style>
