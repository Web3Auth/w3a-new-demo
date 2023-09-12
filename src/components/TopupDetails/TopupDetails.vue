<template>
  <div>
    <CardHeading
      heading="Onramp Users with Credit Card"
      btn-label="How onramp works"
      @on-click="handleHeadingBtnClick"
    />
    <div>
      <h1 class="text-xl sm:text-2xl text-gray-800 font-semibold text-mt-height text-center">
        Over 100+ Onramps aggregated for user conversion
      </h1>
      <div
        class="flex flex-col md:flex-row items-stretch justify-between gap-6 w-full text-py-height border-b border-gray-300"
      >
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl">
          <img src="@/assets/images/topup-1.svg" class="h-12 w-12" />
          <h4 class="leading-tight text-gray-900 text-lg font-semibold mt-5">
            Global coverage with local payment providers that work
          </h4>
          <p class="text-sm text-gray-800 font-normal mt-2">
            Suit your market and reduce bounce rates by leveraging on local providers for up to 100+
            countries that works.
          </p>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl">
          <img src="@/assets/images/topup-2.svg" class="h-12 w-12" />
          <h4 class="leading-tight text-gray-900 text-lg font-semibold mt-5">
            Use Credit card or your digital payment standard
          </h4>
          <p class="text-sm text-gray-800 font-normal mt-2">
            Multiple payment methods will ensure sufficient backup for your end-users e.g. Apple
            Pay, Google Pay
          </p>
        </Card>
        <Card class="flex flex-col flex-1 p-6 !rounded-2xl">
          <img src="@/assets/images/topup-3.svg" class="h-12 w-12" />
          <h4 class="leading-tight text-gray-900 text-lg font-semibold mt-5">
            Design to fit right in your application
          </h4>
          <p class="text-sm text-gray-800 font-normal mt-2">
            Simple to add it on with your key management provider. Ease your users with first step
            wallet onboarding, second step checkout!
          </p>
        </Card>

        <Button
          variant="secondary"
          size="sm"
          class="items-center gap-2 !border-gray-300 text-sm font-medium !text-gray-800 flex md:!hidden"
          block
        >
          How onramps works <Icon name="arrow-right-icon" />
        </Button>
      </div>

      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full text-pt-height"
      >
        <div class="flex flex-col flex-1 pr-6 sm:border-r border-gray-200">
          <Icon name="plus-circle-solid-icon" class="!w-8 !h-8 text-gray-400" />
          <h4 class="text-xl text-gray-900 font-semibold mt-4">Experience Onramp</h4>
          <p class="text-sm font-normal text-gray-500 mb-4">
            Preview what onramp would feel like for your application or wallet
          </p>
          <Button
            variant="secondary"
            size="xs"
            class="flex items-center gap-2 !border-gray-300 !text-xs font-medium !text-gray-800 !w-fit"
            @on-click="emits('initiateTopUpPlugin')"
          >
            Open UI
          </Button>
        </div>
        <!-- <div class="flex mt-4 sm:mt-0 flex-col flex-1 sm:pr-6">
          <Icon name="minus-circle-solid-icon" class="!w-8 !h-8 text-gray-400" />
          <h4 class="text-xl text-gray-900 font-semibold mt-4">Experience Offramp</h4>
          <p class="text-sm font-normal text-gray-500 mb-4">
            Preview what offramp would feel like for your application or wallet
          </p>
          <Button
            variant="secondary"
            size="xs"
            class="flex items-center gap-2 !border-gray-300 !text-xs font-medium !text-gray-800 !w-fit"
          >
            Open UI
          </Button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, Icon, Button } from '@toruslabs/vue-components'
import CardHeading from '../CardHeading'

const handleHeadingBtnClick = () => {
  console.log('called btn label')
}

const emits = defineEmits(['initiateTopUpPlugin'])
</script>

<style scoped>
.text-mt-height {
  margin-top: 24px;
  @media (min-height: 900px) {
    margin-top: 32px;
  }
}

.text-py-height {
  padding: 24px 0px;
  @media (min-height: 900px) {
    padding: 32px 0px;
  }
}

.text-pt-height {
  padding-top: 24px;
  @media (min-height: 900px) {
    padding-top: 32px;
  }
}
</style>
