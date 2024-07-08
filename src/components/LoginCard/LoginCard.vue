<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWeb3authStore } from '@/store/web3authStore'
import { LOGIN_PROVIDER } from '@web3auth/openlogin-adapter'
import useCustomConfig from '@/composables/use-custom-config'
import useLocales from '@/composables/use-locales'

import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import { Button } from '@toruslabs/vue-components/Button'
import { TextField } from '@toruslabs/vue-components/TextField'
import { LoginForm, type SocialLoginObj } from '@toruslabs/vue-components/LoginForm'

const locales = useLocales()
const web3Auth = useWeb3authStore()
const customConfig = useCustomConfig()
const loginHint = ref<string>('')
const selectedSocialLogins = ref<string[]>([])
const config = computed(() => customConfig.config)

const socialLoginsAll = computed((): SocialLoginObj[] => {
  const loginProviders = Object.values(LOGIN_PROVIDER).filter(
    (x) =>
      x !== LOGIN_PROVIDER.EMAIL_PASSWORDLESS &&
      x !== LOGIN_PROVIDER.SMS_PASSWORDLESS &&
      x !== LOGIN_PROVIDER.WEIBO &&
      x !== LOGIN_PROVIDER.WEBAUTHN &&
      x !== LOGIN_PROVIDER.JWT
  )
  return loginProviders.map((loginProvider) => {
    return {
      description:
        loginProvider === LOGIN_PROVIDER.GOOGLE
          ? locales.t('social.continueCustom', { adapter: 'Google' })
          : '',
      icon: loginProvider,
      verifier: loginProvider
    }
  })
})

const socialLogins = computed((): SocialLoginObj[] => {
  return socialLoginsAll.value.filter((x) => !selectedSocialLogins.value.includes(x.verifier!))
})

function passwordlessLogin() {
  web3Auth.connectToWeb3Auth({
    loginProvider: LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
    login_hint: loginHint.value
  })
}

function socialLogin(item: SocialLoginObj) {
  web3Auth.connectToWeb3Auth({ loginProvider: item.verifier! })
}
</script>

<template>
  <div class="mb-6">
    <button
      class="flex items-center justify-center gap-2 rounded-full pl-2 pr-4 py-2 bg-app-gray-200 dark:bg-app-gray-800"
      @click="customConfig.setActiveTheme"
    >
      <div class="h-8 w-8 bg-app-white rounded-full flex justify-center items-center">
        <Icon
          class="text-app-gray-500"
          :name="config.isDark ? 'moon-solid-icon' : 'sun-solid-icon'"
          size="24"
        />
      </div>
      <div class="leading-none text-left text-sm text-app-gray-500 dark:text-app-gray-400">
        {{ config.isDark ? 'DARK' : 'LIGHT' }}<br />MODE
      </div>
    </button>
  </div>
  <Card
    class="dapp-login-modal !shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
    :classes="{
      container: `!rounded-2xl p-8`
    }"
  >
    <div>
      <div v-if="config.addBrandLogo" class="mb-6">
        <img
          class="h-11 w-auto dark:hidden"
          src="https://images.web3auth.io/web3auth-logo-w.svg"
          alt=""
        />
        <img
          class="h-11 w-auto hidden dark:block"
          src="https://images.web3auth.io/web3auth-logo-w-light.svg"
          alt=""
        />
      </div>
      <p class="text-2xl font-bold text-app-gray-900 dark:text-app-white">
        {{ locales.t('header.title') }}
      </p>
      <p class="text-base text-app-gray-500 dark:text-app-gray-400">
        {{
          locales.t('header.subtitle-name', {
            appName: config.dappName || 'blockchain'
          })
        }}
      </p>
    </div>
    <!-- Body -->
    <LoginForm
      pill
      :social-logins="socialLogins"
      :show-input="false"
      class="mt-6"
      :input-expand-btn-props="{
        pill: true,
        size: 'xs',
        class: '!p-0 !h-[1em] active:!ring-0 focus:!ring-0 !rounded-0'
      }"
      :social-login-message="locales.t('social.policy')"
      :expand-label="locales.t('social.view-more')"
      :collapse-label="locales.t('social.view-less')"
      primary-btn="input"
      @on-social-login-click="socialLogin"
    >
      <template #formBody>
        <form @submit.prevent="passwordlessLogin">
          <TextField
            v-model="loginHint"
            :label="locales.t('social.passwordless-title')"
            pill
            type="email"
            required
            placeholder="E.g. +00-123455/name@example.com"
          />
          <Button type="submit" class="my-4" variant="primary" pill block>{{
            locales.t('social.continueCustom', { adapter: 'Email or Phone' })
          }}</Button>
        </form>
      </template>
    </LoginForm>
    <!-- Footer -->
    <div class="flex items-center justify-center mt-8">
      <img
        src="@/assets/images/ws-trademark-light.svg"
        alt="web3auth logo"
        class="block dark:hidden h-5"
      />
      <img
        src="@/assets/images/ws-trademark-dark.svg"
        alt="web3auth logo"
        class="hidden dark:block h-5"
      />
    </div>
  </Card>
</template>
