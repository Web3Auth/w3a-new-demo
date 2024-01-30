<template>
  <div class="flex-1 flex justify-center items-center">
    <div>
      <Button :pill="true" @on-click="login">Login</Button>
    </div>
    <div>
      <Button :pill="true" @on-click="logout">Logout</Button>
    </div>
    <div>
      <Button :pill="true" @on-click="showWalletUI">Show Wallet UI</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@toruslabs/vue-components'
import { onBeforeMount } from 'vue'
import { web3authStore } from '../store/web3authStore'

const { initializeWeb3Auth, connectToWeb3Auth, logoutWeb3Auth, showWalletServicesUI } =
  web3authStore()

function login() {
  connectToWeb3Auth()
}

function logout() {
  logoutWeb3Auth()
}

function showWalletUI() {
  // Show wallet UI
  showWalletServicesUI()
}

onBeforeMount(() => {
  // Add loader
  initializeWeb3Auth()
})
</script>
