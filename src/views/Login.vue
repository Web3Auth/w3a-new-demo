<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { Card } from '@toruslabs/vue-components/Card'
import { Icon } from '@toruslabs/vue-components/Icon'
import useLocales from '../composables/use-locales'
import useCustomConfig from '../composables/use-custom-config'
import WhiteLabelConfig from '@/components/WhiteLabelConfig'
import LoginCard from '@/components/LoginCard'
import { ref } from 'vue'

const showAnimateConfigDialog = ref(false)
const locales = useLocales()
const customConfig = useCustomConfig()

locales.setActiveLocale(customConfig.config.selectedLanguage)

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
</script>

<template>
  <div class="flex-1 block lg:flex items-center">
    <div class="flex gap-4 mx-auto h-full w-full p-4 sm:py-6 sm:px-10">
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
      <div class="flex-1 flex justify-center items-center">
        <div class="max-w-[392px]">
          <LoginCard />
        </div>
      </div>
    </div>
  </div>
  <div class="fixed lg:hidden bottom-2 right-2">
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
    <button class="absolute top-4 right-4" @click="closeConfigDialog"><Icon class="text-app-gray-900 dark:text-app-gray-100" size="12px" name="x-icon" /></button>
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
