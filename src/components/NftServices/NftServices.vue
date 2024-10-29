<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Link } from '@toruslabs/vue-components/Link'
import { IProvider } from '@web3auth/base'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import { computed, onMounted, ref } from 'vue'

import config from '@/config'
import { getAccounts } from '@/services/ethHandlers'

const { provider } = useWeb3Auth()

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

const receiverAddress = ref<string | undefined>('')
onMounted(async () => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin === config.nftCheckoutHost && event.data === 'close-nft-checkout') {
      showNftMinting.value = false
      showNftPurchase.value = false
    }
  })
  const address = await getAccounts(provider.value as IProvider)
  receiverAddress.value = address
})

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
  <Card
    class="px-8 py-6 w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4 text-center">
      <h3 class="font-semibold text-app-gray-900 dark:text-app-white mb-1">NFT Services</h3>
      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        Let your users to claim or buy NFT in seconds
      </p>
    </div>

    <img
      alt="nft sample image"
      src="@/assets/images/nft-sample.svg"
      class="w-full max-w-xs mx-auto h-auto mb-6"
    />

    <div class="space-y-2 mb-4">
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @on-click="openNftMinting"
        >Mint free NFT airdrop</Button
      >
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @on-click="openNftPurchase"
        >NFT Checkout</Button
      >
    </div>

    <div class="text-center">
      <Link
        class="text-sm dark:text-app-primary-500"
        href="https://docs.stripe.com/testing#cards"
        target="_blank"
        rel="noopener noreferrer"
        >Try with our test credit cards</Link
      >
    </div>
  </Card>
  <iframe
    v-if="showNftMinting"
    id="nftCheckoutIFrame"
    title="nftCheckoutIFrame"
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
    title="nftCheckoutIFrame"
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

<style scoped></style>
