<template>
  <div class="flex-1 flex justify-center items-center">
    <Button :pill="true" @on-click="login">Login</Button>
    <Button :pill="true" @on-click="logout">Logout</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@toruslabs/vue-components'
import { onBeforeMount } from 'vue'
import { web3authStore } from '../store/web3authStore'

const { initializeWeb3Auth, connectToWeb3Auth, logoutWeb3Auth } = web3authStore()

function login() {
  connectToWeb3Auth()
}

function logout() {
  logoutWeb3Auth()
}

onBeforeMount(() => {
  // Add loader
  initializeWeb3Auth()
})
</script>
