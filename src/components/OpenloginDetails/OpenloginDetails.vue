<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'

import { Button, Card, Icon } from '@toruslabs/vue-components'

import CardHeading from '../CardHeading'
import { getBrowserName, getBrowserVersion } from '@/utils/common'
import { useWeb3authStore } from '@/store/web3authStore'

const web3Auth = useWeb3authStore()

const browserName = ref<string>('')
const browserVersion = ref<string>('')
const userInfo = computed(() => web3Auth.userInfo)
const isMfaEnabled = computed(() => web3Auth.userInfo?.isMfaEnabled)

onBeforeMount(() => {
  browserName.value = getBrowserName()
  browserVersion.value = getBrowserVersion()
})

const handleHeadingBtnClick = () => {
  window.open('https://web3auth.io/docs/pnp/features/mfa', '_blank')
}

const enableMfa = () => {
  web3Auth.enableMfa()
}
</script>

<template>
  <div>
    <CardHeading
      heading="Experience MPC Multi Factor Auth"
      btn-label="Learn how progressive MFA works"
      @on-click="handleHeadingBtnClick"
    />
    <div>
      <h1 class="text-xl md:text-2xl text-gray-800 font-semibold container-height">
        {{ isMfaEnabled ? 'Here’s a summary of what you set up' : 'What you will set up' }}
      </h1>

      <div class="mt-8 ml-2 text-base">
        <div class="flex items-center">
          <div
            class="mr-5 flex items-center justify-center bg-app-primary-50 rounded-full w-6 h-6 font-medium"
          >
            1
          </div>
          <div>Your key is split into shares</div>
        </div>
        <div class="border-r border-app-gray-300 h-5 w-[13px] my-2"></div>
        <div class="flex items-center">
          <div
            class="mr-5 flex items-center justify-center bg-app-primary-50 rounded-full w-6 h-6 font-medium"
          >
            2
          </div>
          <div>Each key share is paired and stored with an authentication factor</div>
        </div>
        <div class="border-r border-app-gray-300 h-5 w-[13px] my-2"></div>
        <div class="flex items-center">
          <div
            class="mr-5 flex items-center justify-center bg-app-primary-50 rounded-full w-6 h-6 font-medium"
          >
            3
          </div>
          <div>
            You need to verify at least 2 of these authentication factors to access your key
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        class="items-center gap-2 !border-gray-300 text-sm font-medium !text-gray-800 flex md:!hidden mt-6"
        block
        @on-click="handleHeadingBtnClick"
      >
        Learn how progressive MFA works <Icon name="arrow-right-icon" />
      </Button>

      <h1
        v-if="isMfaEnabled"
        class="text-xl md:text-2xl text-gray-800 font-semibold mt-8 border-t border-gray-300 md:border-t-0 pt-6 md:pt-0"
      >
        Your Authentication Factors
      </h1>
      <hr v-else class="my-8" />

      <div
        v-if="isMfaEnabled"
        class="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 w-full pt-8"
      >
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-full md:w-[227px]">
          <img src="@/assets/images/op-1.svg" class="h-16 w-16" />
          <h4
            class="leading-tight text-gray-900 text-base lg:text-lg font-semibold mt-5 text-center"
          >
            Paired with your social login
          </h4>
          <div
            class="border border-gray-50 bg-gray-100 text-gray-500 text-xs xl:text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8 w-full"
          >
            <Icon v-if="userInfo?.typeOfLogin === 'jwt'" name="mail-icon" class="text-gray-400" />
            <Icon v-else :name="`${userInfo?.typeOfLogin}-icon`" class="text-gray-400" />
            <p class="w-full truncate">{{ userInfo?.email || userInfo?.name }}</p>
          </div>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-full md:w-[227px]">
          <img src="@/assets/images/op-2.svg" class="h-16 w-16" />
          <h4
            class="leading-tight text-gray-900 text-base lg:text-lg font-semibold mt-5 text-center"
          >
            Saved in your device storage
          </h4>
          <div
            class="border border-gray-50 bg-gray-100 text-gray-500 text-xs xl:text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8 w-full"
          >
            <Icon name="globe-alt-solid-icon" />
            <p class="w-full truncate">{{ browserName }} {{ browserVersion }}</p>
          </div>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl items-center w-full md:w-[227px]">
          <img src="@/assets/images/op-3.svg" class="h-16 w-16" />
          <h4
            class="leading-tight text-gray-900 text-base lg:text-lg font-semibold mt-5 text-center"
          >
            Saved as a social recovery factor
          </h4>
          <div
            class="border border-gray-50 bg-gray-100 text-gray-500 text-xs xl:text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8 w-full"
          >
            <Icon name="key-solid-icon" />
            <p class="w-full truncate">{{ userInfo?.email || userInfo?.name }}</p>
          </div>
        </Card>
      </div>
      <div v-else>
        <Icon name="lock-closed-solid-icon" size="28" class="text-app-gray-400 mb-4" />
        <h2 class="text-xl text-gray-800 font-semibold mb-2">
          Experience what it's like to configure MFA.
        </h2>
        <div class="text-app-gray-500 mb-4">
          Configuring MFA is quick and easy, and it provides invaluable protection for your account.
        </div>
        <Button
          variant="secondary"
          size="xs"
          :class="[
            'flex items-center gap-2 !border-gray-300 !text-xs font-medium !text-gray-800 !w-fit'
          ]"
          @on-click="enableMfa"
          >Set up MFA
        </Button>
      </div>
    </div>
    <!-- <div v-else>
      <Button @click="enableMfa">Enable MFA</Button>
    </div> -->
  </div>
</template>

<style scoped>
.container-height {
  margin-top: 24px;
  @media (min-height: 900px) {
    margin-top: 32px;
  }
}
</style>
