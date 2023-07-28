<template>
  <div class="p-6 flex items-center justify-between">
    <img
      src="@/assets/images/logo.svg"
      alt="web3auth demo logo"
      @click="emits('onRedirect')"
      class="cursor-pointer"
    />
    <Button pill @on-click="isLoggedIn ? emits('onLogOut') : handleDocsLink()">{{
      isLoggedIn ? 'Logout' : 'Documentation'
    }}</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@toruslabs/vue-components'
import { inject } from 'vue'

const emits = defineEmits(['onRedirect', 'onLogOut'])

const isLoggedIn = inject<boolean>('isLoggedIn')

const handleDocsLink = () => {
  window.open('https://web3auth.io/docs', '_blank')
}
</script>

<style scoped></style>
