<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import CardHeading from '../CardHeading'
import { computed, onMounted, ref } from 'vue'
import { useWeb3authStore } from '../../store/web3authStore'
import config from '@/config'

const web3Auth = useWeb3authStore()

const FREE_MINT_CONTRACT_ID = 'b5b4de3f-0212-11ef-a08f-0242ac190003'
const PAID_MINT_CONTRACT_ID = 'd1145a8b-98ae-44e0-ab63-2c9c8371caff'

const showNftMinting = ref(false)
const openNftMinting = () => {
  showNftMinting.value = true
}

const showNftPurchase = ref(false)
const openNftPurchase = () => {
  showNftPurchase.value = true
}

onMounted(() => {
  window.addEventListener('message', function (event: MessageEvent) {
    if (event.origin === config.nftCheckoutHost && event.data === 'close-nft-checkout') {
      showNftMinting.value = false
      showNftPurchase.value = false
    }
  })
})

const receiverAddress = computed(() => web3Auth.accounts[0])

const demoNftMintingUrl = computed(
  () =>
    `${config.nftCheckoutHost}/?contract_id=${FREE_MINT_CONTRACT_ID}&receiver_address=${receiverAddress.value}&api_key=${config.nftCheckoutApiKey}`
)

const demoNftPurchaseUrl = computed(
  () =>
    `${config.nftCheckoutHost}/?contract_id=${PAID_MINT_CONTRACT_ID}&receiver_address=${receiverAddress.value}&api_key=${config.nftCheckoutApiKey}`
)
</script>

<template>
  <div>
    <CardHeading heading="NFT Checkout/Airdrop" :show-btn="false" />
    <img src="@/assets/images/nft-airdrop-banner.svg" class="w-full mb-4" />
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

    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-8 py-6 w-full text-pt-height"
    >
      <div class="flex flex-col flex-1 pr-6 sm:border-r border-app-gray-200">
        <Icon name="rss-icon" class="!w-8 !h-8 text-app-gray-400" />
        <h4 class="text-xl text-app-gray-900 font-semibold mt-4">Experience NFT Minting</h4>
        <p class="text-sm font-normal text-app-gray-500 mb-4">
          Preview what airdrop NFT would feel like for your application or wallet
        </p>
        <Button
          variant="secondary"
          size="xs"
          class="flex items-center gap-2 !border-app-gray-300 !text-xs font-medium !text-app-gray-800 !w-fit"
          @on-click="openNftMinting"
          id="w3a-open-nft-checkout-ui"
        >
          Open UI
        </Button>
      </div>
      <div class="flex flex-col flex-1 mt-6 sm:mt-0 sm:pr-6">
        <Icon name="shopping-cart-solid-icon" class="!w-8 !h-8 text-app-gray-400" />
        <h4 class="text-xl text-app-gray-900 font-semibold mt-4">Experience NFT Purchase</h4>
        <p class="text-sm font-normal text-app-gray-500 mb-4">
          Preview what NFT buying would feel like for your application or wallet
        </p>
        <Button
          variant="secondary"
          size="xs"
          class="flex items-center gap-2 !border-app-gray-300 !text-xs font-medium !text-app-gray-800 !w-fit"
          @on-click="openNftPurchase"
          id="w3a-open-nft-checkout-ui"
        >
          Open UI
        </Button>
      </div>
    </div>
  </div>
  <iframe
    v-if="showNftMinting"
    id="nftCheckoutIFrame"
    :src="demoNftMintingUrl"
    name="nft_minting"
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
  <iframe
    v-if="showNftPurchase"
    id="nftCheckoutIFrame"
    :src="demoNftPurchaseUrl"
    name="nft_purchase"
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
