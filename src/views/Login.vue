<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import useLocales from '../composables/use-locales'
import useCustomConfig from '../composables/use-custom-config'
import WhiteLabelConfig from '@/components/WhiteLabelConfig'
import LoginCard from '@/components/LoginCard'
import { ref, watch } from 'vue'
import { useWeb3Auth } from '@web3auth/modal-vue-composables'

import TelegramBanner from '@/components/TelegramBanner/TelegramBanner.vue'

const showAnimateConfigDialog = ref(false)
const locales = useLocales()
const customConfig = useCustomConfig()
const { connect, web3Auth } = useWeb3Auth()

locales.setActiveLocale(customConfig.config.value.selectedLanguage)

const configDialogRef = ref<HTMLDialogElement | null>(null)

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
    console.log(web3Auth.value?.status, 'IS INITIALIZED')
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
  <div class="flex-1 lg:flex items-center">
    <div class="flex flex-col gap-4 mx-auto h-full w-full p-4 sm:py-6 sm:px-10">
      <TelegramBanner />
      <div class="flex gap-x-4">
        <div class="hidden w-[368px] lg:!flex justify-center items-center">
          <Card
            class="!shadow-modal !border-0 dark:!border-app-gray-800 dark:!shadow-dark"
            :classes="{
              container: `!rounded-xl p-8 bg-app-white`
            }"
          >
            <WhiteLabelConfig />
          </Card>
        </div>
        <div class="flex-1 flex justify-start items-start max-sm:z-[10000000]">
          <div class="max-w-[392px]">
            <LoginCard />
          </div>
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
    @click="
      (e) => {
        if (e.currentTarget === e.target) {
          closeConfigDialog()
        }
      }
    "
  >
    <WhiteLabelConfig />
    <button class="absolute top-4 right-4 max-sm:z-[1000000]" @click="closeConfigDialog">
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
