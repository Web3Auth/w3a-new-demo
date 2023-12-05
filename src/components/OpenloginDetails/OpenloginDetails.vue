<template>
  <div>
    <CardHeading
      heading="Experience MPC Multi Factor Auth"
      btn-label="Learn how progressive MFA works"
      @on-click="handleHeadingBtnClick"
    />
    <div>
      <h1 class="text-xl md:text-2xl text-gray-800 font-semibold container-height">
        Here’s a summary of what you set up
      </h1>

      <div class="mt-8">
        <div class="flex items-center gap-4">
          <div
            class="w-6 h-6 flex items-center justify-center bg-blue-50 text-base font-medium rounded-full p-1"
          >
            1
          </div>
          <p class="text-base text-gray-900 font-normal">Your key is split into shares</p>
        </div>
        <div class="w-[1px] h-5 bg-gray-300 ml-2 sm:ml-3 my-1" />
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
        <div class="w-[1px] h-8 sm:h-5 bg-gray-300 ml-2 sm:ml-3 sm:my-1" />
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

      <Button
        variant="secondary"
        size="sm"
        class="items-center gap-2 !border-gray-300 text-sm font-medium !text-gray-800 flex md:!hidden mt-6"
        block
      >
        Learn how progressive MFA works <Icon name="arrow-right-icon" />
      </Button>

      <h1
        class="text-xl md:text-2xl text-gray-800 font-semibold mt-8 border-t border-gray-300 md:border-t-0 pt-6 md:pt-0"
      >
        Your Authentication Factors
      </h1>

      <div
        class="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 w-full pt-8"
      >
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-full md:w-[227px]">
          <img src="@/assets/images/op-1.svg" class="h-16 w-16" />
          <h4
            class="leading-tight text-gray-900 text-base lg:text-lg font-semibold mt-5 text-center"
          >
            Paired with your social login
          </h4>
          <p
            class="border border-gray-50 bg-gray-100 text-gray-500 text-xs xl:text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8"
          >
            <Icon v-if="userInfo?.typeOfLogin === 'jwt'" name="mail-icon" class="text-gray-400" />
            <Icon :name="`${userInfo?.typeOfLogin}-icon`" class="text-gray-400" />
            {{ userInfo?.email || userInfo?.name }}
          </p>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-full md:w-[227px]">
          <img src="@/assets/images/op-2.svg" class="h-16 w-16" />
          <h4
            class="leading-tight text-gray-900 text-base lg:text-lg font-semibold mt-5 text-center"
          >
            Saved in your device storage
          </h4>
          <p
            class="border border-gray-50 bg-gray-100 text-gray-500 text-xs xl:text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8 text-center"
          >
            {{ browserName }} {{ browserVersion }}
          </p>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-full md:w-[227px]">
          <img src="@/assets/images/op-3.svg" class="h-16 w-16" />
          <h4
            class="leading-tight text-gray-900 text-base lg:text-lg font-semibold mt-5 text-center"
          >
            Can be saved as a social recovery factor
          </h4>
          <p
            class="border border-gray-50 bg-gray-100 text-gray-500 text-xs xl:text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8"
          >
            <Icon name="twitter-icon" />
            {{ userInfo?.email || userInfo?.name }}
          </p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'

import type { UserInfo } from '@web3auth/ws-embed'

import { Button, Card, Icon } from '@toruslabs/vue-components'

import CardHeading from '../CardHeading'
import { getBrowserName, getBrowserVersion } from '@/utils/common'

const browserName: any = ref(null)
const browserVersion: any = ref(null)

const userInfo = inject<Ref<UserInfo & { typeOfLogin: string }>>('userInfo')

onMounted(async () => {
  browserName.value = await getBrowserName()
  browserVersion.value = await getBrowserVersion()
})

const handleHeadingBtnClick = () => {
  window.open('https://web3auth.io/docs/pnp/features/mfa', '_blank')
}
</script>

<style scoped>
.container-height {
  margin-top: 24px;
  @media (min-height: 900px) {
    margin-top: 32px;
  }
}
</style>
