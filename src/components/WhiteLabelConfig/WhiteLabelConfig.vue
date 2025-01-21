<script setup lang="ts">
import { Icon } from '@toruslabs/vue-components/Icon'
import { Link } from '@toruslabs/vue-components/Link'
import { TextField } from '@toruslabs/vue-components/TextField'
import { Toggle } from '@toruslabs/vue-components/Toggle'
import { applyWhiteLabelTheme, LANGUAGE_TYPE, LANGUAGES } from '@web3auth/auth-adapter'
import { useI18n } from 'petite-vue-i18n'
import { InputHTMLAttributes, ref } from 'vue'

import useCustomConfig from '@/composables/use-custom-config'
import { loadLanguageAsync } from '@/plugins/i18n-setup'

const customConfig = useCustomConfig()
const { t } = useI18n()
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

const activeConfigPanel = ref<Panel>('general')

function setPrimaryColor(color: string) {
  customConfig.config.value.primaryColor = color
  const rootElement = document.querySelector('.dapp-login-modal') as HTMLElement
  applyWhiteLabelTheme(rootElement, { primary: color })
}

function setPrimaryTextColor(color: string) {
  customConfig.config.value.primaryTextColor = color
  const rootElement = document.querySelector('.dapp-login-modal') as HTMLElement
  applyWhiteLabelTheme(rootElement, { onPrimary: color })
}

function handleSelectLanguage(lang: string) {
  customConfig.config.value.selectedLanguage = lang as LANGUAGE_TYPE
  loadLanguageAsync(lang as LANGUAGE_TYPE)
  localStorage.setItem('selectedLanguage', lang)
}
</script>

<template>
  <div>
    <h3 class="mb-2 font-medium text-app-gray-900 dark:text-app-white">
      {{ t('login.customize-login-screen') }}
    </h3>
    <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
      {{ t('login.personalize-subtext-1') }}
      <Link
        class="dark:text-app-primary-500"
        href="https://web3auth.io/docs"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('login.docs') }}</Link
      >
      {{ t('login.personalize-subtext-2') }}
    </p>
  </div>

  <hr class="my-4 h-px border-0 bg-app-gray-200" />

  <div class="accordion">
    <div class="accordion-panel">
      <button
        type="button"
        class="relative block w-full text-left font-medium text-app-gray-900 dark:text-app-white"
        @click="activeConfigPanel = 'general'"
      >
        {{ t('login.general') }}
        <Icon
          class="absolute right-0 top-0.5 transition-all duration-500"
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
          <div class="mb-6 flex items-center justify-between">
            <div class="text-app-gray-900 dark:text-app-white">{{ t('login.add-brand-logo') }}</div>
            <Toggle v-model="customConfig.config.value.addBrandLogo" size="small" />
          </div>
          <div
            v-if="customConfig.config.value.addBrandLogo"
            class="mb-6 flex items-center justify-between"
          >
            <TextField
              :label="t('login.logo-url')"
              :placeholder="t('login.logo-url')"
              :model-value="customConfig.config.value.logoUrl"
              @change="
                (e) => {
                  customConfig.config.value.logoUrl = (e.target as HTMLInputElement).value
                }
              "
            />
          </div>
          <div
            v-if="customConfig.config.value.addBrandLogo"
            class="mb-6 flex items-center justify-between"
          >
            <div class="text-app-gray-900 dark:text-app-white">
              {{ t('login.use-logo-as-loader') }}
            </div>
            <Toggle v-model="customConfig.config.value.useLogoAsLoader" size="small" />
          </div>
          <div class="mb-6">
            <TextField
              :label="t('login.application-name')"
              :placeholder="t('login.dapp-name')"
              :model-value="customConfig.config.value.dappName"
              @change="
                (e) => {
                  customConfig.config.value.dappName = (e.target as HTMLInputElement).value
                }
              "
            />
          </div>
          <div>
            <label for="countries" class="mb-2 block text-app-gray-900 dark:text-app-white">
              {{ t('login.default-lang') }}
            </label>
            <select
              id="language"
              class="w-full rounded-lg border-r-[20px] border-r-transparent bg-app-gray-50 p-3 text-sm font-normal text-app-gray-900 outline outline-1 outline-app-gray-300 dark:bg-app-gray-700 dark:text-app-white dark:outline-app-gray-600"
              :model-value="customConfig.config.value.selectedLanguage"
              @change="
                (e) => {
                  handleSelectLanguage((e.target as HTMLSelectElement).value as LANGUAGE_TYPE)
                }
              "
            >
              <option
                v-for="language in languages"
                :key="language.value"
                :value="language.value"
                :selected="language.value === customConfig.config.value.selectedLanguage"
              >
                {{ language.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-4 h-px border-0 bg-app-gray-200" />

    <div class="accordion-panel">
      <button
        type="button"
        class="relative block w-full text-left font-medium text-app-gray-900 dark:text-app-white"
        @click="activeConfigPanel = 'theme'"
      >
        {{ t('login.theme-colors') }}
        <Icon
          :class="`absolute top-0.5 right-0 transition-all duration-500 ${activeConfigPanel === 'theme' ? 'rotate-180' : ''}`"
          name="chevron-down-solid-icon"
        />
      </button>
      <div
        id="panel2-content"
        class="accordion-content pt-6 text-sm font-medium"
        role="region"
        :aria-hidden="activeConfigPanel !== 'theme'"
      >
        <div>
          <div class="mb-6">
            <TextField
              :label="t('login.primary-color')"
              :helper-text="t('login.primary-color-subtext')"
              :model-value="customConfig.config.value.primaryColor"
              @change="
                (e) => {
                  const color = (e.target as InputHTMLAttributes).value
                  setPrimaryColor(color)
                }
              "
            >
              <template #endIconSlot>
                <input
                  id="primary-color-picker"
                  class="color-picker"
                  type="color"
                  :value="customConfig.config.value.primaryColor"
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
              :label="t('login.primary-text-color')"
              :helper-text="t('login.primary-text-color-subtext')"
              :model-value="customConfig.config.value.primaryTextColor"
              @change="
                (e) => {
                  setPrimaryTextColor((e.target as HTMLInputElement).value)
                }
              "
            >
              <template #endIconSlot>
                <input
                  id="primary-text-color-picker"
                  class="color-picker"
                  type="color"
                  :value="customConfig.config.value.primaryTextColor"
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
