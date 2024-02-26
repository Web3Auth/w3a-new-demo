<script setup lang="ts">
import { Button } from '@toruslabs/vue-components/Button'
import { useWeb3authStore } from '../store/web3authStore'
import { onMounted } from 'vue'

const web3Auth = useWeb3authStore()

function login() {
  web3Auth.connectToWeb3Auth()
}

onMounted(() => {
  login()
})
</script>

<template>
  <div class="flex-1 flex justify-center items-center">
    <Button :pill="true" @on-click="login">Login</Button>
  </div>
</template>

<style>
#w3a-modal {
  height: 90vh;
  margin-top: auto;
}
</style>
