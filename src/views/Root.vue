<script setup lang="ts">
import { useWeb3Auth } from '@web3auth/modal-vue-composables'

import Home from './Home.vue'
import Login from './Login.vue'

const { isConnected } = useWeb3Auth()
</script>

<template>
  <Login v-if="!isConnected" />
  <Home v-else />
</template>
