<template>
  <div
    class="w-full sm:w-[380px] shadow-xl rounded-2xl border border-gray-200 overflow-hidden bg-white"
  >
    <div class="p-8 pb-6">
      <img src="@/assets/images/login-logo.svg" />
      <h4 class="text-xl font-bold mt-4">Sign in</h4>
      <p class="text-sm font-semibold text-gray-500 mt-2 mb-6">
        Your blockchain wallet in one-click
      </p>
      <LoginForm
        :social-logins="socialLogins"
        pill
        show-input
        expand-label="View More"
        collapse-label="View Less"
        social-login-message=""
        input-btn-label="Continue With Email"
        :grid-cols="3"
        primary-btn="input"
        :input-props="{
          placeholder: 'name@example.com',
          onInput: (e: Event) => emits('handleEmailPasswordLess', e),
          modelValue: emailLoginHint
        }"
        :classes="{ expandBtn: '!text-indigo-600' }"
        :input-btn-props="{
          class: '!bg-indigo-600 disabled:!bg-indigo-400',
          onClick: () => emits('onEmailLogin'),
          disabled: !emailLoginHint
        }"
        @on-social-login-click="(loginObj, index) => emits('onSocialLoginClick', loginObj, index)"
      >
        <template #formBody>
          <p class="pb-4 text-center text-sm font-medium">or</p>
        </template>
      </LoginForm>
      <p class="text-xs font-medium text-gray-500">
        We do not store any data related to your social logins.
      </p>
    </div>
    <div class="flex items-center justify-center mb-4">
      <img
        src="https://images.web3auth.io/ws-trademark-light.svg"
        alt="web3auth logo"
        class="block"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SOCIAL_LOGINS } from '@/constants/common'
import { LoginForm } from '@toruslabs/vue-components'
import { inject } from 'vue'

const socialLogins = SOCIAL_LOGINS

const emits = defineEmits(['onEmailLogin', 'onSocialLoginClick', 'handleEmailPasswordLess'])

const emailLoginHint = inject<string>('emailLoginHint')
</script>

<style scoped></style>
