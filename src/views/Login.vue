<script setup lang="ts">
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import { Button } from '@toruslabs/vue-components/Button'
import { TextField } from '@toruslabs/vue-components/TextField'
import { LoginForm, type SocialLoginObj } from '@toruslabs/vue-components/LoginForm'
import { Link } from '@toruslabs/vue-components/Link'
import { useWeb3authStore } from '../store/web3authStore'
import { InputHTMLAttributes, computed, reactive, ref, watch } from 'vue'
import {
  LANGUAGES,
  LANGUAGE_TYPE,
  LOGIN_PROVIDER,
  applyWhiteLabelTheme
} from '@web3auth/openlogin-adapter'
import { Toggle } from '@toruslabs/vue-components/Toggle'

import useLocales from '../composables/use-locales'
import { setTheme } from '@/utils/common'
import { CustomConfig } from '@/utils/interface'

const locales = useLocales()

type Panel = 'general' | 'theme'

const languages: { name: string; value: LANGUAGE_TYPE }[] = [
  { name: 'English', value: LANGUAGES.en },
  { name: 'German', value: LANGUAGES.de },
  { name: 'Japanese', value: LANGUAGES.ja },
  { name: 'Korean', value: LANGUAGES.ko },
  { name: 'Mandarin', value: LANGUAGES.zh },
  { name: 'Spanish', value: LANGUAGES.es },
  { name: 'French', value: LANGUAGES.fr },
  { name: 'Portuguese', value: LANGUAGES.pt },
  { name: 'Dutch', value: LANGUAGES.nl },
  { name: 'Turkish', value: LANGUAGES.tr }
]

const web3Auth = useWeb3authStore()
const activeConfigPanel = ref<Panel>('general')
const loginHint = ref<string>('')
const selectedSocialLogins = ref<string[]>([])

// Settings
const customConfig = reactive<CustomConfig>({
  dappName: '',
  addBrandLogo: false,
  useLogoAsLoader: false,
  selectedLanguage: 'en',
  isDark: false,
  primaryColor: '#0346ff',
  primaryTextColor: '#ffffff'
})

locales.setActiveLocale(customConfig.selectedLanguage)

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

function setPrimaryColor(color: string) {
  customConfig.primaryColor = color
  const rootElement = document.querySelector(':root') as HTMLElement
  applyWhiteLabelTheme(rootElement, { primary: color })
}

function setPrimaryTextColor(color: string) {
  customConfig.primaryTextColor = color
  const rootElement = document.querySelector(':root') as HTMLElement
  applyWhiteLabelTheme(rootElement, { onPrimary: color })
}

function setActiveTheme() {
  customConfig.isDark = !customConfig.isDark
  setTheme(customConfig.isDark)
}

watch(
  () => customConfig,
  (newValue) => {
    web3Auth.updateWeb3AuthInstance(newValue)
  },
  { deep: true }
)
</script>

