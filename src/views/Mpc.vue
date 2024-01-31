<script setup lang="ts">
import OpenloginDetails from '@/components/OpenloginDetails'
import { useWeb3authStore } from '@/store/web3authStore'
import { computed, provide } from 'vue'
const web3auth = useWeb3authStore()
provide(
  'userInfo',
  computed(() => web3auth.userInfo)
)
</script>

<template>
  <OpenloginDetails />
</template>
