<script setup lang="ts">
import Navbar from '@/components/Navbar'

console.log('check: process', process.env)
</script>

<template>
  <div class="h-screen flex flex-col">
    <Navbar />
    <router-view />
  </div>
</template>
