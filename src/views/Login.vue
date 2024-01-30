<script setup lang="ts">
import { Button } from '@toruslabs/vue-components'
import { useWeb3Auth } from '../store/web3authStore'
import { ROUTES } from '@/constants/common'
import { useRouter } from 'vue-router'

const router = useRouter()
const web3Auth = useWeb3Auth()

async function login() {
  await web3Auth.connectToWeb3Auth()
  if (web3Auth.isLoggedIn) {
    router.push({ name: ROUTES.WELCOME })
  }
}
</script>

<template>
  <div class="flex-1 flex justify-center items-center">
    <Button :pill="true" @on-click="login">Login</Button>
  </div>
</template>
