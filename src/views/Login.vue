<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'
import { computed, ref, watch } from 'vue'

import TelegramBanner from '@/components/TelegramBanner/TelegramBanner.vue'
import WhiteLabelConfig from '@/components/WhiteLabelConfig'

import useCustomConfig from '../composables/use-custom-config'
import useLocales from '../composables/use-locales'

const showAnimateConfigDialog = ref(false)
const locales = useLocales()
const customConfig = useCustomConfig()
const { connect, web3Auth } = useWeb3Auth()

locales.setActiveLocale(customConfig.config.value.selectedLanguage)

const configDialogRef = ref<HTMLDialogElement | null>(null)

const config = computed(() => customConfig.config)

function showConfigDialog() {
  showAnimateConfigDialog.value = true
  configDialogRef.value?.showModal()
}

function closeConfigDialog() {
  showAnimateConfigDialog.value = false
  setTimeout(() => {
    configDialogRef.value?.close()
  }, 180)
}

watch(
  web3Auth,
  () => {
    if (web3Auth.value?.status === 'ready') {
      connect()
      return
    }
    web3Auth.value?.on('ready', () => {
      connect()
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex-1 md:flex items-center relative">
    <div class="flex flex-col gap-4 mx-auto h-full w-full p-4 sm:py-6 sm:px-10">
      <TelegramBanner />
      <div class="top-4 right-4 md:absolute z-[999999]">
        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-full pl-2 pr-4 py-2 bg-app-gray-200 dark:bg-app-gray-800"
          @click="customConfig.setActiveTheme"
        >
          <div class="h-8 w-8 bg-app-white rounded-full flex justify-center items-center">
            <Icon
              class="text-app-gray-500"
              :name="config.value.isDark ? 'moon-solid-icon' : 'sun-solid-icon'"
              size="24"
            />
          </div>
          <div class="leading-none text-left text-sm text-app-gray-500 dark:text-app-gray-400">
            {{ config.value.isDark ? 'DARK' : 'LIGHT' }}<br />MODE
          </div>
        </button>
      </div>
      <div class="flex gap-x-4">
        <div class="hidden w-[340px] md:!flex justify-center items-center">
          <Card
            class="!shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
            :classes="{
              container: `!rounded-xl p-8 bg-app-white`
            }"
          >
            <WhiteLabelConfig />
          </Card>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed lg:hidden bottom-2 right-2 max-sm:z-[1000000]">
    <Button icon rounded @on-click="showConfigDialog"><Icon name="cog-icon" /></Button>
  </div>
  <dialog
    ref="configDialogRef"
    class="config-dialog"
    :class="{ showAnimate: showAnimateConfigDialog }"
    @keydown.escape="closeConfigDialog"
    @click="
      (e) => {
        if (e.currentTarget === e.target) {
          closeConfigDialog()
        }
      }
    "
  >
    <WhiteLabelConfig />
    <button
      type="button"
      class="absolute top-4 right-4 max-sm:z-[1000000]"
      @click="closeConfigDialog"
    >
      <Icon class="text-app-gray-900 dark:text-app-gray-100" size="12px" name="x-icon" />
    </button>
  </dialog>
</template>

<style scoped>
dialog.config-dialog {
  @apply w-full max-w-full p-5 m-auto rounded-t-2xl dark:bg-app-gray-800;
  margin-block-end: 0;
}
dialog.config-dialog {
  animation: vanish 0.2s;
}
dialog.config-dialog.showAnimate {
  animation: appear 0.2s;
}

@keyframes appear {
  from {
    translate: 0 25vh;
    opacity: 0;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}
@keyframes vanish {
  from {
    opacity: 1;
    translate: 0 0;
  }
  to {
    opacity: 0;
    translate: 0 25vh;
  }
}
</style>
