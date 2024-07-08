<script setup lang="ts">
import { InputHTMLAttributes, ref } from 'vue'
import { Link } from '@toruslabs/vue-components/Link'
import { Toggle } from '@toruslabs/vue-components/Toggle'
import { TextField } from '@toruslabs/vue-components/TextField'
import { Icon } from '@toruslabs/vue-components/Icon'
import { LANGUAGES, LANGUAGE_TYPE, applyWhiteLabelTheme } from '@web3auth/openlogin-adapter'
import useCustomConfig from '@/composables/use-custom-config'
import useLocales from '@/composables/use-locales'

const locales = useLocales()
const customConfig = useCustomConfig()

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
  customConfig.config.primaryColor = color
  const rootElement = document.querySelector('.dapp-login-modal') as HTMLElement
  applyWhiteLabelTheme(rootElement, { primary: color })
}

function setPrimaryTextColor(color: string) {
  customConfig.config.primaryTextColor = color
  const rootElement = document.querySelector('.dapp-login-modal') as HTMLElement
  applyWhiteLabelTheme(rootElement, { onPrimary: color })
}
</script>

<template>
  <div>
    <h3 class="font-medium mb-2 text-app-gray-900 dark:text-app-white">
      Customize your Login Screens
    </h3>
    <p class="text-xs text-app-gray-500 dark:text-app-gray-400">
      Personalize your login screens to reflect your brand's identity. Check our
      <Link
        class="dark:text-app-primary-500"
        href="https://web3auth.io/docs"
        target="_blank"
        rel="noopener noreferrer"
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
            <Toggle size="small" v-model="customConfig.config.addBrandLogo" />
          </div>
          <div class="flex justify-between items-center mb-6">
            <div class="text-app-gray-900 dark:text-app-white">Use Logo as Loader</div>
            <Toggle size="small" v-model="customConfig.config.useLogoAsLoader" />
          </div>
          <div class="mb-6">
            <TextField
              label="Application Name"
              placeholder="dApp Name"
              v-model="customConfig.config.dappName"
            />
          </div>
          <div>
            <label for="countries" class="block mb-2 text-app-gray-900 dark:text-app-white"
              >Default Language</label
            >
            <select
              id="countries"
              class="outline outline-1 outline-app-gray-300 border-r-[20px] border-r-transparent bg-app-gray-50 text-app-gray-900 dark:bg-app-gray-700 dark:outline-app-gray-600 dark:text-app-white px-3 py-3 w-full text-sm font-normal rounded-lg"
              :model-value="customConfig.config.selectedLanguage"
              @change="
                (e) => {
                  customConfig.config.selectedLanguage = (e.target as HTMLSelectElement)
                    .value as LANGUAGE_TYPE
                  locales.setActiveLocale(customConfig.config.selectedLanguage)
                }
              "
            >
              <option v-for="language in languages" :value="language.value" :key="language.value">
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
              v-model="customConfig.config.primaryColor"
            >
              <template #endIconSlot>
                <input
                  id="primary-color-picker"
                  class="color-picker"
                  type="color"
                  :value="customConfig.config.primaryColor"
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
              v-model="customConfig.config.primaryTextColor"
            >
              <template #endIconSlot>
                <input
                  id="primary-text-color-picker"
                  class="color-picker"
                  type="color"
                  :value="customConfig.config.primaryTextColor"
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