<template>
  <div class="flex-1 flex items-center">
    <div class="flex gap-4 mx-auto h-full w-full py-6 px-10">
      <div class="w-[368px] flex justify-center items-center">
        <Card
          :classes="{
            container: `!rounded-xl p-8 bg-app-white`
          }"
        >
          <div>
            <h3 class="font-medium mb-2 text-app-gray-900 dark:text-app-white">
              Customize your Login Screens
            </h3>
            <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
              Personalize your login screens to reflect your brand's identity. Check our
              <Link href="https://web3auth.io/docs" target="_blank" rel="noopener noreferrer"
                >docs</Link
              >
              for more customization options.
            </p>
          </div>

          <hr class="h-px my-4 bg-app-gray-200 border-0" />

          <div class="accordion">
            <div class="accordion-panel">
              <button
                class="w-full text-left relative block font-medium text-app-gray-900 dark:text-app-white"
                @click="activeConfigPanel = 'general'"
              >
                General
                <Icon
                  class="absolute top-0.5 right-0 transition-all duration-500"
                  :class="`absolute top-0.5 right-0 transition-all duration-500 ${activeConfigPanel === 'general' ? 'rotate-180' : ''}`"
                  name="chevron-down-solid-icon"
                />
              </button>
              <div
                class="accordion-content text-sm font-medium"
                :class="{ 'pt-6': activeConfigPanel === 'general' }"
                role="region"
                :aria-hidden="activeConfigPanel !== 'general'"
              >
                <div>
                  <div class="flex justify-between items-center mb-6">
                    <div class="text-app-gray-900 dark:text-app-white">Add Brand Logo</div>
                    <Toggle size="small" v-model="customConfig.addBrandLogo" />
                  </div>
                  <div class="flex justify-between items-center mb-6">
                    <div class="text-app-gray-900 dark:text-app-white">Use Logo as Loader</div>
                    <Toggle size="small" v-model="customConfig.useLogoAsLoader" />
                  </div>
                  <div class="mb-6">
                    <TextField
                      label="Application Name"
                      placeholder="dApp Name"
                      v-model="customConfig.dappName"
                    />
                  </div>
                  <div>
                    <label for="countries" class="block mb-2 text-app-gray-900 dark:text-app-white"
                      >Default Language</label
                    >
                    <select
                      id="countries"
                      class="outline outline-1 outline-app-gray-300 border-r-[20px] border-r-transparent bg-app-gray-50 text-app-gray-900 dark:bg-app-gray-700 dark:outline-app-gray-600 dark:text-app-white px-3 py-3 w-full text-sm font-normal rounded-lg"
                      :model-value="customConfig.selectedLanguage"
                      @change="
                        (e) => {
                          customConfig.selectedLanguage = (e.target as HTMLSelectElement)
                            .value as LANGUAGE_TYPE
                          locales.setActiveLocale(customConfig.selectedLanguage)
                        }
                      "
                    >
                      <option
                        v-for="language in languages"
                        :value="language.value"
                        :key="language.value"
                      >
                        {{ language.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <hr class="h-px my-4 bg-app-gray-200 border-0" />

            <div class="accordion-panel">
              <button
                class="w-full text-left relative block font-medium text-app-gray-900 dark:text-app-white"
                @click="activeConfigPanel = 'theme'"
              >
                Theme and Colors
                <Icon
                  :class="`absolute top-0.5 right-0 transition-all duration-500 ${activeConfigPanel === 'theme' ? 'rotate-180' : ''}`"
                  name="chevron-down-solid-icon"
                />
              </button>
              <div
                class="accordion-content text-sm font-medium pt-6"
                role="region"
                :aria-hidden="activeConfigPanel !== 'theme'"
                id="panel2-content"
              >
                <div>
                  <div class="mb-6">
                    <TextField
                      label="Primary Color"
                      helper-text="Applies to primary elements like buttons, text links, tabs, focus, spinners, nav tabs"
                      v-model="customConfig.primaryColor"
                    >
                      <template #endIconSlot>
                        <input
                          id="primary-color-picker"
                          class="color-picker"
                          type="color"
                          :value="customConfig.primaryColor"
                          @input="
                            (e) => {
                              const color = (e.target as InputHTMLAttributes).value
                              setPrimaryColor(color)
                            }
                          "
                        />
                      </template>
                    </TextField>
                  </div>
                  <div class="mb-6">
                    <TextField
                      label="Primary Text Color"
                      helper-text="Applies to text elements set against the primary color background"
                      v-model="customConfig.primaryTextColor"
                    >
                      <template #endIconSlot>
                        <input
                          id="primary-text-color-picker"
                          class="color-picker"
                          type="color"
                          :value="customConfig.primaryTextColor"
                          @input="
                            (e) => {
                              const color = (e.target as InputHTMLAttributes).value
                              setPrimaryTextColor(color)
                            }
                          "
                        />
                      </template>
                    </TextField>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div class="flex-1 flex justify-center items-center">
        <div class="max-w-[392px]">
          <div>
            <button
              class="flex items-center justify-center gap-2 rounded-full pl-2 pr-4 py-2 mb-6 bg-app-gray-200 dark:bg-app-gray-800"
              @click="setActiveTheme"
            >
              <div class="h-8 w-8 bg-app-white rounded-full flex justify-center items-center">
                <Icon
                  class="text-app-gray-500"
                  :name="customConfig.isDark ? 'moon-solid-icon' : 'sun-solid-icon'"
                  size="24"
                />
              </div>
              <div class="leading-none text-left text-sm text-app-gray-500 dark:text-app-gray-400">
                {{ customConfig.isDark ? 'DARK' : 'LIGHT' }}<br />MODE
              </div>
            </button>
          </div>
          <Card
            :classes="{
              container: `!rounded-2xl p-8`
            }"
          >
            <div>
              <div v-if="customConfig.addBrandLogo" class="mb-6">
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
                    appName: customConfig.dappName || 'blockchain'
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
                  <Button type="submit" class="my-4" variant="tertiary" pill block>{{
                    locales.t('social.continueCustom', { adapter: 'Email or Phone' })
                  }}</Button>
                </form>
              </template>
            </LoginForm>
            <!-- Footer -->
            <div class="flex items-center justify-center mt-8">
              <img
                src="https://images.web3auth.io/ws-trademark-light.svg"
                alt="web3auth logo"
                class="block dark:hidden"
              />
              <img
                src="https://images.web3auth.io/ws-trademark-dark.svg"
                alt="web3auth logo"
                class="hidden dark:block"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 500ms;
}

.accordion-content[aria-hidden='false'] {
  grid-template-rows: 1fr;
}

.accordion-content > div {
  @apply overflow-hidden -m-1 p-1;
}
.accordion-content[aria-hidden='true'] > div {
  @apply m-0 p-0;
}

.color-picker {
  @apply w-6 h-6 rounded-md -mr-2 mt-1 appearance-none border border-app-gray-300 bg-transparent cursor-pointer;
}
input[type='color']::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
</style>
