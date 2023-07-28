<template>
  <div>
    <CardHeading
      heading="Experience MPC Multi Factor Auth"
      btn-label="Learn how progressive MFA works"
      @on-click="handleHeadingBtnClick"
    />
    <div>
      <h1 class="text-2xl text-gray-800 font-semibold mt-8">Here’s a summary of what you set up</h1>

      <div class="mt-8">
        <div class="flex items-center gap-4">
          <div
            class="w-6 h-6 flex items-center justify-center bg-blue-50 text-base font-medium rounded-full"
          >
            1
          </div>
          <p class="text-base text-gray-900 font-normal">Your key is split into shares</p>
        </div>
        <div class="w-[1px] h-5 bg-gray-300 ml-3 my-1" />
        <div class="flex items-center gap-4">
          <div
            class="w-6 h-6 flex items-center justify-center bg-blue-50 text-base font-medium rounded-full"
          >
            2
          </div>
          <p class="text-base text-gray-900 font-normal">
            Each key share is paired and stored with an authentication factor
          </p>
        </div>
        <div class="w-[1px] h-5 bg-gray-300 ml-3 my-1" />
        <div class="flex items-center gap-4">
          <div
            class="w-6 h-6 flex items-center justify-center bg-blue-50 text-base font-medium rounded-full"
          >
            3
          </div>
          <p class="text-base text-gray-900 font-normal">
            You need to verify at least 2 of these authentication factors to access your key
          </p>
        </div>
      </div>

      <h1 class="text-2xl text-gray-800 font-semibold mt-8">Your Authentication Factors</h1>

      <div class="flex items-stretch justify-between gap-6 w-full pt-8">
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-[227px]">
          <img src="@/assets/images/op-1.svg" class="h-16 w-16" />
          <h4 class="leading-tight text-gray-900 text-lg font-semibold mt-5 text-center">
            Paired with your social login
          </h4>
          <p
            class="border border-gray-50 bg-gray-100 text-gray-500 text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8"
          >
            <Icon name="google-icon" /> janedoe12321@gmail.com
          </p>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-[227px]">
          <img src="@/assets/images/op-2.svg" class="h-16 w-16" />
          <h4 class="leading-tight text-gray-900 text-lg font-semibold mt-5 text-center">
            Saved in your device storage
          </h4>
          <p
            class="border border-gray-50 bg-gray-100 text-gray-500 text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8"
          >
            Chrome 103.0.0.0 (macOS)
          </p>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-[227px]">
          <img src="@/assets/images/op-3.svg" class="h-16 w-16" />
          <h4 class="leading-tight text-gray-900 text-lg font-semibold mt-5 text-center">
            Saved a social recovery factor
          </h4>
          <p
            class="border border-gray-50 bg-gray-100 text-gray-500 text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8"
          >
            <Icon name="twitter-icon" />
            janedoe12321@gmail.com
          </p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, Icon } from '@toruslabs/vue-components'
import CardHeading from '../CardHeading'

const handleHeadingBtnClick = () => {
  console.log('called btn label')
}
</script>

<style scoped></style>
