<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Link } from '@toruslabs/vue-components/Link'
import { IProvider } from '@web3auth/base'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import { NFTCheckoutEmbed } from '@web3auth/nft-checkout-plugin'
import { useI18n } from 'petite-vue-i18n'
import { onMounted, ref } from 'vue'

import { getAccounts } from '@/services/ethHandlers'

const { provider } = useWeb3Auth()

const FREE_MINT_CONTRACT_ID = 'b5b4de3f-0212-11ef-a08f-0242ac190003'
const PAID_MINT_CONTRACT_ID = 'd1145a8b-98ae-44e0-ab63-2c9c8371caff'
const NFT_CHECKOUT_CLIENT_ID =
  'BHgArYmWwSeq21czpcarYh0EVq2WWOzflX-NTK-tY1-1pauPzHKRRLgpABkmYiIV_og9jAvoIxQ8L3Smrwe04Lw'

const { t } = useI18n()

const nftCheckoutEmbed = new NFTCheckoutEmbed({ clientId: NFT_CHECKOUT_CLIENT_ID })
nftCheckoutEmbed.init()

const receiverAddress = ref<string | undefined>('')
onMounted(async () => {
  const address = await getAccounts(provider.value as IProvider)
  receiverAddress.value = address
})

const openNftMinting = () => {
  nftCheckoutEmbed.show({
    contractId: FREE_MINT_CONTRACT_ID,
    receiverAddress: receiverAddress.value
  })
}

const openNftPurchase = () => {
  nftCheckoutEmbed.show({
    contractId: PAID_MINT_CONTRACT_ID,
    receiverAddress: receiverAddress.value
  })
}
</script>
<template>
  <Card
    class="px-8 py-6 w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4 text-center">
      <h3 class="font-semibold text-app-gray-900 dark:text-app-white mb-1">
        {{ t('dashboard.nft-services') }}
      </h3>
      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        {{ t('dashboard.nft-services-subtext') }}
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
        >{{ t('dashboard.mint-nft-airdrop') }}</Button
      >
      <Button
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
        variant="secondary"
        @on-click="openNftPurchase"
        >{{ t('dashboard.nft-checkout') }}</Button
      >
    </div>

    <div class="text-center">
      <Link
        class="text-sm dark:text-app-primary-500"
        href="https://docs.stripe.com/testing#cards"
        target="_blank"
        rel="noopener noreferrer"
        >{{ t('dashboard.test-credit-card') }}</Link
      >
    </div>
  </Card>
</template>

<style scoped></style>
