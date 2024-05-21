<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
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
    <div>
      <div class="flex items-center justify-between gap-6 w-full">
        <div class="flex flex-col flex-1 pl-0 p-6">
          <h4 class="text-xl text-app-gray-900 font-semibold mt-4">Experience NFT Checkout</h4>
          <p class="text-sm font-normal text-app-gray-500 mb-4">
            Preview what NFT checkout would feel like for your application or wallet
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
