<template>
  <div class="flex-1 flex justify-center items-center">
    <div>
      <Button v-if="!isLoggedInVal" :pill="true" @on-click="login">Login</Button>
    </div>
    <div>
      <Button v-if="isLoggedInVal" :pill="true" @on-click="logout">Logout</Button>
    </div>
    <div>
      <Button v-if="isLoggedInVal" :pill="true" @on-click="showWalletUI">Show Wallet UI</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@toruslabs/vue-components'
import { computed, onBeforeMount } from 'vue'
import { useWeb3authStore } from '../store/web3authStore'

const web3authStore = useWeb3authStore()

const isLoggedInVal = computed(() => {
  return web3authStore.isLoggedIn
})

function login() {
  web3authStore.connectToWeb3Auth()
}

function logout() {
  web3authStore.logoutWeb3Auth()
}

function showWalletUI() {
  // Show wallet UI
  web3authStore.showWalletServicesUI()
}

onBeforeMount(() => {
  // Add loader
  web3authStore.initializeWeb3Auth()
})
</script>
