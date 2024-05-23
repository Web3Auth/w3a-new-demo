<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import CardHeading from '../CardHeading'
import { computed, onMounted, ref } from 'vue'
import { useWeb3authStore } from '../../store/web3authStore'
import config from '@/config'

const showNftCheckout = ref(false)

const web3Auth = useWeb3authStore()

const openNFTCheckout = () => {
  showNftCheckout.value = true
}

onMounted(() => {
  window.addEventListener('message', function (event: MessageEvent) {
    if (event.origin === config.nftCheckoutHost && event.data === 'close-nft-checkout') {
      showNftCheckout.value = false
    }
  })
})

const receiverAddress = computed(() => web3Auth.accounts[0])

const demoNftCheckoutUrl = computed(
  () =>
    `${config.nftCheckoutHost}/?contract_id=d1145a8b-98ae-44e0-ab63-2c9c8371caff&receiver_address=${receiverAddress.value}`
)
</script>

<template>
  <div>
    <CardHeading heading="NFT Checkout/Airdrop" :show-btn="false" />
    <div
      class="flex flex-col md:flex-row items-stretch justify-between gap-6 w-full py-8 border-b border-app-gray-300"
    >
      <Card class="flex flex-col flex-1 p-6 !rounded-2xl !shadow-none">
        <img src="@/assets/images/nft-icon.svg" class="h-12 w-12" />
        <h4 class="leading-tight text-app-gray-900 text-lg font-semibold mt-5">
          Send NFT to users' wallet seamlessly
        </h4>
        <p class="text-sm text-app-gray-800 font-normal mt-2">
          Reduce onboarding steps to improve user experience by keeping all within wallet.
        </p>
      </Card>
      <Card class="flex flex-col flex-1 p-6 !rounded-2xl !shadow-none">
        <img src="@/assets/images/gasless-transactions-logo.svg" class="h-12 w-12" />
        <h4 class="leading-tight text-app-gray-900 text-lg font-semibold mt-5">
          Enabled gasless transaction for users
        </h4>
        <p class="text-sm text-app-gray-800 font-normal mt-2">
          Motivate your NFT buyers with zero burdens on gas fees.
        </p>
      </Card>
      <Card class="flex flex-col flex-1 p-6 !rounded-2xl !shadow-none">
        <img src="@/assets/images/topup-3.svg" class="h-12 w-12" />
        <h4 class="leading-tight text-app-gray-900 text-lg font-semibold mt-5">
          Let users choose the perfect way to pay
        </h4>
        <p class="text-sm text-app-gray-800 font-normal mt-2">
          Credit card? or Paypal? Enable your users to decide whichever best suits them.
        </p>
      </Card>
    </div>

    <div>
      <div class="flex items-center justify-between gap-6 w-full">
        <div class="flex flex-col flex-1 pl-0 p-6">
          <Icon name="rss-icon" class="!w-8 !h-8 text-app-gray-400" />
          <h4 class="text-xl text-app-gray-900 font-semibold mt-4">Experience NFT Minting</h4>
          <p class="text-sm font-normal text-app-gray-500 mb-4">
            Preview what airdrop NFT would feel like for your application or wallet
          </p>
          <Button
            variant="secondary"
            size="xs"
            class="flex items-center gap-2 !border-app-gray-300 !text-xs font-medium !text-app-gray-800 !w-fit"
            @on-click="openNFTCheckout"
            id="w3a-open-nft-checkout-ui"
          >
            Open UI
          </Button>
        </div>
      </div>
    </div>
  </div>
  <iframe
    v-if="showNftCheckout"
    id="nftCheckoutIFrame"
    :src="demoNftCheckoutUrl"
    style="
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 0;
      z-index: 99999;
    "
    allow="clipboard-write"
  />
</template>
