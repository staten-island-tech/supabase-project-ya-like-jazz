<template>
  <div>
    <div v-if="!userStore.loggedIn">
      <h1 class="text-textcolor2" @click="console.log(userStore.loggedIn)">Hello</h1>
      <StartingPage />
    </div>
    <div v-if="userStore.loggedIn">
      <LoggedPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import StartingPage from '@/components/StartingPage.vue'
import LoggedPage from '@/components/LoggedPage.vue'
import { useUserStore } from '@/stores/loggedin'

const userStore = useUserStore()
</script>
