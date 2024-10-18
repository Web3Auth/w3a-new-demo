<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Button } from '@toruslabs/vue-components/Button'
import { Badge } from '@toruslabs/vue-components/Badge'
import { Icon } from '@toruslabs/vue-components/Icon'
import { computed } from 'vue'
import { WALLET_ADAPTERS } from '@web3auth/base'
import { AuthAdapter, AuthSessionData } from '@web3auth/auth-adapter'
import Bowser from 'bowser'
import Divider from '../Divider'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'

const FACTOR_MAP: Record<string, { title: string; icon?: string }> = {
  device: { title: 'Device', icon: 'mobile-icon' },
  seedPhrase: { title: 'Recovery Phrase', icon: 'key-solid-icon' },
  social: { title: 'Social Recovery Factor', icon: 'key-solid-icon' },
  password: { title: 'Password', icon: 'key-solid-icon' },
  authenticator: { title: 'Authenticator', icon: 'key-solid-icon' }
}

const { userInfo, web3Auth } = useWeb3Auth()

const shareDetails = computed(() => {
  const adapter = web3Auth.value?.walletAdapters[WALLET_ADAPTERS.AUTH] as AuthAdapter

  const { shareDetails } = adapter.authInstance?.state as AuthSessionData & {
    shareDetails: { shareType: string; details: string }[]
  }

  if (!shareDetails) return []

  // Format shareDetails
  return shareDetails
    .filter((share) => share.details)
    .map((share) => {
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
})

const addMfa = () => {
  if (web3Auth.value) {
    web3Auth.value.enableMFA()
  }
}
</script>
<template>
  <Card
    class="px-8 py-6 w-full !rounded-2xl !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
  >
    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <h3 class="font-semibold text-app-gray-900 dark:text-app-white">MFA</h3>
        <Badge :variant="userInfo?.isMfaEnabled ? 'success' : 'default'">{{
          userInfo?.isMfaEnabled ? 'Enabled' : 'Disabled'
        }}</Badge>
      </div>

      <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
        Add an additional security layer to your wallets. While enabled, you will need to verify
        another factor when logging in.
      </p>
    </div>

    <Button
      v-if="!userInfo?.isMfaEnabled"
      size="sm"
      class="gap-2 w-full !border-app-gray-300 !text-app-gray-800 dark:!text-app-white"
      variant="secondary"
      @on-click="addMfa"
      >Add MFA</Button
    >

    <Divider />

    <div class="divide-y divide-app-gray-200 dark:divide-app-gray-500">
      <div class="flex items-center py-4">
        <div class="mr-2">
          <Icon
            v-if="['email_passwordless', 'jwt'].includes(userInfo?.typeOfLogin || '')"
            class="text-app-gray-900 dark:text-app-white w-5 h-5"
            name="mail-icon"
          />
          <img
            else
            class="w-5 h-5"
            :src="`https://images.web3auth.io/login-${userInfo?.typeOfLogin}-active.svg`"
            :alt="`${userInfo?.typeOfLogin} icon`"
          />
        </div>
        <div>
          <h4
            class="text-sm font-semibold text-app-gray-900 dark:text-app-white first-letter:capitalize"
          >
            {{ userInfo?.typeOfLogin }}
          </h4>
          <p class="text-xs text-app-gray-400">{{ userInfo?.verifierId }}</p>
        </div>
      </div>
      <div
        v-for="shareDetail in shareDetails"
        :key="shareDetail.title"
        class="flex items-center py-4"
      >
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
          <p class="text-xs text-app-gray-400">{{ shareDetail.details }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
