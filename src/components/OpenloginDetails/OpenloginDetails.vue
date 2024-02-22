<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import Bowser from 'bowser'

import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Divider } from '@toruslabs/vue-components/Divider'
import { Icon } from '@toruslabs/vue-components/Icon'
import { WALLET_ADAPTERS } from '@web3auth/base'

import CardHeading from '../CardHeading'
import { getBrowserName, getBrowserVersion } from '@/utils/common'
import { useWeb3authStore } from '@/store/web3authStore'
import type { OpenloginAdapter, OpenloginSessionData } from '@web3auth/openlogin-adapter'

const web3Auth = useWeb3authStore()
const FACTOR_MAP: Record<string, { title: string; icon?: string }> = {
  device: { title: 'Saved in your device storage', icon: 'globe-alt-solid-icon' },
  seedPhrase: { title: 'Saved as recovery phrase', icon: 'key-solid-icon' },
  social: { title: 'Saved as a social recovery factor', icon: 'key-solid-icon' },
  password: { title: 'Saved as a password', icon: 'key-solid-icon' }
}

const browserName = ref<string>('')
const browserVersion = ref<string>('')
const userInfo = computed(() => web3Auth.userInfo)
const isMfaEnabled = computed(() => web3Auth.userInfo?.isMfaEnabled)
const shareDetails = computed(() => {
  const adapter = web3Auth.web3Auth?.walletAdapters[WALLET_ADAPTERS.OPENLOGIN] as OpenloginAdapter
  const { shareDetails } = adapter.openloginInstance?.state as OpenloginSessionData & {
    shareDetails: { shareType: string; details: string }[]
  }
  if (!shareDetails) return []

  // Format shareDetails
  return shareDetails.map((share) => {
    let details = share.details
    if (share.shareType === 'device') {
      const browser = Bowser.getParser(share.details)
      const browserDetails = browser.getBrowser()

      details = `${browserDetails.name} ${browserDetails.version}`
    }
    return {
      title: FACTOR_MAP[share.shareType].title,
      details,
      icon: FACTOR_MAP[share.shareType].icon
    }
  })
})

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
      <div>
        <h1 class="text-xl md:text-2xl text-app-gray-800 font-semibold mb-7">
          {{ isMfaEnabled ? 'Here’s a summary of what you set up' : 'What you will set up' }}
        </h1>

        <div class="ml-2 text-base">
          <div class="flex items-center">
            <div
              class="mr-5 flex-shrink-0 flex items-center justify-center bg-app-primary-50 rounded-full w-6 h-6 font-medium"
            >
              1
            </div>
            <div>Your key is split into shares</div>
          </div>
          <div class="border-r border-app-gray-300 h-5 w-[13px] my-2"></div>
          <div class="flex items-center">
            <div
              class="mr-5 flex-shrink-0 flex items-center justify-center bg-app-primary-50 rounded-full w-6 h-6 font-medium"
            >
              2
            </div>
            <div>Each key share is paired and stored with an authentication factor</div>
          </div>
          <div class="border-r border-app-gray-300 h-5 w-[13px] my-2"></div>
          <div class="flex items-center">
            <div
              class="mr-5 flex-shrink-0 flex items-center justify-center bg-app-primary-50 rounded-full w-6 h-6 font-medium"
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
          class="items-center gap-2 !border-app-gray-300 text-sm font-medium !text-app-gray-800 flex md:!hidden mt-6"
          block
          @on-click="handleHeadingBtnClick"
        >
          Learn how progressive MFA works <Icon name="arrow-right-icon" />
        </Button>
      </div>

      <Divider class="mt-6 mb-4 mx-0" />

      <h1
        v-if="isMfaEnabled"
        class="text-xl md:text-2xl text-app-gray-800 font-semibold mt-8 pt-6 md:pt-0"
      >
        Your Authentication Factors
      </h1>

      <div
        v-if="isMfaEnabled"
        class="flex flex-col md:grid grid-cols-3 items-center md:items-stretch justify-between gap-6 w-full pt-8"
      >
        <Card
          class="flex flex-col flex-1 p-6 !rounded-2xl !shadow-none items-center w-full max-w-[240px] mx-auto"
        >
          <img src="@/assets/images/op-1.svg" class="h-16 w-16" />
          <h4
            class="leading-tight text-app-gray-900 text-base lg:text-lg font-semibold mt-5 text-center"
          >
            Paired with your social login
          </h4>
          <div
            class="border border-app-gray-50 bg-app-gray-100 text-app-gray-500 text-xs xl:text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8 w-full"
          >
            <Icon
              v-if="['email_passwordless', 'jwt'].includes(userInfo?.typeOfLogin || '')"
              name="mail-icon"
            />
            <Icon v-else :name="`${userInfo?.typeOfLogin}-icon`" />
            <p class="w-full truncate">{{ userInfo?.email || userInfo?.name }}</p>
          </div>
        </Card>
        <Card
          v-for="shareDetail in shareDetails"
          :key="shareDetail.title"
          class="flex flex-col flex-1 p-6 !rounded-2xl !shadow-none items-center w-full max-w-[240px] mx-auto"
        >
          <img src="@/assets/images/op-2.svg" class="h-16 w-16" />
          <h4
            class="leading-tight text-app-gray-900 text-base lg:text-lg font-semibold mt-5 text-center"
          >
            {{ shareDetail.title }}
          </h4>
          <div
            class="border border-app-gray-50 bg-app-gray-100 text-app-gray-500 text-xs xl:text-sm font-normal rounded-xl flex items-center gap-2 py-2 px-4 mt-8 w-full"
          >
            <Icon v-if="shareDetail.icon" :name="shareDetail.icon" />
            <p class="w-full truncate">{{ shareDetail.details }}</p>
          </div>
        </Card>
      </div>
      <div v-else>
        <Icon name="lock-closed-solid-icon" size="28" class="text-app-gray-400 mb-4" />
        <h2 class="text-xl text-app-gray-800 font-semibold mb-2">
          Experience what it's like to configure MFA.
        </h2>
        <div class="text-app-gray-500 mb-4">
          Configuring MFA is quick and easy, and it provides invaluable protection for your account.
        </div>
        <Button
          variant="secondary"
          size="xs"
          :class="[
            'flex items-center gap-2 !border-app-gray-300 !text-xs font-medium !text-app-gray-800 !w-full sm:!w-fit'
          ]"
          @on-click="enableMfa"
          id="w3a-set-up-mfa"
          >Set up MFA
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
