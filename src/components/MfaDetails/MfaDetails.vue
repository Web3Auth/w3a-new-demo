<script setup lang="ts">
import { Badge } from '@toruslabs/vue-components/Badge'
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import { AuthAdapter, AuthSessionData } from '@web3auth/auth-adapter'
import { WALLET_ADAPTERS } from '@web3auth/base'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import Bowser from 'bowser'
import { useI18n } from 'petite-vue-i18n'
import { computed, onMounted, ref, watch } from 'vue'

import Divider from '../Divider'

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

const isDisabled = computed(() => web3Auth.value?.connectedAdapterName !== WALLET_ADAPTERS.AUTH)

const mfaShares = ref<MFASharesType[]>([])
const { t } = useI18n()

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
    let { details } = share
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

const addMfa = () => {
  enableMFA()
}

onMounted(() => {
  mfaShares.value = shareDetailsList()
})

watch(isMFAEnabled, () => {
  mfaShares.value = shareDetailsList()
})
</script>

<template>
  <Card
    class="px-8 py-6 w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <h3 class="font-semibold text-app-gray-900 dark:text-app-white">MFA</h3>
        <Badge :variant="isMFAEnabled ? 'success' : 'default'">{{
          isMFAEnabled ? t('dashboard.enabled') : t('dashboard.disabled')
        }}</Badge>
      </div>

      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        {{ t('dashboard.mfa-subtext') }}
      </p>
    </div>

    <div class="relative group">
      <div
        v-if="isDisabled"
        class="hidden group-hover:block absolute bottom-[130%] left-1/2 -translate-x-1/2 bg-app-light-surface1 py-2 px-4 rounded-lg text-app-black text-xs text-center w-[150px] shadow-md"
      >
        {{ t('dashboard.disabled-btn-text') }}
        <div
          class="absolute border-8 border-b-0 border-r-transparent border-t-app-white border-l-transparent top-[100%] left-[calc(50%_-_8px)]"
        ></div>
      </div>
      <Button
        v-if="!isMFAEnabled"
        size="sm"
        class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white disabled:!text-app-gray-400 dark:disabled:!text-app-gray-500"
        :disabled="isDisabled"
        variant="secondary"
        @on-click="addMfa"
        >{{ t('dashboard.add-mfa') }}</Button
      >
    </div>

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
