<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Button } from '@toruslabs/vue-components/Button'
import { Badge } from '@toruslabs/vue-components/Badge'
import { Icon } from '@toruslabs/vue-components/Icon'
import { onMounted, ref, watch } from 'vue'
import { WALLET_ADAPTERS } from '@web3auth/base'
import { AuthAdapter, AuthSessionData } from '@web3auth/auth-adapter'
import Bowser from 'bowser'
import Divider from '../Divider'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'

const FACTOR_MAP: Record<string, { title: string; icon?: string }> = {
  device: { title: 'Device', icon: 'mobile-icon' },
  seedPhrase: { title: 'Recovery Phrase', icon: 'key-solid-icon' },
  social: { title: 'Social Recovery Factor', icon: 'key-solid-icon' },
  password: { title: 'Password', icon: 'lock-closed-icon' },
  authenticator: { title: 'Authenticator', icon: 'shield-check-icon' },
  passkey: { title: 'Passkey', icon: 'finger-print-icon' }
}

type MFASharesType = { title: string; icon?: string; details: string }

const { userInfo, web3Auth, isMFAEnabled, enableMFA } = useWeb3Auth()

const isDisabled = ref(web3Auth.value?.connectedAdapterName !== WALLET_ADAPTERS.AUTH)

const mfaShares = ref<MFASharesType[]>([])

const SortMFAShares = (arr: { shareType: string; details: string }[]) => {
  return arr.sort((a, b) => {
    const hasNonEmptyDetailsA = a.details && a.details.trim() !== ''
    const hasNonEmptyDetailsB = b.details && b.details.trim() !== ''

    if (hasNonEmptyDetailsA && !hasNonEmptyDetailsB) return -1
    if (!hasNonEmptyDetailsA && hasNonEmptyDetailsB) return 1
    return 0
  })
}

const shareDetailsList = () => {
  if (!web3Auth.value) return []
  const adapter = web3Auth.value?.walletAdapters[WALLET_ADAPTERS.AUTH] as AuthAdapter
  const { shareDetails } = adapter.authInstance?.state as AuthSessionData & {
    shareDetails: { shareType: string; details: string }[]
  }

  if (!shareDetails) return []

  // Format shareDetails
  const sortedList = SortMFAShares(shareDetails)
  return sortedList.map((share) => {
    let details = share.details
    if (share.shareType === 'device') {
      const browser = Bowser.getParser(share.details)
      const browserDetails = browser.getBrowser()
      details = `${browserDetails.name} ${browserDetails.version} (${browser.getOSName()})`
    }
    return {
      title: FACTOR_MAP[share.shareType]?.title,
      details,
      icon: FACTOR_MAP[share.shareType]?.icon
    }
  })
}

const addMfa = async () => {
  enableMFA()
}

onMounted(() => {
  mfaShares.value = shareDetailsList()
})

watch(
  () => isMFAEnabled.value,
  () => {
    mfaShares.value = shareDetailsList()
  }
)
</script>

<template>
  <Card
    class="px-8 py-6 w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <h3 class="font-semibold text-app-gray-900 dark:text-app-white">MFA</h3>
        <Badge :variant="isMFAEnabled ? 'success' : 'default'">{{
          isMFAEnabled ? 'Enabled' : 'Disabled'
        }}</Badge>
      </div>

      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        Add an additional security layer to your wallets. While enabled, you will need to verify
        another factor when logging in.
      </p>
    </div>

    <Button
      v-if="!isMFAEnabled"
      size="sm"
      class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white disabled:!text-app-gray-400"
      :disabled="isDisabled"
      variant="secondary"
      @on-click="addMfa"
      >Add MFA</Button
    >

    <Divider v-if="!isDisabled" />

    <div v-if="!isDisabled" class="divide-y divide-app-gray-200 dark:divide-app-gray-500">
      <div class="flex items-center py-4">
        <div class="mr-2">
          <Icon
            v-if="['email_passwordless', 'jwt'].includes(userInfo?.typeOfLogin || '')"
            class="text-app-gray-900 dark:text-app-white w-5 h-5"
            name="mail-icon"
          />
          <img
            v-else
            class="w-5 h-5"
            :src="`https://images.web3auth.io/login-${userInfo?.typeOfLogin}-active.svg`"
            :alt="`${userInfo?.typeOfLogin} icon`"
          />
        </div>
        <div>
          <h4
            class="text-sm font-semibold text-app-gray-900 dark:text-app-white first-letter:capitalize"
          >
            {{ userInfo?.typeOfLogin?.replace('_', ' ') }}
          </h4>
          <p class="text-xs text-app-gray-400">{{ userInfo?.verifierId }}</p>
        </div>
      </div>
      <div v-for="shareDetail in mfaShares" :key="shareDetail.title" class="flex items-center py-4">
        <div class="mr-2">
          <Icon
            :name="shareDetail.icon || 'key-icon'"
            class="text-app-gray-900 dark:text-app-white w-5 h-5"
          />
        </div>
        <div>
          <h4 class="text-sm font-semibold text-app-gray-900 dark:text-app-white">
            {{ shareDetail.title }}
          </h4>
          <p v-if="shareDetail.details" class="text-xs text-app-gray-400">
            {{ shareDetail.details }}
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
