<template>
  <div>
    <div v-if="!userStore.loggedIn">
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
