<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import { Button } from '@toruslabs/vue-components/Button'
import CardHeading from '../CardHeading'
import { useWeb3authStore } from '@/store/web3authStore'

const web3Auth = useWeb3authStore()

const handleHeadingBtnClick = () => {
  window.open('https://web3auth.io/docs/pnp/features/interoperability', '_blank')
}

const openWalletConnect = () => {
  web3Auth.initiateWalletConnect()
}
</script>

<template>
  <div>
    <CardHeading
      heading="Connect your wallet to OpenSea"
      btn-label="How interoperability works"
      @on-click="handleHeadingBtnClick"
    />
    <div>
      <h1 class="text-xl sm:text-2xl text-app-gray-800 font-semibold mt-8 text-center">
        Intuitive and seamless connections to Web3 apps
      </h1>
      <div
        class="flex flex-col md:flex-row items-stretch justify-between gap-6 w-full py-8 border-b border-app-gray-300"
      >
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl !shadow-none">
          <img src="@/assets/images/wc-1.svg" class="h-12 w-12" />
          <h4 class="leading-tight text-app-gray-900 text-lg font-semibold mt-5">
            Helpful guides for mainstreams users
          </h4>
          <p class="text-sm text-app-gray-800 font-normal mt-2">
            Easily onboard mainstream users onto your application with in-built guides.
          </p>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl !shadow-none">
          <img src="@/assets/images/wc-2.svg" class="h-12 w-12" />
          <h4 class="leading-tight text-app-gray-900 text-lg font-semibold mt-5">
            Use the WalletConnect standard
          </h4>
          <p class="text-sm text-app-gray-800 font-normal mt-2">
            Connect your wallet with thousands of applications on multiple chains.
          </p>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl !shadow-none">
          <img src="@/assets/images/wc-3.svg" class="h-12 w-12" />
          <h4 class="leading-tight text-app-gray-900 text-lg font-semibold mt-5">
            Or embed your own wallet as an SDK
          </h4>
          <p class="text-sm text-app-gray-800 font-normal mt-2">
            Own an SDK that embeds your wallet in a seamless integrated flow.
          </p>
        </Card>
        <Button
          variant="secondary"
          size="sm"
          class="items-center gap-2 !border-app-gray-300 text-sm font-medium !text-app-gray-800 flex md:!hidden"
          block
          @on-click="handleHeadingBtnClick"
        >
          How interoperability works <Icon name="arrow-right-icon" />
        </Button>
      </div>

      <div class="flex items-center justify-between gap-6 w-full">
        <div class="flex flex-col flex-1 pl-0 p-6">
          <Icon name="paper-airplane-solid-icon" class="!w-8 !h-8 text-app-gray-400" />
          <h4 class="text-xl text-app-gray-900 font-semibold mt-4">
            Experience Connecting with OpenSea
          </h4>
          <p class="text-sm font-normal text-app-gray-500 mb-4">
            Preview what onramp would feel like for your application or wallet
          </p>
          <Button
            variant="secondary"
            size="xs"
            class="flex items-center gap-2 !border-app-gray-300 !text-xs font-medium !text-app-gray-800 !w-fit"
            @on-click="openWalletConnect"
            id="w3a-open-wallet-connect-ui"
          >
            Open UI
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
