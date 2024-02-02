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

const copyWriting = computed(() => {
  return isMfaEnabled.value
    ? {
        title: 'Here’s a summary of what you set up',
        details: [
          {
            index: 1,
            text: 'Your key is split into shares'
          },
          {
            index: 2,
            text: 'Each key share is paired and stored with an authentication factor'
          },
          {
            index: 3,
            text: 'You need to verify at least 2 of these authentication factors to access your key'
          }
        ]
      }
    : {
        title: 'Here’s a summary of what you will set up',
        details: [
          {
            index: 1,
            text: 'Your key will splitted into shares'
          },
          {
            index: 2,
            text: 'Each key share will be paired and stored with an authentication factor'
          },
          {
            index: 3,
            text: 'You need to verify at least 2 of these authentication factors to access your key'
          }
        ]
      }
})
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
        {{ copyWriting.title }}
      </h1>

      <div class="mt-8 space-y-5">
        <div class="ml-2" v-for="details in copyWriting.details" :key="details.index">
          <span class="mr-5 font-medium">{{ details.index }}</span
          ><span>{{ details.text }}</span>
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
      <div class="mt-8" v-else>
        <Button
          variant="secondary"
          size="xs"
          :class="[
            'flex items-center gap-2 !border-gray-300 !text-xs font-medium !text-gray-800 !w-fit'
          ]"
          @on-click="enableMfa"
          >Enable MFA <Icon name="arrow-right-icon" />
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
