<template>
  <div>
    <CardHeading
      heading="Customizable Wallet UI built for you"
      btn-label="How customization works"
      @on-click="handleHeadingBtnClick"
    />
    <div class="py-8 border-b border-gray-300">
      <img src="@/assets/images/waas-banner.svg" class="w-full mb-4" />
      <p class="text-lg font-normal mb-6">
        With Web3Auth’s customisable Wallet UI, smoothly integrated branding that fits your use-case
        by getting all these:
      </p>
      <ul class="text-base font-normal list-disc ml-8">
        <li>UI screens for displays/tokens</li>
        <li>Basic whitelabel-able transaction screens</li>
        <li>Customizable to your brand</li>
      </ul>
    </div>
    <div class="flex items-center justify-between gap-6 w-full pt-8">
      <div class="flex flex-col flex-1 pr-6 border-r border-gray-200">
        <Icon name="color-swatch-solid-icon" class="!w-8 !h-8 text-gray-400" />
        <h4 class="text-xl text-gray-900 font-semibold mt-4">Experience UI</h4>
        <p class="text-sm font-normal text-gray-500 mb-4">
          Preview what your applications will look like with our whitelabel solution
        </p>
        <Button
          variant="secondary"
          size="xs"
          class="flex items-center gap-2 !border-gray-300 !text-xs font-medium !text-gray-800 !w-fit"
        >
          Open UI
        </Button>
      </div>
      <div class="flex flex-col flex-1 pr-6">
        <Icon name="shield-exclamation-solid-icon" class="!w-8 !h-8 text-gray-400" />
        <h4 class="text-xl text-gray-900 font-semibold mt-4">Sign Personal Message</h4>
        <p class="text-sm font-normal text-gray-500 mb-4">
          Secure, fast transaction signing‍ on any platform.
        </p>
        <Button
          variant="secondary"
          size="xs"
          class="flex items-center gap-2 !border-gray-300 !text-xs font-medium !text-gray-800 !w-fit"
        >
          Open UI
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon, Button } from '@toruslabs/vue-components'
import CardHeading from '../CardHeading'

const handleHeadingBtnClick = () => {
  console.log('called btn label')
}
</script>

<style scoped></style>
